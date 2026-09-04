'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, TreePalm, Building2, Home, Route, Landmark, Waves, Briefcase, Music, Calendar } from 'lucide-react';
import { Reveal } from './Reveal';
import { Link } from '@/routing';

const INDUSTRIES = [
  { key: 'tourism', Icon: TreePalm },
  { key: 'construction', Icon: Building2 },
  { key: 'realEstate', Icon: Home },
  { key: 'infrastructure', Icon: Route },
  { key: 'government', Icon: Landmark },
  { key: 'marine', Icon: Waves },
  { key: 'business', Icon: Briefcase },
  { key: 'culture', Icon: Music },
  { key: 'events', Icon: Calendar },
] as const;

export function IndustriesSection() {
  const t = useTranslations('industries');

  return (
    <section id="industries" className="relative py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden="true" />
      <div className="container-z relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 60} className="group">
              <Link
                href="/#contact"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6 transition-all duration-500 hover:border-coral-400/40 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                  <div
                    className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-coral-500/0 blur-2xl transition-all duration-500 group-hover:bg-coral-500/20"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lagoon-300 transition-colors duration-500 group-hover:border-coral-400/30 group-hover:text-coral-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug text-white">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                      {t(`items.${key}.desc`)}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] font-medium text-white/50 transition-colors group-hover:text-coral-300">
                      <span>{t('explore')}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
