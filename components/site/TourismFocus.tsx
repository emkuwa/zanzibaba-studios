'use client';

import { useTranslations } from 'next-intl';
import { Building2, Castle, Compass, Megaphone, Plane, TrendingUp } from 'lucide-react';
import { Reveal } from './Reveal';

const ICONS = [Building2, Castle, Compass, Megaphone, Plane, TrendingUp];
const KEYS = ['hotels', 'villas', 'tours', 'campaigns', 'airlines', 'investors'] as const;

const IMAGES: Record<string, string> = {
  hotels: '/images/luxury-resort-zanzibar.jpg',
  villas: '/images/luxury-villa-zanzibar.jpg',
  tours: '/images/tourism-lifestyle-zanzibar.jpg',
  campaigns: '/images/hero-zanzibar-coastline.jpg',
  airlines: '/images/luxury-dhow-sunset.jpg',
  investors: '/images/tourism-investment-zanzibar.jpg',
};

export function TourismFocus() {
  const t = useTranslations('tourism');
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="tourism-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(800px circle at 80% 10%, rgba(255,90,20,0.10), transparent 60%), radial-gradient(800px circle at 10% 90%, rgba(34,211,238,0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="container-z relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2
            id="tourism-title"
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Mobile: 1 card per row, large images. Tablet: 2 cols. Desktop: 3 cols. */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {KEYS.map((k, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={k} delay={i * 70}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-lagoon-300/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                  {/* Image — large, 4:5 aspect ratio, images are the focus */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={IMAGES[k]}
                      alt={t(`items.${k}.imgAlt`)}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={1500}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Lighter gradient — only at bottom for text legibility */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/10 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    {/* Number badge */}
                    <div className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.2em] font-semibold text-white/80">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Body — text outside image, clear and readable */}
                  <div className="relative p-6">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lagoon-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-bold leading-snug text-white md:text-2xl">
                      {t(`items.${k}.title`)}
                    </h3>
                    <p className="mt-3 text-base font-medium leading-relaxed text-white/80">
                      {t(`items.${k}.desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
