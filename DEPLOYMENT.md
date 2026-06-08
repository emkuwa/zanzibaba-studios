# Zanzibaba Studios — Deployment Guide

Production-ready Next.js 16 application for the premium tourism media brand
based in Zanzibar.

## Architecture

- **Framework:** Next.js 16.2.7 (App Router, Turbopack)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.4
- **i18n:** next-intl 4.13 (English `/`, Kiswahili `/sw`)
- **Icons:** lucide-react
- **Output:** Static + Server components, all 7 routes pre-rendered

## Build

```bash
npm install --no-audit --no-fund
npm run build      # ~30s with Turbopack
npm run start      # production server on :3000
```

## Environment

The site ships with no required environment variables. The following values
live in `lib/site.ts` and should be reviewed before launch:

| Field | Current | Action |
|---|---|---|
| `url` | `https://zanzibabastudios.com` | Update to real domain |
| `email` | `hello@zanzibabastudios.com` | Verify mailbox exists |
| `phone` / `phoneRaw` | `+255 700 000 000` | Replace with real number |
| `whatsapp` / `whatsappDisplay` | `255700000000` | Replace with real WhatsApp Business number |
| `address` | Stone Town, Zanzibar | Verify |

For a contact-form email pipeline, wire one of these into a new
`app/api/contact/route.ts` and have the client post there in addition to
the WhatsApp deep-link:

- Resend (https://resend.com)
- SendGrid (https://sendgrid.com)
- Formspree (https://formspree.io)
- Plunk (https://useplunk.com)

## SEO Assets to Replace

| File | Purpose | Action |
|---|---|---|
| `public/og.svg` | Open Graph / Twitter card | Replace with 1200×630 PNG/JPG for max platform support |
| `public/favicon.svg` | Browser tab + manifest | Keep as-is or add a 512×512 PNG fallback |

## Deploy Targets

### Vercel (recommended — zero config)

```bash
npx vercel --prod
```

The project will be auto-detected as Next.js 16. Set the production
domain in `lib/site.ts` to the assigned `*.vercel.app` or your custom
domain.

### Netlify

```bash
npx netlify deploy --prod
```

Build command: `npm run build`
Publish directory: `.next`

### Self-hosted (Node server)

```bash
npm run build
PORT=3000 npm run start
```

Behind nginx:

```nginx
server {
  listen 80;
  server_name zanzibabastudios.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  client_max_body_size 10m;
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
}
```

## Post-deploy Verification

1. Visit `/` and `/sw` — both should render their respective copy.
2. `curl https://yourdomain.com/robots.txt` — should list sitemap.
3. `curl https://yourdomain.com/sitemap.xml` — should list `/`, `/en`, `/sw`.
4. Open browser DevTools → Lighthouse — Performance, SEO, Accessibility
   should all be ≥ 90.
5. Submit sitemap to Google Search Console and Bing Webmaster Tools.
6. Verify the WhatsApp deep-link works from a real device.
7. Verify the contact form opens WhatsApp with a pre-filled message.

## Maintenance

- **Content edits:** All copy lives in `messages/en.json` and
  `messages/sw.json`. No React changes required.
- **New service / portfolio item:** Add a translation key in both files,
  add a row in `components/site/Portfolio.tsx` (if portfolio) or the
  relevant `KEYS` array (if a service).
- **Replace hero video:** Update `HERO_VIDEO` and `HERO_POSTER` in
  `components/site/Hero.tsx`.
- **Replace Zanzibar Live video:** Update `VIDEO` and `POSTER` in
  `components/site/ZanzibarLive.tsx`.

## Security Notes

- The site ships with `X-Robots-Tag: index, follow` enabled.
- No third-party scripts are loaded by default (only Google Fonts CSS).
- All external links use `rel="noopener noreferrer"`.
- The contact form validates email format on the client; add a server
  endpoint for production-grade validation and spam protection
  (hCaptcha, Cloudflare Turnstile, etc.).
