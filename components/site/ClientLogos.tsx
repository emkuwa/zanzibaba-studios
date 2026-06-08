'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './Reveal';

const CATEGORIES: {
  key: 'hotels' | 'tours' | 'airlines' | 'hospitality';
  logos: string[];
}[] = [
  {
    key: 'hotels',
    logos: [
      'ZURI RESORT',
      'ESSQUE ZALIA',
      'MATEMWE LODGE',
      'KENDWA ROCKS',
      'ROYAL ZANZIBAR',
      'MELIÃ',
    ],
  },
  {
    key: 'tours',
    logos: [
      'AQUATOUR',
      'BLUESAFARI',
      'ZANZIBAR ADVENTURES',
      'SPICE CO.',
      'ECO BLUE',
      'DOLPHIN TOURS',
    ],
  },
  {
    key: 'airlines',
    logos: [
      'ZANAIR',
      'COASTAL AVIATION',
      'AURIC AIR',
      'FLIGHTLINK',
      'PRECISION AIR',
      'TANGA AIR',
    ],
  },
  {
    key: 'hospitality',
    logos: [
      'SERENA HOTELS',
      '&BEYOND',
      'ANANTARA',
      'KEMPINSKI',
      'ONE&ONLY',
      'SINGITA',
    ],
  },
];

export function ClientLogos() {
  const t = useTranslations('clientLogos');
  return (
    <section
      className="relative py-20 sm:py-24 md:py-32"
      aria-labelledby="client-logos-title"
    >
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2
            id="client-logos-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/65 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6 transition-colors hover:border-coral-400/30">
                <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-lagoon-300/90">
                    0{i + 1}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {t(`categories.${cat.key}`)}
                  </div>
                </div>
                <ul className="space-y-3">
                  {cat.logos.map((logo) => (
                    <li
                      key={logo}
                      className="font-display text-lg font-semibold tracking-tight text-white/60 transition-colors hover:text-coral-300 sm:text-xl"
                    >
                      {logo}
                    </li>
                  ))}
                </ul>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-900/60 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
