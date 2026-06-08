'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Pause, ExternalLink, Film } from 'lucide-react';
import { Reveal } from './Reveal';
import { VideoBackground } from './VideoBackground';

const REEL_VIDEO =
  'https://videos.pexels.com/video-files/2519660/2519660-uhd_2560_1440_30fps.mp4';
const REEL_POSTER = '/images/hero-zanzibar-coastline.jpg';

export function Showreel() {
  const t = useTranslations('showreel');
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  return (
    <section
      className="relative isolate overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="showreel-title"
    >
      <div className="container-z">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-ink-900 sm:rounded-[28px]">
          <VideoBackground src={REEL_VIDEO} poster={REEL_POSTER} overlay="gradient" autoPlay={false} />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden="true" />

          {/* Hidden controllable video for play/pause */}
          <video
            ref={videoRef}
            className="hidden"
            src={REEL_VIDEO}
            poster={REEL_POSTER}
            playsInline
            controls={false}
            preload="none"
            aria-hidden="true"
          />

          <div className="relative grid min-h-[480px] place-items-center p-8 text-center sm:min-h-[560px] md:min-h-[640px] md:p-16">
            <Reveal className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-coral-400/40 bg-coral-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-200">
                <Film className="h-3 w-3" aria-hidden="true" />
                {t('eyebrow')}
              </div>

              <h2
                id="showreel-title"
                className="mt-6 max-w-2xl text-balance font-display text-5xl font-bold leading-[1] tracking-tight text-white sm:text-6xl md:text-7xl"
              >
                {t('title')}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                {t('subtitle')}
              </p>

              <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? t('pause') : t('play')}
                  className="group relative grid h-20 w-20 place-items-center rounded-full bg-coral-500 text-white shadow-glow-coral transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 active:scale-95 md:h-24 md:w-24"
                >
                  <span
                    className="absolute inset-0 -z-10 animate-ping rounded-full bg-coral-500/40 opacity-60"
                    aria-hidden="true"
                  />
                  {playing ? (
                    <Pause className="h-7 w-7 fill-current md:h-8 md:w-8" aria-hidden="true" />
                  ) : (
                    <Play
                      className="h-7 w-7 fill-current md:h-8 md:w-8"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <div className="flex flex-col items-start text-left">
                  <span className="font-display text-xl font-bold text-white">
                    {playing ? t('pause') : t('play')}
                  </span>
                  <span className="text-sm font-medium text-white/75">
                    {t('duration')} · 4K · Dolby Audio
                  </span>
                </div>
              </div>

              <a
                href="https://vimeo.com/zanzibabastudios"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.28em] text-white/75 transition-colors hover:text-white"
              >
                {t('viewFull')}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
