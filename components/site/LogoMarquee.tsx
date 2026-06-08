'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './Reveal';

const partners = [
  'ZURI RESORT',
  'AQUA TOUR',
  'LIGHTHOUSE VILLA',
  'ESSQUE ZALIA',
  'SAUTI FEST',
  'ZAN AIR',
  'KENDWA ROCKS',
  'MNEMBA ISLAND',
  'STONE TOWN HOTEL',
  'FORODHANI',
  'PEMBA ISLAND',
  'MATHIAS HOTEL',
];

export function LogoMarquee() {
  const t = useTranslations('logos');
  return (
    <section
      id="logos"
      className="relative border-y border-white/5 bg-ink-900/40 py-12"
      aria-label="Trusted partners"
    >
      <Reveal className="container-z">
        <p className="text-center text-[11px] uppercase tracking-[0.32em] text-white/50">
          {t('title')}
        </p>
      </Reveal>
      <div className="marquee-mask mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="font-display text-2xl font-medium tracking-tight text-white/30 transition-colors hover:text-coral-300/80 sm:text-3xl"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
