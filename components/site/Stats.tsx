'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './Reveal';

const STAT_KEYS = ['s1', 's2', 's3', 's4'] as const;

export function Stats() {
  const t = useTranslations('stats');
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="stats-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(1000px circle at 20% 0%, rgba(255,90,20,0.12), transparent 60%), radial-gradient(1000px circle at 80% 100%, rgba(34,211,238,0.10), transparent 60%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-z">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-lagoon-400" aria-hidden="true" />
              <span>{t('eyebrow')}</span>
            </p>
            <h2
              id="stats-title"
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"
            >
              {t('title')}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              {t('subtitle')}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-2">
              {STAT_KEYS.map((k, i) => (
                <Reveal key={k} delay={i * 100}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 p-7 backdrop-blur-sm transition-all hover:border-coral-400/40 md:p-9">
                    <div
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral-500/0 blur-2xl transition-all duration-500 group-hover:bg-coral-500/20"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div
                        className="font-display text-6xl font-bold leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
                        style={{
                          background:
                            'linear-gradient(135deg, #ffffff 0%, #f5f3ee 50%, #ff5a14 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {t(`${k}.value`)}
                      </div>
                      <div className="mt-4 h-px w-12 bg-gradient-to-r from-coral-500 to-transparent" />
                      <div className="mt-4 text-sm font-medium text-white/80 md:text-base">
                        {t(`${k}.label`)}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
