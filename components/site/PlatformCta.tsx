'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/routing';
import { Reveal } from './Reveal';

const CTA_BG = '/images/zanzibar-live-broadcast.jpg';

export function PlatformCta() {
  const t = useTranslations('platformCta');
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36 md:py-44 lg:py-52">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${CTA_BG})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950/90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,6,8,0.75)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden="true" />

      <div className="relative z-10 container-z flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow mb-6">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>

          <h2 className="font-display text-5xl font-bold leading-[0.98] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px]">
            {t('title')}
          </h2>

          <p className="mt-8 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/80 md:mt-10 md:text-xl lg:text-2xl">
            {t('subtitle')}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:mt-14 md:mt-16">
            <Link href="/stock" className="btn-ghost group">
              {t('browseStock')}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link href="/live" className="btn-primary group">
              {t('watchLive')}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link href="/#contact" className="btn-outline-coral group">
              {t('bookProduction')}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-16 md:mt-20">
          <div className="hairline" />
        </Reveal>
      </div>
    </section>
  );
}
