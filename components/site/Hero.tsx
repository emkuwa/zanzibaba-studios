'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Volume2, ChevronDown, Star } from 'lucide-react';
import { Link } from '@/routing';
import { VideoBackground } from './VideoBackground';
import { useEffect, useState } from 'react';

const HERO_VIDEO =
  'https://videos.pexels.com/video-files/2519660/2519660-uhd_2560_1440_30fps.mp4';
const HERO_POSTER = '/images/hero-zanzibar-coastline.jpg';

export function Hero() {
  const t = useTranslations('hero');
  const tBr = useTranslations('brand');
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
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden md:min-h-[720px]"
      aria-label={t('eyebrow')}
    >
      <VideoBackground src={HERO_VIDEO} poster={HERO_POSTER} />

      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]"
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
            {tBr('tagline')}
          </div>
          <div className="hidden sm:block">
            {time} EAT • {t('location')}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full">
        <div className="container-z flex w-full flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-5xl">
            <div className="eyebrow mb-6 inline-flex rounded-full border border-lagoon-300/30 bg-lagoon-300/[0.06] px-4 py-1.5 backdrop-blur">
              <Star className="h-3 w-3 text-lagoon-300" aria-hidden="true" />
              <span>{t('eyebrow')}</span>
            </div>

            <h1 className="hero-heading text-balance text-[42px] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              {t('title')}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/90 sm:text-xl md:text-2xl">
              {t('subtitle')}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/#contact" className="btn-primary group">
                {t('ctaPrimary')}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/#portfolio" className="btn-ghost group">
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((k) => (
              <div key={k} className="glass rounded-2xl px-5 py-4">
                <div className="font-display text-3xl font-bold text-white md:text-4xl">
                  {t(`${k}.value`)}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.28em] font-medium text-white/70">
                  {t(`${k}.label`)}
                </div>
              </div>
            ))}
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
        <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
    </section>
  );
}
