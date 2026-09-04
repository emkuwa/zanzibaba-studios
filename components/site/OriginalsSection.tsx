'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from '@/routing';
import { Reveal } from './Reveal';
import { LIVE_ORIGINALS } from '@/lib/live-data';

const FEATURED_SLUGS = ['building-zanzibar', 'zanzibar-from-above', 'island-stories'] as const;

const STATUS_COLORS: Record<string, string> = {
  ongoing: 'bg-coral-500/20 text-coral-200 border-coral-400/40',
  completed: 'bg-lagoon-300/15 text-lagoon-300 border-lagoon-300/30',
};

export function OriginalsSection() {
  const t = useTranslations('originalsSection');

  const originals = FEATURED_SLUGS.map(
    (slug) => LIVE_ORIGINALS.find((o) => o.slug === slug)!
  ).filter(Boolean);

  return (
    <section
      id="originals"
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="originals-title"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(900px circle at 20% 20%, rgba(255,90,20,0.08), transparent 55%), radial-gradient(900px circle at 80% 80%, rgba(34,211,238,0.06), transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="container-z relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2
            id="originals-title"
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Cinematic cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {originals.map((original, i) => (
            <Reveal key={original.id} delay={i * 100}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 transition-all duration-500 hover:border-white/20 hover:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.6)]">
                {/* Background image — full card */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={original.image}
                    alt={original.title}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  {/* Gradient overlay — cinematic bottom fade */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent"
                    aria-hidden="true"
                  />
                  {/* Subtle side vignette */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-ink-950/30 via-transparent to-ink-950/20"
                    aria-hidden="true"
                  />

                  {/* Status badge — top left */}
                  <div className="absolute left-4 top-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md ${STATUS_COLORS[original.status] || STATUS_COLORS.ongoing}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${original.status === 'ongoing' ? 'bg-coral-400 animate-pulse' : 'bg-lagoon-300'}`}
                        aria-hidden="true"
                      />
                      {original.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>

                  {/* Play button overlay — center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content — bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 p-6 pt-20">
                    <h3 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                      {original.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-white/80">
                      {original.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      {/* Episode count badge */}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                        {t('episodes', { count: original.episodes })}
                      </span>

                      {/* Watch Now button */}
                      <Link
                        href={`/live/originals/${original.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-glow-coral transition-all hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                      >
                        {t('watchNow')}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* View All Originals link */}
        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <Link
              href="/live/originals"
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {t('viewAll')}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
