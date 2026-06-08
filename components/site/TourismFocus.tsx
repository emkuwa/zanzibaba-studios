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
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(800px circle at 80% 10%, rgba(255,90,20,0.15), transparent 60%), radial-gradient(800px circle at 10% 90%, rgba(34,211,238,0.12), transparent 60%)',
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
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/65 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KEYS.map((k, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={k} delay={i * 70}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/80 to-ink-900/60 transition-colors hover:border-lagoon-300/30">
                  {/* Image */}
                  <div className="relative h-44 w-full overflow-hidden sm:h-48">
                    <img
                      src={IMAGES[k]}
                      alt={t(`items.${k}.imgAlt`)}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/40 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/30 bg-ink-900/70 backdrop-blur-md">
                      <Icon className="h-5 w-5 text-lagoon-300 transition-colors group-hover:text-coral-300" aria-hidden="true" />
                    </div>
                    <div className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.32em] text-white/55">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative p-6">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {t(`items.${k}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
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
