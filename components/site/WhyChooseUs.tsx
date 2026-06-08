'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Award, Wrench, Zap, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

const ICONS = [MapPin, Award, Wrench, Zap, Sparkles];
const KEYS = ['expertise', 'quality', 'gear', 'speed', 'story'] as const;

export function WhyChooseUs() {
  const t = useTranslations('why');
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="why-title"
    >
      {/* Backdrop image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/about-zanzibaba-studios.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-[0.18]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/95"
          aria-hidden="true"
        />
      </div>

      <div className="container-z">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-lagoon-400" aria-hidden="true" />
              <span>{t('eyebrow')}</span>
            </p>
            <h2
              id="why-title"
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"
            >
              {t('title')}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              {t('subtitle')}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70">
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-coral-500"
                aria-hidden="true"
              />
              240+ projects • 9 years on the island
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {KEYS.map((k, i) => {
                const Icon = ICONS[i];
                return (
                  <Reveal key={k} delay={i * 80}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 p-6 backdrop-blur-md transition-all hover:border-coral-400/40">
                      <div
                        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-coral-500/0 blur-2xl transition-all group-hover:bg-coral-500/20"
                        aria-hidden="true"
                      />
                      <div className="relative">
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lagoon-300">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="font-display text-lg font-semibold leading-snug text-white">
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
        </div>
      </div>
    </section>
  );
}
