'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from '@/routing';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

const PACKAGES = [
  { key: 'essentials', featured: false },
  { key: 'signature', featured: true },
  { key: 'campaign', featured: false },
] as const;

export function Pricing() {
  const t = useTranslations('pricing');
  return (
    <section id="pricing" className="relative py-20 sm:py-24 md:py-32">
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

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PACKAGES.map(({ key, featured }, i) => {
            const paddedIndex = String(i + 1).padStart(2, '0');
            return (
              <Reveal key={key} delay={i * 100}>
                <div
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all',
                    featured
                      ? 'border-coral-400/40 bg-gradient-to-br from-coral-500/[0.10] via-ink-900/80 to-ink-900/80 shadow-glow-coral'
                      : 'border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 hover:border-lagoon-300/30'
                  )}
                >
                  {featured && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-coral-400/40 bg-coral-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-coral-200">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {t('popular')}
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] uppercase tracking-[0.32em] text-lagoon-300/80">
                      {t('packageLabel', { index: paddedIndex })}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">
                      {t(`items.${key}.name`)}
                    </h3>
                    <p className="mt-2 text-base font-medium leading-relaxed text-white/80">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span
                      className={cn(
                        'font-display text-3xl font-semibold leading-none md:text-4xl',
                        featured ? 'text-coral-300' : 'text-white'
                      )}
                    >
                      {t(`items.${key}.price`)}
                    </span>
                    <span className="text-xs text-white/45">{t('perProject')}</span>
                  </div>

                  <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-white/45">
                    {t('includes')}
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {(t.raw(`items.${key}.features`) as string[]).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
                        <span
                          className={cn(
                            'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full',
                            featured ? 'bg-coral-500/20 text-coral-300' : 'bg-lagoon-300/15 text-lagoon-300'
                          )}
                        >
                          <Check className="h-2.5 w-2.5" aria-hidden="true" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <Link
                      href="/#contact"
                      className={cn(
                        'inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-300',
                        featured
                          ? 'bg-coral-500 text-white hover:bg-coral-400 shadow-glow-coral'
                          : 'border border-white/15 bg-white/[0.04] text-white hover:border-coral-400/50 hover:text-coral-200'
                      )}
                    >
                      {t('cta')}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
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
