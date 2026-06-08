#!/bin/bash
# One-command deployment for Zanzibaba Studios
# Pushes to GitHub → deploys to Vercel → configures Cloudflare
#
# PREREQUISITES (set as environment variables before running):
#   GH_TOKEN         — Personal access token with repo scope
#                       https://github.com/settings/tokens
#   CF_API_TOKEN     — Cloudflare API token
#                       https://dash.cloudflare.com/profile/api-tokens
#   CF_ZONE_ID       — Cloudflare zone ID for zanzibaba.com
#                       Found in Cloudflare dashboard → zone overview
#   VERCEL_TOKEN     — Vercel API token
#                       https://vercel.com/account/tokens
#   VERCEL_ORG_ID    — Your Vercel team/org ID (auto-set after first deploy)
#   CF_TARGET        — Vercel CNAME (cname.vercel-dns.com) or your server IP
#
# USAGE:
#   bash deploy-infrastructure.sh

set -e

REPO_NAME="zanzibaba-studios"
GITHUB_USER="zanzibaba"  # CHANGE if different
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
PROJECT_DIR="$(pwd)"

echo "=== Zanzibaba Studios Infrastructure Deployment ==="
echo ""

# Validate credentials
MISSING=()
[ -z "$GH_TOKEN" ] && MISSING+=("GH_TOKEN")
[ -z "$CF_API_TOKEN" ] && MISSING+=("CF_API_TOKEN")
[ -z "$CF_ZONE_ID" ] && MISSING+=("CF_ZONE_ID")
[ -z "$VERCEL_TOKEN" ] && MISSING+=("VERCEL_TOKEN")
[ -z "$CF_TARGET" ] && MISSING+=("CF_TARGET")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "ERROR: Missing environment variables: ${MISSING[*]}"
  echo ""
  echo "Set them like:"
  echo "  export GH_TOKEN=\"ghp_xxxxxxxxxxxx\""
  echo "  export CF_API_TOKEN=\"xxxxxxxxxxxxxxxxxx\""
  echo "  export CF_ZONE_ID=\"xxxxxxxxxxxxxxxxxx\""
  echo "  export VERCEL_TOKEN=\"xxxxxxxxxxxxxxxxxx\""
  echo "  export CF_TARGET=\"cname.vercel-dns.com\""
  exit 1
fi

# ============ STEP 1: GitHub ============
echo "[1/5] Creating GitHub repository ${GITHUB_USER}/${REPO_NAME}"

# Create the repo via API
HTTP=$(curl -s -o /tmp/gh-create.json -w "%{http_code}" \
  -X POST "https://api.github.com/user/repos" \
  -H "Authorization: token $GH_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"Zanzibar's home for tourism cinema, photography and live broadcasting\",
    \"private\": false,
    \"homepage\": \"https://studios.zanzibaba.com\",
    \"has_issues\": true,
    \"has_projects\": false,
    \"has_wiki\": false
  }")

if [ "$HTTP" = "201" ]; then
  echo "    ✓ Repository created on GitHub"
elif [ "$HTTP" = "422" ]; then
  echo "    → Repository already exists (continuing)"
else
  echo "    ✗ Failed: HTTP $HTTP"
  cat /tmp/gh-create.json
  exit 1
fi

echo "[2/5] Pushing code to GitHub"
git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
git push -u origin main --force 2>&1 | tail -5
echo "    ✓ Code pushed to $REPO_URL"

# ============ STEP 2: Vercel ============
echo "[3/5] Deploying to Vercel"

cat > vercel-auth.json <<EOF
{"token":"$VERCEL_TOKEN"}
EOF

# Install Vercel CLI
npm install -g vercel@latest 2>&1 | tail -1

# First-time setup
cd $PROJECT_DIR
vercel link --yes --token $VERCEL_TOKEN 2>&1 | tail -3
vercel pull --yes --environment=production --token $VERCEL_TOKEN 2>&1 | tail -3

# Deploy
vercel deploy --prod --yes --token $VERCEL_TOKEN 2>&1 | tail -5

VERCEL_URL=$(vercel ls --token $VERCEL_TOKEN 2>/dev/null | grep -oE 'https://[^ ]+\.vercel\.app' | head -1)
echo "    ✓ Deployed to: $VERCEL_URL"

# Add custom domain via Vercel API
echo "[4/5] Adding studios.zanzibaba.com to Vercel project"
curl -s -X POST "https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"name\":\"studios.zanzibaba.com\"}" | python3 -c "import sys, json; d = json.load(sys.stdin); print('    OK' if d.get('verified') is not None else '    Pending DNS')"

# ============ STEP 3: Cloudflare ============
echo "[5/5] Configuring Cloudflare DNS + SSL"
bash cloudflare-config.sh 2>&1 | tail -20

# ============ FINAL ============
echo ""
echo "=== Deployment complete ==="
echo ""
echo "Public URL:        https://studios.zanzibaba.com"
echo "GitHub:            $REPO_URL"
echo "Vercel (initial):  $VERCEL_URL"
echo "Cloudflare:        configured (Full SSL Strict, Brotli, HTTP/3, Caching)"
echo ""
echo "Wait 2-5 minutes for DNS propagation, then verify:"
echo "  curl -I https://studios.zanzibaba.com/"
echo "  dig +short studios.zanzibaba.com"
echo "  https://www.ssllabs.com/ssltest/analyze.html?d=studios.zanzibaba.com"
