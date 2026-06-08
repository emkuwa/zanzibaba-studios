#!/bin/bash
# One-command deployment for Zanzibaba Studios
# Usage:
#   1) Update DOMAIN, EMAIL, WHATSAPP below
#   2) ssh root@your-server
#   3) git clone <repo>
#   4) cd zanzibaba-studios && bash deploy.sh
#
# This script:
#   - Installs Node 20, nginx, certbot
#   - Builds the Next.js app
#   - Configures nginx reverse proxy
#   - Issues Let's Encrypt SSL certificate
#   - Sets up auto-renewal
#   - Configures systemd service
#   - Enables HTTP/2 and security headers

set -e

# ============== CONFIGURATION ==============
DOMAIN="studios.zanzibaba.com"
EMAIL="hello@zanzibabastudios.com"   # for Let's Encrypt
APP_PORT=3000
APP_DIR="/var/www/zanzibaba-studios"
NODE_VERSION="20"
# ===========================================

echo "=== Deploying Zanzibaba Studios to https://${DOMAIN} ==="
echo ""

# 1. System packages
echo ">>> Installing system packages"
apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

# 2. Node.js (if missing)
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != "v${NODE_VERSION}."* ]]; then
  echo ">>> Installing Node.js ${NODE_VERSION}"
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi

# 3. Clone or copy the app
if [ ! -d "$APP_DIR" ]; then
  echo ">>> Creating app directory at $APP_DIR"
  mkdir -p $APP_DIR
  # Replace this with: cd /tmp && git clone <your-repo> $APP_DIR
  # For now, assume the project is already in place:
  echo "    (assuming $APP_DIR already contains the project)"
fi

# 4. Build
echo ">>> Installing dependencies"
cd $APP_DIR
npm ci --omit=dev --no-audit --no-fund

echo ">>> Building production bundle"
npm run build

# 5. systemd service
echo ">>> Creating systemd service"
cat > /etc/systemd/system/zanzibaba-studios.service <<EOF
[Unit]
Description=Zanzibaba Studios Next.js
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/node node_modules/next/dist/bin/next start -p ${APP_PORT}
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=${APP_PORT}
Environment=NEXT_TELEMETRY_DISABLED=1

[Install]
WantedBy=multi-user.target
EOF

# 6. Permissions
chown -R www-data:www-data $APP_DIR

systemctl daemon-reload
systemctl enable zanzibaba-studios
systemctl restart zanzibaba-studios

# 7. nginx config
echo ">>> Configuring nginx"
cat > /etc/nginx/sites-available/zanzibaba-studios <<EOF
server {
  listen 80;
  listen [::]:80;
  server_name ${DOMAIN};

  # ACME challenge for Let's Encrypt
  location /.well-known/acme-challenge/ {
    root /var/www/html;
  }

  location / {
    return 301 https://\$host\$request_uri;
  }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ${DOMAIN};

  client_max_body_size 10m;

  # Security headers
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

  # Gzip
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types
    text/plain
    text/css
    text/xml
    application/json
    application/javascript
    application/xml+rss
    application/atom+xml
    image/svg+xml;

  # Cache static assets
  location ~* \.(jpg|jpeg|png|webp|avif|gif|svg|css|js|woff2|ico)$ {
    proxy_pass http://127.0.0.1:${APP_PORT};
    proxy_set_header Host \$host;
    proxy_cache_valid 200 30d;
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
  }

  # Main reverse proxy
  location / {
    proxy_pass http://127.0.0.1:${APP_PORT};
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_cache_bypass \$http_upgrade;
  }
}
EOF

ln -sf /etc/nginx/sites-available/zanzibaba-studios /etc/nginx/sites-enabled/zanzibaba-studios
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# 8. SSL via Let's Encrypt
echo ">>> Issuing SSL certificate"
certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos -m ${EMAIL} --redirect || {
  echo "    SSL issuance failed. If DNS not yet propagated, run manually:"
  echo "    certbot --nginx -d ${DOMAIN} --agree-tos -m ${EMAIL} --redirect"
}

# 9. Firewall
echo ">>> Configuring firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 10. Health check
echo ""
echo ">>> Health check"
sleep 3
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN}/ 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  echo "    ✓ https://${DOMAIN}/ returns HTTP 200"
else
  echo "    ⚠ https://${DOMAIN}/ returned HTTP ${HTTP_CODE}"
  echo "      - Is the app running? systemctl status zanzibaba-studios"
  echo "      - Is DNS pointing to this server? dig ${DOMAIN}"
fi

echo ""
echo "=== Deployment complete ==="
echo "Site live at: https://${DOMAIN}"
echo "Service: systemctl status zanzibaba-studios"
echo "Logs:    journalctl -u zanzibaba-studios -f"
echo "SSL:     certbot certificates"
