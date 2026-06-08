'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight, Check, Radio } from 'lucide-react';
import { Link } from '@/routing';
import { Reveal } from './Reveal';

const BG = '/images/zanzibar-live-broadcast.jpg';

export function ZanzibarLive() {
  const t = useTranslations('live');
  return (
    <section id="zanzibar-live" className="relative py-20 sm:py-24 md:py-32">
      <div className="container-z">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-ink-900/50 sm:rounded-[28px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-grid opacity-[0.07]" aria-hidden="true" />

          <div className="relative grid gap-10 p-7 md:grid-cols-2 md:p-14 lg:p-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-coral-400/40 bg-coral-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-200">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-75"
                    aria-hidden="true"
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full bg-coral-500"
                    aria-hidden="true"
                  />
                </span>
                {t('eyebrow')}
              </div>
              <h2 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {t('title')}
              </h2>
              <p className="mt-5 max-w-md text-pretty text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                {t('subtitle')}
              </p>

              <Link href="/#contact" className="btn-primary mt-8 group">
                {t('cta')}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>

            <Reveal delay={150} className="self-end">
              <div className="glass-strong rounded-2xl p-6 md:p-7">
                <p className="text-pretty font-display text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
                  <span className="text-lagoon-300" aria-hidden="true">
                    “
                  </span>
                  {t('tagline')}
                  <span className="text-lagoon-300" aria-hidden="true">
                    ”
                  </span>
                </p>
                <ul className="mt-6 space-y-3">
                  {(['f1', 'f2', 'f3', 'f4'] as const).map((k) => (
                    <li key={k} className="flex items-start gap-3 text-base font-medium text-white/90">
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lagoon-300/15 text-lagoon-300"
                        aria-hidden="true"
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {t(`features.${k}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-lagoon-300/80">
                  <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                  Broadcasting soon
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
