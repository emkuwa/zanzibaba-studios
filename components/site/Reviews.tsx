'use client';

import { useTranslations } from 'next-intl';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useState } from 'react';

const REVIEW_KEYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const;

// Real Unsplash portrait photos (free to use)
const PHOTOS: Record<string, string> = {
  r1: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80',
  r2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  r3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
  r4: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
  r5: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
  r6: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
};

export function Reviews() {
  const t = useTranslations('reviews');
  const [start, setStart] = useState(0);
  const perPage = 3;
  const max = REVIEW_KEYS.length - perPage;

  const visible = REVIEW_KEYS.slice(start, start + perPage);

  const next = () => setStart((s) => (s >= max ? 0 : s + 1));
  const prev = () => setStart((s) => (s <= 0 ? max : s - 1));

  return (
    <section
      className="relative py-20 sm:py-24 md:py-32"
      aria-labelledby="reviews-title"
    >
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="reviews-title"
              className="max-w-2xl text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
            >
              {t('title')}
            </h2>
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous reviews"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition-colors hover:border-coral-400/50 hover:text-coral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next reviews"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-coral-400/50 hover:text-coral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        <div
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          aria-live="polite"
        >
          {visible.map((k, i) => {
            const photo = PHOTOS[k];
            return (
              <Reveal key={k} delay={i * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 p-6 transition-all hover:border-coral-400/30 md:p-7">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={photo}
                      alt={t(`items.${k}.photoAlt`)}
                      loading="lazy"
                      decoding="async"
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <div className="truncate text-base font-semibold text-white">
                          {t(`items.${k}.name`)}
                        </div>
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0 text-lagoon-300"
                          aria-label={t('verified')}
                        />
                      </div>
                      <div className="truncate text-sm font-medium text-white/75">
                        {t(`items.${k}.role`)}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] font-medium text-white/55">
                        {t(`items.${k}.date`)} · {t('source')}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-5 flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-coral-300" aria-label={`${t(`items.${k}.rating`)} out of 5`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3.5 w-3.5 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {t(`items.${k}.rating`)}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Google
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-5 flex-1 text-pretty text-base font-medium leading-relaxed text-white/90 md:text-lg">
                    <p>"{t(`items.${k}.quote`)}"</p>
                  </blockquote>

                  {/* Verified badge */}
                  <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4 text-[11px] uppercase tracking-[0.2em] font-semibold text-lagoon-300/90">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    {t('verified')}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile nav */}
        <div className="mt-8 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-coral-400/50 hover:text-coral-300"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === start ? 'w-6 bg-coral-500' : 'w-1.5 bg-white/20'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-coral-400/50 hover:text-coral-300"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
