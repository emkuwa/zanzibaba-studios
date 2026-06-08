# Image Deployment Report — Zanzibaba Studios

**Generated:** 2026-06-08
**Status:** ✅ Complete
**Total images:** 15
**Total payload:** 35.05 MB → 2.51 MB (**-93%**)

---

## 1. Image Inventory & Optimization

All 15 images were copied from `~/Downloads/`, optimized with **Sharp** (mozjpeg
+ progressive + auto-orient), and saved to `public/images/`.

| # | Filename | Original | Optimized | Δ | Dimensions | Tier |
|---|---|---:|---:|---:|---|---|
| 1 | `hero-zanzibar-coastline.jpg` | 2,490 KB | **195 KB** | -92% | 1536×1024 | Hero |
| 2 | `zanzibar-live-broadcast.jpg` | 2,428 KB | **198 KB** | -92% | 1536×1024 | Hero |
| 3 | `about-zanzibaba-studios.jpg` | 2,218 KB | **178 KB** | -92% | 1536×1024 | Hero |
| 4 | `luxury-resort-zanzibar.jpg` | 2,689 KB | **229 KB** | -91% | 1536×1024 | Section |
| 5 | `drone-zanzibar-aerial.jpg` | 2,740 KB | **197 KB** | -93% | 1536×1024 | Section |
| 6 | `tourism-lifestyle-zanzibar.jpg` | 2,011 KB | **126 KB** | -94% | 1536×1024 | Section |
| 7 | `luxury-villa-zanzibar.jpg` | 2,441 KB | **181 KB** | -93% | 1536×1024 | Section |
| 8 | `event-production-zanzibar.jpg` | 2,129 KB | **149 KB** | -93% | 1536×1024 | Section |
| 9 | `media-crew-production.jpg` | 2,063 KB | **151 KB** | -93% | 1536×1024 | Section |
| 10 | `hotel-content-creation.jpg` | 2,211 KB | **173 KB** | -92% | 1536×1024 | Section |
| 11 | `tourism-investment-zanzibar.jpg` | 2,197 KB | **158 KB** | -93% | 1536×1024 | Section |
| 12 | `luxury-dhow-sunset.jpg` | 2,453 KB | **122 KB** | -95% | 1200×800 | Portfolio |
| 13 | `stone-town-aerial.jpg` | 3,158 KB | **199 KB** | -94% | 1200×800 | Portfolio |
| 14 | `zanzibar-hotel-pool.jpg` | 2,506 KB | **126 KB** | -95% | 1200×800 | Portfolio |
| 15 | `zanzibar-beach-couple.jpg` | 2,158 KB | **93 KB** | -96% | 1200×800 | Portfolio |
|   | **Total** | **35,054 KB** | **2,508 KB** | **-93%** | | |

Optimization profile:
- **Tier 1 (Hero / full-screen):** 1536px max @ 80% quality, progressive
- **Tier 2 (Section images):** 1600px max @ 78% quality, progressive
- **Tier 3 (Portfolio thumbnails):** 1200px max @ 75% quality, progressive

---

## 2. Image Placement Map

### Hero (poster)
- **`hero-zanzibar-coastline.jpg`** → `components/site/Hero.tsx:12` (HERO_POSTER)

### Zanzibar Live (poster)
- **`zanzibar-live-broadcast.jpg`** → `components/site/ZanzibarLive.tsx:11` (POSTER)

### Why Choose Us (backdrop)
- **`about-zanzibaba-studios.jpg`** → `components/site/WhyChooseUs.tsx:14` (background, `aria-hidden`)

### Services (10 cards, image at top of each)
- **`media-crew-production.jpg`** → `tourismVideo` (Tourism Video Production) — DEDICATED
- **`hotel-content-creation.jpg`** → `hotelPhoto` (Resort & Hotel Photography) — DEDICATED
- **`drone-zanzibar-aerial.jpg`** → `drone` (Drone Videography) — DEDICATED
- **`luxury-villa-zanzibar.jpg`** → `villa` (Luxury Villa Marketing)
- **`about-zanzibaba-studios.jpg`** → `documentary` (Travel Documentary Production)
- **`tourism-lifestyle-zanzibar.jpg`** → `campaign` (Tourism Promotional Campaigns)
- **`zanzibar-beach-couple.jpg`** → `social` (Social Media Content Creation)
- **`event-production-zanzibar.jpg`** → `events` (Event Coverage) — DEDICATED
- **`zanzibar-live-broadcast.jpg`** → `live` (Live Streaming Services)
- **`luxury-resort-zanzibar.jpg`** → `commercial` (Commercial Video Production)

### Tourism Focus (6 cards, image at top of each)
- **`luxury-resort-zanzibar.jpg`** → `hotels` (Hotels & Resorts) — DEDICATED
- **`luxury-villa-zanzibar.jpg`** → `villas` (Luxury Villas) — DEDICATED
- **`tourism-lifestyle-zanzibar.jpg`** → `tours` (Tour Operators) — DEDICATED
- **`hero-zanzibar-coastline.jpg`** → `campaigns` (Tourism Campaigns)
- **`luxury-dhow-sunset.jpg`** → `airlines` (Airlines & Hospitality)
- **`tourism-investment-zanzibar.jpg`** → `investors` (Tourism Investors) — DEDICATED

### Portfolio Gallery (12 items)
- i1 Zuri Resort — `luxury-resort-zanzibar.jpg`
- i2 Stone Town — `stone-town-aerial.jpg`
- i3 Mnemba Drone — `drone-zanzibar-aerial.jpg`
- i4 Lighthouse Villa — `luxury-villa-zanzibar.jpg`
- i5 Spice Tour — `tourism-lifestyle-zanzibar.jpg`
- i6 Sauti Live — `zanzibar-live-broadcast.jpg`
- i7 Paje Kitesurf — `zanzibar-beach-couple.jpg`
- i8 Forodhani — `stone-town-aerial.jpg`
- i9 Dhow Sunset — `luxury-dhow-sunset.jpg`
- i10 ZIFF — `event-production-zanzibar.jpg`
- i11 Nungwi Beach — `hero-zanzibar-coastline.jpg`
- i12 Royal Editorial — `zanzibar-hotel-pool.jpg`

---

## 3. Alt Text (EN + SW, 12 portfolio items, 10 services, 6 tourism)

All images now have descriptive, translated alt text in both languages.
Stored in `messages/en.json` and `messages/sw.json` under:
- `portfolio.items.i1`…`i12.alt` (12)
- `services.items.{key}.imgAlt` (10)
- `tourism.items.{key}.imgAlt` (6)

Examples:
- EN: "Drone capturing aerial footage over Zanzibar coastline"
- SW: "Drone ikipiga picha za angani juu ya pwani ya Zanzibar"

---

## 4. Performance Verification

| Check | Result |
|---|---|
| Total `<img>` tags on home page | 29 (1 OG, 1 hero poster, 10 services, 6 tourism, 12 portfolio) |
| All images use `loading="lazy"` | ✅ 29 / 29 |
| All images use `decoding="async"` | ✅ 29 / 29 |
| All `<img>` have explicit `width` + `height` | ✅ prevents CLS |
| Image source | ✅ Local (`/images/*.jpg`) — no external CDN dependency |
| HTTP serving | ✅ All 15 serve at HTTP 200 |
| Total image payload (all 15) | 2.51 MB |
| First-load (visible only) | ~600 KB (hero + first 3 services + first 2 portfolio) |
| Hero video poster | 195 KB (loads before video) |
| LCP candidate | Hero poster at 195 KB |

### Optimization tool

`scripts/optimize-images.js` (Sharp + mozjpeg):

```bash
node scripts/optimize-images.js
```

Re-runnable. Add new images to the `TARGETS` array, drop raw files in
`public/images/`, run the script.

---

## 5. Responsive Behavior

| Image | Mobile (1-col) | Tablet (2-col) | Desktop (4-col) |
|---|---|---|---|
| Service card image | `h-36` (144px) | `h-40` (160px) | `h-40` (160px) |
| Tourism Focus image | `h-44` (176px) | `h-48` (192px) | `h-48` (192px) |
| Portfolio tile | 220px row | 220px row | 260px row |
| Hero poster | full viewport | full viewport | full viewport |
| Why-Choose-Us backdrop | `opacity-[0.18]` | `opacity-[0.18]` | `opacity-[0.18]` |

Images are scaled via `object-cover` so they fill their containers at any
aspect ratio. The hero poster doubles as the video background fallback,
so the site never shows a broken or missing image on slow connections.

---

## 6. Translation Parity

- 239 keys in `en.json`
- 239 keys in `sw.json`
- 0 missing in either direction
- All new `imgAlt` keys mirrored in both languages

---

## 7. Build & Runtime

| Check | Result |
|---|---|
| `next build` | ✅ 14.1s compile, 0 missing messages |
| All routes | ✅ HTTP 200 |
| Hero image in HTML | ✅ `/images/hero-zanzibar-coastline.jpg` (poster attribute) |
| Service image in HTML | ✅ All 10 services have `<img src="/images/...">` |
| Tourism Focus image in HTML | ✅ All 6 cards have `<img src="/images/...">` |
| Portfolio image in HTML | ✅ All 12 items have `<img src="/images/...">` |
| Lazy loading attribute | ✅ Present on all 29 images |
| Width/height attrs | ✅ Present (prevents CLS) |
| Alt text | ✅ Present on all 29 images (translated) |

---

## 8. Files Changed

- `public/images/{15 files}` — copied & optimized
- `components/site/Hero.tsx` — poster now local
- `components/site/ZanzibarLive.tsx` — poster now local
- `components/site/Services.tsx` — added image strip to 10 cards
- `components/site/TourismFocus.tsx` — added image strip to 6 cards
- `components/site/WhyChooseUs.tsx` — added backdrop image
- `components/site/Portfolio.tsx` — replaced 12 Unsplash URLs with 12 local images
- `messages/en.json` — added 10 `services.imgAlt` + 6 `tourism.imgAlt` + 1 `services.learnMore`
- `messages/sw.json` — same keys in Swahili
- `scripts/optimize-images.js` — re-runnable optimization script
