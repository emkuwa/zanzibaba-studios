'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import Link from 'next/link';

const SERVICE_SLUGS: Record<string, string> = {
  tourismVideo: 'video-production',
  hotelPhoto: 'photography',
  drone: 'aerial-drone',
  villa: 'video-production',
  documentary: 'video-production',
  campaign: 'commercial',
  social: 'social-content',
  events: 'events',
  live: 'live-streaming',
  commercial: 'commercial',
};

const LABELS: Record<string, string> = {
  tourismVideo: 'Tourism',
  hotelPhoto: 'Photography',
  drone: 'Drone',
  villa: 'Resort',
  documentary: 'Documentary',
  campaign: 'Campaign',
  social: 'Social',
  events: 'Event',
  live: 'Live',
  commercial: 'Commercial',
};

const KEYS = [
  'tourismVideo',
  'hotelPhoto',
  'drone',
  'villa',
  'documentary',
  'campaign',
  'social',
  'events',
  'live',
  'commercial',
] as const;

// Service → image (local, optimized, lazy-loaded)
const SERVICE_IMAGES: Record<string, string> = {
  tourismVideo: '/images/media-crew-production.jpg',
  hotelPhoto: '/images/hotel-content-creation.jpg',
  drone: '/images/drone-zanzibar-aerial.jpg',
  villa: '/images/luxury-villa-zanzibar.jpg',
  documentary: '/images/about-zanzibaba-studios.jpg',
  campaign: '/images/tourism-lifestyle-zanzibar.jpg',
  social: '/images/zanzibar-beach-couple.jpg',
  events: '/images/event-production-zanzibar.jpg',
  live: '/images/zanzibar-live-broadcast.jpg',
  commercial: '/images/luxury-resort-zanzibar.jpg',
};

export function Services() {
  const t = useTranslations('services');
  return (
    <section id="services" className="relative py-20 sm:py-24 md:py-32">
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {KEYS.map((k, i) => {
            const paddedIndex = String(i + 1).padStart(2, '0');
            const img = SERVICE_IMAGES[k];
            return (
              <Reveal key={k} delay={i * 60} className="group">
                <Link
                  href={`/services/${SERVICE_SLUGS[k] || 'video-production'}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                <div className="card-tilt relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                  <div
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-coral-500/0 blur-2xl transition-all duration-500 group-hover:bg-coral-500/20"
                    aria-hidden="true"
                  />
                  {/* Service image — larger, brighter */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={img}
                      alt={t(`items.${k}.imgAlt`)}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Lighter gradient — images visible, text readable */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/10 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-300 backdrop-blur-md">
                      {LABELS[k]}
                    </div>
                    <div className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.32em] font-medium text-lagoon-300/90">
                      {t('counter', { index: paddedIndex })}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative flex flex-col p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-white">
                      {t(`items.${k}.title`)}
                    </h3>
                    <p className="mt-2 text-base font-medium leading-relaxed text-white/80">
                      {t(`items.${k}.desc`)}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] font-medium text-white/60">
                      <span>{t('learnMore')}</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-white/60 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
