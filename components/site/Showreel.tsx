'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Film } from 'lucide-react';
import { Reveal } from './Reveal';
import Link from 'next/link';

export function Showreel() {
  const t = useTranslations('showreel');

  return (
    <section
      className="relative isolate overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="showreel-title"
    >
      <div className="container-z">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-ink-900 sm:rounded-[28px]">
          {/* Cinematic background image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-zanzibar-coastline.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/30 to-ink-950/10" aria-hidden="true" />
          </div>

          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden="true" />

          {/* Cinematic letterbox bars */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-ink-950/80 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-950/80 to-transparent" aria-hidden="true" />

          <div className="relative grid min-h-[480px] place-items-center p-8 text-center sm:min-h-[560px] md:min-h-[640px] md:p-16">
            <Reveal className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-coral-400/40 bg-coral-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-200">
                <Film className="h-3 w-3" aria-hidden="true" />
                {t('eyebrow')}
              </div>

              <h2
                id="showreel-title"
                className="mt-6 max-w-2xl text-balance font-display text-5xl font-bold leading-[1] tracking-tight text-white sm:text-6xl md:text-7xl"
              >
                {t('title')}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
                {t('subtitle')}
              </p>

              <Link
                href="/#contact"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-coral-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-glow-coral transition-all hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
