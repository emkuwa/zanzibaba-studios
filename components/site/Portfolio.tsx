'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight, Image as ImageIcon, Video as VideoIcon, Plane, Megaphone, Calendar } from 'lucide-react';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | 'video' | 'photo' | 'drone' | 'campaign' | 'events';

type Item = {
  key: string;
  type: FilterKey;
  img: string;
  span?: 'wide' | 'tall' | 'normal';
};

const ITEMS: Item[] = [
  { key: 'i1', type: 'video', span: 'wide', img: '/images/luxury-resort-zanzibar.jpg' },
  { key: 'i2', type: 'photo', img: '/images/stone-town-aerial.jpg' },
  { key: 'i3', type: 'drone', span: 'tall', img: '/images/drone-zanzibar-aerial.jpg' },
  { key: 'i4', type: 'video', img: '/images/luxury-villa-zanzibar.jpg' },
  { key: 'i5', type: 'campaign', img: '/images/tourism-lifestyle-zanzibar.jpg' },
  { key: 'i6', type: 'events', img: '/images/zanzibar-live-broadcast.jpg' },
  { key: 'i7', type: 'photo', img: '/images/zanzibar-beach-couple.jpg' },
  { key: 'i8', type: 'drone', img: '/images/stone-town-aerial.jpg' },
  { key: 'i9', type: 'campaign', img: '/images/luxury-dhow-sunset.jpg' },
  { key: 'i10', type: 'events', img: '/images/event-production-zanzibar.jpg' },
  { key: 'i11', type: 'video', img: '/images/hero-zanzibar-coastline.jpg' },
  { key: 'i12', type: 'photo', img: '/images/zanzibar-hotel-pool.jpg' },
];

const FILTERS: { key: FilterKey; Icon?: any }[] = [
  { key: 'all' },
  { key: 'video', Icon: VideoIcon },
  { key: 'photo', Icon: ImageIcon },
  { key: 'drone', Icon: Plane },
  { key: 'campaign', Icon: Megaphone },
  { key: 'events', Icon: Calendar },
];

const TYPE_TO_SLUG: Record<FilterKey, string> = {
  all: 'video-production',
  video: 'video-production',
  photo: 'photography',
  drone: 'aerial-drone',
  campaign: 'commercial',
  events: 'events',
};

export function Portfolio() {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const [filter, setFilter] = useState<FilterKey>('all');

  const items = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((i) => i.type === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative py-20 sm:py-24 md:py-32">
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-lagoon-400" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="mt-10 flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Portfolio filters"
          >
            {FILTERS.map(({ key, Icon }) => {
              const isActive = filter === key;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="portfolio-grid"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400',
                    isActive
                      ? 'border-coral-400/60 bg-coral-500/15 text-coral-200 shadow-glow-coral'
                      : 'border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white'
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {t(`filters.${key}`)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Mobile-first luxury showcase:
            - 1 column on mobile (one large card per viewport)
            - 2 columns on sm
            - 3 columns on lg
            - 4 columns on xl
            - Taller cards (380-420px) so the image dominates
            - Larger border radius (rounded-3xl)
            - Subtle hover scale (1.04) and warm glow
            - Title overlay only (no extra body content)
        */}
        <div
          id="portfolio-grid"
          role="tabpanel"
          aria-live="polite"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
        >
          {items.map((item, i) => {
            const alt = t(`items.${item.key}.alt`);
            return (
              <Reveal
                key={item.key}
                delay={i * 40}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800 transition-colors hover:border-coral-400/30',
                  item.span === 'wide' && 'sm:col-span-2 lg:col-span-2',
                  item.span === 'tall' && 'sm:row-span-2'
                )}
              >
                <a
                  href={`/${locale === 'en' ? '' : 'sw/'}services/${TYPE_TO_SLUG[item.type] || 'video-production'}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  aria-label={t(`items.${item.key}.title`)}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] md:aspect-[6/7] lg:aspect-[4/5]">
                    <img
                      src={item.img}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={1500}
                      className="h-full w-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-300">
                      {t(`items.${item.key}.tag`)}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white md:text-xl">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/75">
                        {t('viewProject')}
                      </span>
                      <span
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/[0.06] transition-all group-hover:border-coral-400 group-hover:bg-coral-500"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
