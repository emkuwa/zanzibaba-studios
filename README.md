# Zanzibaba Studios — Premium Tourism Media Website

A modern, cinematic, world-class website for **Zanzibaba Studios** — Zanzibar's
home for tourism cinema, photography and live broadcasting.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**
and **next-intl** (English + Kiswahili).

## Highlights

- Full-screen cinematic video hero with custom Zanzibar footage
- Dark, luxury design system with **coral orange** and **turquoise** accents
- 10 service cards, filterable portfolio, tourism-focus grid
- **Zanzibar Live** flagship streaming section
- Pricing packages, testimonials, and full contact form
- Floating **WhatsApp** quick-contact (deep-link to producers)
- Multi-language (English / Kiswahili) with URL routing
- SEO optimized: OpenGraph, Twitter cards, sitemap, robots, JSON-LD
- Mobile-first, fast loading, reveal-on-scroll animations
- Custom cursor + scroll progress + custom branded favicon

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev          # http://localhost:3000

# Build for production
npm run build
npm run start

# Lint
npm run lint
```

## Project structure

```
app/
  [locale]/           # Locale-prefixed routes
    layout.tsx        # Root i18n layout, fonts, metadata, JSON-LD
    page.tsx          # Home page composition
  layout.tsx          # Minimal root layout (required by Next.js)
  globals.css         # Design system, animations, utilities
  manifest.ts         # PWA manifest
  robots.ts           # robots.txt
  sitemap.ts          # dynamic sitemap.xml
components/site/
  Navbar.tsx          # Top nav with language switcher + mobile menu
  Hero.tsx            # Cinematic video hero
  LogoMarquee.tsx     # Trusted-by partner marquee
  Services.tsx        # 10 service cards
  Portfolio.tsx       # Filterable portfolio gallery
  TourismFocus.tsx    # Tourism client types grid
  ZanzibarLive.tsx    # Live streaming project
  WhyChooseUs.tsx     # 5 reasons to choose
  Testimonials.tsx    # Client testimonials
  Pricing.tsx         # Production packages
  Contact.tsx         # Contact form + WhatsApp integration
  Footer.tsx          # Site footer with newsletter
  WhatsAppFloat.tsx   # Floating WhatsApp button
  Cursor.tsx          # Custom premium cursor
  ScrollProgress.tsx  # Top scroll progress bar
  VideoBackground.tsx # Video with poster fallback
  Reveal.tsx          # Reveal-on-scroll utility
  LanguageSwitcher.tsx# EN / SW switcher
  Logo.tsx            # Branded logo SVG
lib/
  site.ts             # Site config (social, contact, address)
  utils.ts            # cn() utility
messages/
  en.json             # English translations
  sw.json             # Kiswahili translations
i18n.ts               # next-intl config
routing.ts            # Locale routing config
middleware.ts         # Locale detection middleware
public/
  favicon.svg         # Branded favicon
  og.svg              # OpenGraph hero image
```

## Customization

### Brand colors

Edit `tailwind.config.ts`:

```ts
coral: { 500: '#ff5a14' },  // Primary brand orange
lagoon: { 400: '#22d3ee' }, // Turquoise accent
ink: { 950: '#050608' },    // Background
```

### Contact details & WhatsApp

Edit `lib/site.ts`:

```ts
email: 'hello@zanzibabastudios.com',
phone: '+255 700 000 000',
whatsapp: '255700000000',
```

### Hero video

Edit `components/site/Hero.tsx`:

```ts
const HERO_VIDEO =
  'https://your-cdn.com/zanzibar-hero.mp4';
const HERO_POSTER =
  'https://your-cdn.com/zanzibar-hero-poster.jpg';
```

### Translations

All copy lives in `messages/en.json` and `messages/sw.json`.
Add or rename keys and they are immediately reflected across the UI.

## Tech notes

- `next-intl` is configured with `localePrefix: 'as-needed'` so the default
  English locale lives at `/` and Kiswahili at `/sw`.
- All images are loaded from Unsplash CDN — swap with your own assets in
  `public/`.
- Hero/Zanzibar Live videos load from Pexels CDN — replace with your own
  mastered reels for production.
- The contact form deep-links to WhatsApp with a pre-filled message that
  includes the user's enquiry — drop in a server endpoint (Resend, SendGrid,
  Formspree) for a true email pipeline.
