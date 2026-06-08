/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(process.cwd(), 'public/images');
const OUT = path.join(process.cwd(), 'public/images');

const TARGETS = [
  // Hero/backgrounds: 1920px @ 80%
  { name: 'hero-zanzibar-coastline', w: 1920, q: 80 },
  { name: 'zanzibar-live-broadcast', w: 1920, q: 80 },
  { name: 'about-zanzibaba-studios', w: 1920, q: 80 },
  // Section: 1600px @ 78%
  { name: 'luxury-resort-zanzibar', w: 1600, q: 78 },
  { name: 'drone-zanzibar-aerial', w: 1600, q: 78 },
  { name: 'tourism-lifestyle-zanzibar', w: 1600, q: 78 },
  { name: 'luxury-villa-zanzibar', w: 1600, q: 78 },
  { name: 'event-production-zanzibar', w: 1600, q: 78 },
  { name: 'media-crew-production', w: 1600, q: 78 },
  { name: 'hotel-content-creation', w: 1600, q: 78 },
  { name: 'tourism-investment-zanzibar', w: 1600, q: 78 },
  // Portfolio: 1200px @ 75%
  { name: 'luxury-dhow-sunset', w: 1200, q: 75 },
  { name: 'stone-town-aerial', w: 1200, q: 75 },
  { name: 'zanzibar-hotel-pool', w: 1200, q: 75 },
  { name: 'zanzibar-beach-couple', w: 1200, q: 75 },
];

(async () => {
  let beforeTotal = 0;
  let afterTotal = 0;
  console.log('Optimizing images…\n');
  for (const t of TARGETS) {
    const src = path.join(SRC, `${t.name}.jpg`);
    if (!fs.existsSync(src)) {
      console.log(`✗ ${t.name}.jpg — source missing`);
      continue;
    }
    const before = fs.statSync(src).size;
    const meta = await sharp(src).metadata();
    const w0 = meta.width;
    const h0 = meta.height;
    const ratio = h0 / w0;
    const newW = Math.min(t.w, w0);
    const newH = Math.round(newW * ratio);
    const out = path.join(OUT, `${t.name}.jpg`);
    await sharp(src)
      .resize({ width: newW, withoutEnlargement: true })
      .jpeg({ quality: t.q, mozjpeg: true, progressive: true, optimizeScans: true })
      .toFile(out + '.tmp');
    fs.renameSync(out + '.tmp', out);
    const after = fs.statSync(out).size;
    beforeTotal += before;
    afterTotal += after;
    const pct = Math.round((1 - after / before) * 100);
    console.log(
      `✓ ${t.name.padEnd(34)} ${w0}x${h0} → ${newW}x${newH}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${pct}%)`
    );
  }
  console.log(
    `\nTotal: ${(beforeTotal/1024/1024).toFixed(2)} MB → ${(afterTotal/1024/1024).toFixed(2)} MB  (saved ${((beforeTotal-afterTotal)/1024/1024).toFixed(2)} MB, -${Math.round((1-afterTotal/beforeTotal)*100)}%)`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
