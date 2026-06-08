# Infrastructure Deployment Guide — Zanzibaba Studios

This guide takes `studios.zanzibaba.com` from a local repo to a public,
HTTPS-secured, Cloudflare-fronted production site.

**The whole process takes ~10 minutes once you have your credentials.**

---

## ⚠️ Honest Disclosure

I cannot execute steps 3-7 from this sandboxed environment because they
require credentials I do not have:
- GitHub personal access token
- Vercel API token + org ID
- Cloudflare API token + zone ID

**What I DID complete in this sandbox:**
- ✅ Initialized local git repo (2 commits, 86 files)
- ✅ Created all deployment artifacts (Vercel, Cloudflare, GitHub Actions, Lighthouse CI)
- ✅ Created a one-command deploy script that does it all
- ✅ Generated exact commands and configs for each step

**What YOU need to do:** Run the deploy command with credentials, or
execute the 5 steps below manually.

---

## Prerequisites (5 minutes to gather)

You'll need 5 credentials. Get them now:

| # | Credential | Where to get it |
|---|---|---|
| 1 | `GH_TOKEN` | https://github.com/settings/tokens → Generate new token (classic) → scopes: `repo`, `workflow` |
| 2 | `VERCEL_TOKEN` | https://vercel.com/account/tokens → Create |
| 3 | `VERCEL_ORG_ID` | After first deploy via Vercel dashboard → Settings → General |
| 4 | `CF_API_TOKEN` | https://dash.cloudflare.com/profile/api-tokens → Create → permissions: Zone:DNS:Edit, Zone:SSL:Edit, Zone:Settings:Edit |
| 5 | `CF_ZONE_ID` | Cloudflare dashboard → select `zanzibaba.com` → right sidebar → "Zone ID" |
| 6 | `CF_TARGET` | `cname.vercel-dns.com` (Vercel default) — confirm in Vercel after first deploy |

---

## 🚀 Method A: One-Command Deploy (fastest)

Once you have the 5 credentials:

```bash
cd "/Users/apple/Zanzibaba-Projects/active-projects/zanzibaba studios"

export GH_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
export VERCEL_TOKEN="xxxxxxxxxxxxxxxxxxxx"
export VERCEL_ORG_ID="team_xxxxxxxxxxxx"
export CF_API_TOKEN="xxxxxxxxxxxxxxxxxxxx"
export CF_ZONE_ID="xxxxxxxxxxxxxxxxxxxx"
export CF_TARGET="cname.vercel-dns.com"

bash deploy-infrastructure.sh
```

This script:
1. Creates `github.com/zanzibaba/zanzibaba-studios`
2. Pushes all 86 files
3. Installs Vercel CLI, links project, deploys to production
4. Adds `studios.zanzibaba.com` as a custom domain in Vercel
5. Configures Cloudflare DNS + SSL + Brotli + HTTP/3 + caching

Takes ~5 minutes. Watch for the final "Public URL: https://studios.zanzibaba.com" line.

---

## 🔧 Method B: Manual 5-Step Deploy (more control)

### Step 1: Create GitHub repository

1. Open https://github.com/new
2. Repository name: `zanzibaba-studios`
3. Description: `Zanzibar's home for tourism cinema, photography and live broadcasting`
4. Visibility: **Public**
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Push code to GitHub

```bash
cd "/Users/apple/Zanzibaba-Projects/active-projects/zanzibaba studios"

# Add GitHub as remote
git remote add origin https://github.com/zanzibaba/zanzibaba-studios.git

# Push
git push -u origin main
```

(You'll be prompted for credentials. Use a Personal Access Token as the password.)

### Step 3: Deploy to Vercel

**Option A: Dashboard (easiest)**

1. Open https://vercel.com/new
2. Click "Import Git Repository"
3. Select `zanzibaba/zanzibaba-studios`
4. Framework preset: **Next.js** (auto-detected)
5. Click "Deploy"
6. Wait ~90 seconds for build (1,281 static pages)
7. Click "Add Domain" → type `studios.zanzibaba.com` → "Add"
8. Vercel shows the DNS records to add at Cloudflare (CNAME `studios` → `cname.vercel-dns.com`)

**Option B: CLI**

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 4: Configure Cloudflare DNS

In Cloudflare dashboard (https://dash.cloudflare.com → select `zanzibaba.com`):

**Add DNS record:**

| Type | Name | Target | Proxy | TTL |
|---|---|---|---|---|
| CNAME | studios | cname.vercel-dns.com | Proxied (orange cloud) | Auto |

**Settings to enable (in the Cloudflare dashboard):**

| Setting | Path | Value |
|---|---|---|
| SSL/TLS | Overview | **Full (Strict)** |
| SSL/TLS → Edge Certificates | Always Use HTTPS | **On** |
| SSL/TLS → Edge Certificates | Auto HTTPS Rewrites | **On** |
| Speed → Optimization | Brotli | **On** |
| Speed → Optimization | HTTP/3 (QUIC) | **On** |
| Caching → Configuration | Caching Level | **Aggressive** |
| Speed → Optimization | Auto-Minify | HTML, CSS, JS all **On** |

Or run the script:
```bash
export CF_API_TOKEN="..." CF_ZONE_ID="..." CF_TARGET="cname.vercel-dns.com"
bash cloudflare-config.sh
```

### Step 5: Wait for DNS + Verify

```bash
# Wait 2-5 minutes
sleep 180

# DNS check
dig +short studios.zanzibaba.com
# Should return: <cloudflare-proxy-ip>

# HTTP check
curl -I https://studios.zanzibaba.com/
# Should return: HTTP/2 200

# SSL check
openssl s_client -connect studios.zanzibaba.com:443 -servername studios.zanzibaba.com < /dev/null 2>/dev/null | grep "Verify return code"
# Should return: Verify return code: 0 (ok)

# Sitemap
curl -I https://studios.zanzibaba.com/sitemap.xml
# Should return: HTTP 200

# SEO page
curl -I https://studios.zanzibaba.com/en/services/drone/nungwi/hotels
# Should return: HTTP 200

# Lighthouse
npx lighthouse https://studios.zanzibaba.com/ --output=json --output-path=/tmp/lh.json --chrome-flags="--headless --no-sandbox" --only-categories=performance,seo,accessibility,best-practices
```

---

## Post-Deploy: Submit to Search Engines

1. **Google Search Console** — https://search.google.com/search-console
   - Add property: `https://studios.zanzibaba.com` (URL prefix method)
   - Verify via DNS TXT record (Cloudflare → DNS → Add `TXT` record)
   - Sitemaps → Submit `https://studios.zanzibaba.com/sitemap.xml`

2. **Bing Webmaster Tools** — https://www.bing.com/webmasters
   - Add site, verify
   - Submit sitemap

3. **IndexNow** (instant indexing for Bing/Yandex) — https://www.indexnow.org/
   ```bash
   curl -X POST "https://api.indexnow.org/indexnow" \
     -H "Content-Type: application/json" \
     --data '{
       "host": "studios.zanzibaba.com",
       "key": "your-indexnow-key",
       "keyLocation": "https://studios.zanzibaba.com/indexnow-key.txt",
       "urlList": [
         "https://studios.zanzibaba.com/",
         "https://studios.zanzibaba.com/en/services/video-production/zanzibar/hotels"
       ]
     }'
   ```

---

## Continuous Deployment

The repo has GitHub Actions (`.github/workflows/deploy.yml`) that automatically
re-deploys to Vercel on every push to `main`. To enable:

1. In Vercel: Settings → Git → Connect Git Repository → select repo
2. In GitHub: Settings → Secrets and variables → Actions → add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

After that, every `git push origin main` triggers a new production deploy.

---

## Final Verification Checklist

```bash
URL="https://studios.zanzibaba.com"

# All routes
for route in / /en /sw /robots.txt /sitemap.xml /manifest.webmanifest; do
  code=$(curl -sL -o /dev/null -w "%{http_code}" "$URL$route")
  echo "$route → $code"
done

# Sample SEO pages
for route in \
  "/en/services/video-production/zanzibar/hotels" \
  "/sw/services/drone/nungwi/resorts" \
  "/en/services/hotel-photography/stone-town/villas" \
  "/en/services/content-creation/paje/tours" \
  "/sw/services/live-streaming/kendwa/investors"; do
  code=$(curl -sL -o /dev/null -w "%{http_code}" "$URL$route")
  echo "$route → $code"
done

# JSON-LD + WhatsApp + hreflang check on homepage
HTML=$(curl -sL "$URL/")
echo "JSON-LD blocks: $(echo "$HTML" | grep -c 'application/ld+json')"
echo "WhatsApp link:  $(echo "$HTML" | grep -c 'wa.me/255716002790')"
echo "hreflang:       $(echo "$HTML" | grep -c 'hrefLang')"
```

Expected output: all 200, multiple JSON-LD blocks, WhatsApp link present, hreflang present.

---

## Costs

| Service | Cost |
|---|---|
| GitHub (public repo) | Free |
| Vercel (Hobby plan) | Free (100 GB bandwidth/mo, plenty for launch) |
| Cloudflare (Free plan) | Free (unlimited DNS, free SSL, full feature set) |
| Domain renewal | ~$12/year (existing `zanzibaba.com`) |

**Total new monthly cost: $0**
