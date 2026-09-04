'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from '@/routing';
import { useEffect, useState } from 'react';

const HERO_BG = '/images/hero-zanzibar-coastline.jpg';

export function Hero() {
  const t = useTranslations('hero');
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Africa/Dar_es_Salaam',
      };
      try {
        setTime(d.toLocaleTimeString('en-GB', opts));
      } catch {
        setTime(d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[max(704px,calc(100dvh+var(--navbar-height)))] w-full flex-col overflow-hidden pt-[var(--navbar-height)] md:min-h-[max(800px,calc(100dvh+var(--navbar-height)))] md:pt-[var(--navbar-height)]"
      aria-label="Zanzibar Visual Media Platform"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950/20 via-transparent to-ink-950/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.30)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-20 md:pt-28">
        <div className="container-z flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/70 font-medium">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-coral-500"
              aria-hidden="true"
            />
            Zanzibar • Visual Media • Platform
          </div>
          <div className="hidden sm:block">
            {time} EAT • {t('location')}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1">
        <div className="container-z flex w-full flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-5xl rounded-2xl bg-ink-950/20 p-6 backdrop-blur-sm md:p-8">
            <h1 className="hero-heading max-w-xs text-balance font-display text-[36px] font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] sm:max-w-sm sm:text-5xl md:max-w-3xl md:text-7xl lg:max-w-5xl lg:text-[88px] lg:leading-[1.05]">
              {t('title')}
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] sm:mt-10 sm:text-xl md:mt-12 md:text-2xl">
              {t('subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/live" className="btn-primary group">
                  Watch Zanzibar Live
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link href="/stock" className="btn-primary group">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  Explore Stock
                </Link>
                <Link href="/shoots" className="btn-primary group">
                  Book a Shoot
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/monthly-content" className="btn-ghost group text-sm">
                  Monthly Content
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link href="/#contact" className="btn-ghost group text-sm">
                  Book a Production
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <a
          href="#logos"
          className="group inline-flex flex-col items-center gap-2 rounded-md text-[11px] uppercase tracking-[0.32em] font-medium text-white/75 transition-colors hover:text-white"
        >
          <span>{t('scroll')}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>

      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.32em] font-medium text-white/60 lg:flex">
        <span className="rotate-90 [writing-mode:vertical-rl]">{t('reel')}</span>
        <span
          className="inline-block h-12 w-px bg-gradient-to-b from-white/40 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
