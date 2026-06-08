'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const ITEMS = [
  {
    key: 'f1',
    img: '/images/luxury-resort-zanzibar.jpg',
    span: 'wide' as const,
  },
  {
    key: 'f2',
    img: '/images/drone-zanzibar-aerial.jpg',
  },
  {
    key: 'f3',
    img: '/images/luxury-villa-zanzibar.jpg',
  },
];

export function FeaturedProjects() {
  const t = useTranslations('featured');
  return (
    <section
      id="featured"
      className="relative py-20 sm:py-24 md:py-32"
      aria-labelledby="featured-title"
    >
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2
            id="featured-title"
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {ITEMS.map((item, i) => {
            const k = item.key as 'f1' | 'f2' | 'f3';
            return (
              <Reveal
                key={k}
                delay={i * 100}
                className={
                  item.span === 'wide'
                    ? 'lg:col-span-3'
                    : 'lg:col-span-1'
                }
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 transition-all hover:border-coral-400/40 md:flex-row">
                  {/* Image */}
                  <div
                    className={
                      item.span === 'wide'
                        ? 'relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:w-3/5'
                        : 'relative aspect-[16/10] w-full overflow-hidden md:aspect-[4/5]'
                    }
                  >
                    <img
                      src={item.img}
                      alt={t(`items.${k}.imgAlt`)}
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={1000}
                      className="h-full w-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/10 via-transparent to-transparent md:bg-gradient-to-r md:from-ink-950/10 md:via-transparent md:to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-coral-400/40 bg-coral-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-coral-200 backdrop-blur-md">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-coral-400"
                        aria-hidden="true"
                      />
                      {t(`items.${k}.year`)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-1 flex-col p-6 md:p-8">
                    <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-lagoon-300/90">
                      {t('client')}
                    </div>
                    <div className="mt-1 text-base font-semibold text-white">
                      {t(`items.${k}.client`)}
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                      {t(`items.${k}.title`)}
                    </h3>

                    <div className="mt-5 grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-white/60">
                          {t('scope')}
                        </span>
                        <div className="mt-1 text-white/85">{t(`items.${k}.scope`)}</div>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <a
                        href="/#contact"
                        className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-coral-300 transition-colors hover:text-coral-200"
                      >
                        {t('viewCase')}
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
