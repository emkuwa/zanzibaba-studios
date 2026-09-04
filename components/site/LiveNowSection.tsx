'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Calendar } from 'lucide-react';
import { Link } from '@/routing';
import { Reveal } from './Reveal';
import { LIVE_CONTENT, LIVE_ORIGINALS } from '@/lib/live-data';

export function LiveNowSection() {
  const tPlatform = useTranslations('livePlatform');
  const tOriginals = useTranslations('originalsSection');

  const featuredLive = LIVE_CONTENT.filter((c) => c.status === 'live' && c.featured)[0];
  const upcomingPremieres = LIVE_CONTENT.filter((c) => c.status === 'premiere').slice(0, 3);
  const featuredOriginals = LIVE_ORIGINALS.filter((o) => o.featured).slice(0, 3);

  return (
    <section id="live-now" className="relative py-20 sm:py-24 md:py-32">
      <div className="container-z">
        {/* LIVE NOW Badge */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400">
              LIVE NOW
            </span>
          </div>
        </Reveal>

        {/* Section Header */}
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {tPlatform('title')}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/80 md:text-xl">
            {tPlatform('subtitle')}
          </p>
        </Reveal>

        {/* Featured Live Stream Card */}
        {featuredLive && (
          <Reveal delay={160}>
            <Link
              href={`/live/${featuredLive.slug}`}
              className="group relative mt-12 block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_30px_80px_-20px_rgba(255,90,20,0.15)]"
            >
              {/* Background Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
                <img
                  src={featuredLive.image}
                  alt={featuredLive.title}
                  loading="eager"
                  decoding="async"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" aria-hidden="true" />

                {/* Live Badge */}
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-300 backdrop-blur-md sm:left-8 sm:top-8">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  Live
                </div>

                {/* Views */}
                {featuredLive.views && (
                  <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md sm:right-8 sm:top-8">
                    {featuredLive.views} watching
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                  <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-coral-300/90">
                    {tPlatform('eyebrow')}
                  </div>
                  <h3 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {featuredLive.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-pretty text-base text-white/75 md:text-lg">
                    {featuredLive.description}
                  </p>

                  {/* Watch Now Button */}
                  <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-coral-500 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-glow-coral transition-all duration-300 group-hover:bg-coral-400">
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    {tPlatform('cta')}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Upcoming Premieres Row */}
        {upcomingPremieres.length > 0 && (
          <Reveal delay={240}>
            <div className="mt-16">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-lagoon-300/90">
                  Upcoming Premieres
                </h3>
                <Link
                  href="/live"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-coral-300 transition-colors hover:text-coral-200"
                >
                  {tPlatform('viewAll')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingPremieres.map((item, i) => (
                  <Reveal key={item.id} delay={300 + i * 80}>
                    <Link
                      href={`/live/${item.slug}`}
                      className="group relative flex overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/50 to-ink-900/30 transition-all duration-500 hover:border-coral-400/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-950/60" aria-hidden="true" />
                        {/* Premiere Badge */}
                        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-coral-400/40 bg-coral-500/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-coral-200 backdrop-blur-md">
                          Premiere
                        </div>
                      </div>

                      {/* Info */}
                      <div className="relative flex flex-1 flex-col justify-center p-4 sm:p-5">
                        <div className="flex items-center gap-2 text-[11px] text-white/50">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <h4 className="mt-2 text-sm font-bold leading-snug text-white line-clamp-2 sm:text-base">
                          {item.title}
                        </h4>
                        {item.duration && (
                          <div className="mt-2 text-[11px] font-medium text-white/50">
                            {item.duration}
                          </div>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Zanzibaba Originals Section */}
        {featuredOriginals.length > 0 && (
          <Reveal delay={400}>
            <div className="mt-20">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-300/90">
                  <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
                  <span className="ml-3">{tOriginals('eyebrow')}</span>
                </p>
                <h3 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                  {tOriginals('title')}
                </h3>
                <p className="mt-4 max-w-2xl text-pretty text-base font-medium leading-relaxed text-white/80 md:text-lg">
                  {tOriginals('subtitle')}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredOriginals.map((original, i) => (
                  <Reveal key={original.id} delay={480 + i * 100}>
                    <Link
                      href={`/live/originals/${original.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-lagoon-300/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={original.image}
                          alt={original.title}
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" aria-hidden="true" />

                        {/* Status Badge */}
                        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-lagoon-300 backdrop-blur-md">
                          {original.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </div>

                        {/* Episodes */}
                        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[10px] font-medium text-white/70 backdrop-blur-md">
                          {tOriginals('episodes', { count: original.episodes })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                        <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-lagoon-300/80">
                          {original.category}
                        </div>
                        <h4 className="mt-2 font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                          {original.title}
                        </h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65 line-clamp-2">
                          {original.description}
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral-300 transition-colors group-hover:text-coral-200">
                          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                          {tOriginals('watchNow')}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {/* View All Originals */}
              <Reveal delay={600}>
                <div className="mt-10 flex justify-center">
                  <Link
                    href="/live/originals"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-white/90 transition-all duration-300 hover:border-coral-400/40 hover:bg-coral-500/10 hover:text-white"
                  >
                    {tOriginals('viewAll')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
