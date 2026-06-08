'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ArrowUpRight, Sparkles, Plus, Minus } from 'lucide-react';
import { Link } from '@/routing';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

const PACKAGES = [
  { key: 'essentials', featured: false },
  { key: 'signature', featured: true },
  { key: 'campaign', featured: false },
] as const;

const SERVICE_KEYS = ['photography', 'drone', 'video', 'social', 'live', 'event'] as const;
const ADDON_KEYS = ['extraDay', 'extraReel', 'extraPhotos', 'express', 'voiceover', 'music'] as const;

const SERVICE_PRICES: Record<string, number> = {
  photography: 350,
  drone: 400,
  video: 800,
  social: 200,
  live: 600,
  event: 500,
};

const ADDON_PRICES: Record<string, number> = {
  extraDay: 500,
  extraReel: 350,
  extraPhotos: 150,
  express: 300,
  voiceover: 200,
  music: 400,
};

function formatTotal(amount: number) {
  return '$' + amount.toLocaleString();
}

export function Pricing() {
  const t = useTranslations('pricing');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleService = (key: string) => {
    setSelectedServices((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const total =
    selectedServices.reduce((sum, k) => sum + (SERVICE_PRICES[k] || 0), 0) +
    selectedAddons.reduce((sum, k) => sum + (ADDON_PRICES[k] || 0), 0);

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

        {/* Single Services */}
        <Reveal className="mt-20">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-lagoon-400" aria-hidden="true" />
              <span>{t('servicesSection.eyebrow')}</span>
            </p>
            <h3 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl">
              {t('servicesSection.title')}
            </h3>
            <p className="max-w-2xl text-pretty text-base font-medium leading-relaxed text-white/75 md:text-lg">
              {t('servicesSection.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 60}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/50 to-ink-900/30 p-6 transition-all hover:border-lagoon-300/30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-lagoon-300/70">
                    {t('servicesSection.items.' + key + '.name')}
                  </span>
                  <span className="font-display text-lg font-bold text-coral-300">
                    {t('servicesSection.items.' + key + '.price')}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {t('servicesSection.items.' + key + '.desc')}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {(t.raw('servicesSection.items.' + key + '.features') as string[]).map(
                    (f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-white/65">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-lagoon-400" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-auto pt-5">
                  <Link
                    href="/#contact"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:border-coral-400/50 hover:text-coral-200"
                  >
                    {t('servicesSection.cta')}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Add-ons */}
        <Reveal className="mt-20">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-lagoon-400" aria-hidden="true" />
              <span>{t('addonsSection.eyebrow')}</span>
            </p>
            <h3 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl">
              {t('addonsSection.title')}
            </h3>
            <p className="max-w-2xl text-pretty text-base font-medium leading-relaxed text-white/75 md:text-lg">
              {t('addonsSection.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADDON_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 50}>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-ink-800/40 px-5 py-3.5 transition-colors hover:border-white/20">
                <span className="text-sm font-medium text-white/85">
                  {t('addonsSection.items.' + key + '.name')}
                </span>
                <span className="text-sm font-semibold text-coral-300">
                  {t('addonsSection.items.' + key + '.price')}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Build Your Quote */}
        <Reveal className="mt-20">
          <div className="overflow-hidden rounded-3xl border border-lagoon-400/20 bg-gradient-to-br from-lagoon-500/[0.06] via-ink-900/60 to-ink-900/60 p-8 md:p-12">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">
                <span className="inline-block h-1 w-6 bg-lagoon-400" aria-hidden="true" />
                <span>{t('buildYourQuote.eyebrow')}</span>
              </p>
              <h3 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl">
                {t('buildYourQuote.title')}
              </h3>
              <p className="max-w-2xl text-pretty text-base font-medium leading-relaxed text-white/75 md:text-lg">
                {t('buildYourQuote.subtitle')}
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {/* Services */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Services
                </h4>
                <div className="mt-3 space-y-2">
                  {SERVICE_KEYS.map((key) => {
                    const selected = selectedServices.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleService(key)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all',
                          selected
                            ? 'border-coral-400/50 bg-coral-500/10 text-white'
                            : 'border-white/10 bg-ink-800/30 text-white/75 hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              'grid h-5 w-5 place-items-center rounded border text-xs font-bold',
                              selected
                                ? 'border-coral-400 bg-coral-500 text-white'
                                : 'border-white/20 text-transparent'
                            )}
                          >
                            {selected ? <Check className="h-3 w-3" /> : null}
                          </span>
                          <span>{t('servicesSection.items.' + key + '.name')}</span>
                        </div>
                        <span className="font-semibold text-coral-300">
                          {t('servicesSection.items.' + key + '.price')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Add-ons
                </h4>
                <div className="mt-3 space-y-2">
                  {ADDON_KEYS.map((key) => {
                    const selected = selectedAddons.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleAddon(key)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all',
                          selected
                            ? 'border-lagoon-400/50 bg-lagoon-500/10 text-white'
                            : 'border-white/10 bg-ink-800/30 text-white/75 hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              'grid h-5 w-5 place-items-center rounded border text-xs font-bold',
                              selected
                                ? 'border-lagoon-400 bg-lagoon-500 text-white'
                                : 'border-white/20 text-transparent'
                            )}
                          >
                            {selected ? <Plus className="h-3 w-3" /> : null}
                          </span>
                          <span>{t('addonsSection.items.' + key + '.name')}</span>
                        </div>
                        <span className="font-semibold text-lagoon-300">
                          {t('addonsSection.items.' + key + '.price')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total + CTA */}
            <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-ink-800/50 px-6 py-6 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Estimated total
                </div>
                <div className="mt-1 font-display text-3xl font-bold text-white">
                  {total > 0 ? formatTotal(total) : '—'}
                </div>
                <div className="mt-1 text-xs text-white/45">{t('buildYourQuote.note')}</div>
              </div>
              <Link
                href={
                  '/#contact' +
                  (total > 0
                    ? '?services=' +
                      encodeURIComponent(
                        [...selectedServices, ...selectedAddons].join(',')
                      ) +
                      '&total=' +
                      total
                    : '')
                }
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-all',
                  total > 0
                    ? 'bg-coral-500 text-white shadow-glow-coral hover:bg-coral-400'
                    : 'border border-white/20 bg-white/[0.04] text-white/60 hover:border-white/30 hover:text-white/80'
                )}
              >
                {total > 0 ? t('buildYourQuote.cta') + ' — ' + formatTotal(total) : t('buildYourQuote.cta')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Packages */}
        <Reveal className="mt-20">
          <h3 className="sr-only">Production packages</h3>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                      {t('items.' + key + '.name')}
                    </h3>
                    <p className="mt-2 text-base font-medium leading-relaxed text-white/80">
                      {t('items.' + key + '.desc')}
                    </p>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span
                      className={cn(
                        'font-display text-3xl font-semibold leading-none md:text-4xl',
                        featured ? 'text-coral-300' : 'text-white'
                      )}
                    >
                      {t('items.' + key + '.price')}
                    </span>
                    <span className="text-xs text-white/45">{t('perProject')}</span>
                  </div>

                  <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-white/45">
                    {t('includes')}
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {(t.raw('items.' + key + '.features') as string[]).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
                        <span
                          className={cn(
                            'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full',
                            featured
                              ? 'bg-coral-500/20 text-coral-300'
                              : 'bg-lagoon-300/15 text-lagoon-300'
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
