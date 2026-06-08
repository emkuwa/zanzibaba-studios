'use client';

import { useTranslations } from 'next-intl';
import { Quote, Star } from 'lucide-react';
import { Reveal } from './Reveal';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = ['t1', 't2', 't3'] as const;

  return (
    <section className="relative py-20 sm:py-24 md:py-32" aria-labelledby="testimonials-title">
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2
            id="testimonials-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((k, i) => (
            <Reveal key={k} delay={i * 100}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-7 transition-colors hover:border-lagoon-300/30">
                <Quote className="h-7 w-7 text-coral-400" aria-hidden="true" />
                <div className="mt-3 flex items-center gap-1 text-coral-300" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-pretty text-base leading-relaxed text-white/85">
                  <p>“{t(`items.${k}.quote`)}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-coral-500 to-lagoon-500 text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {t(`items.${k}.name`).charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {t(`items.${k}.name`)}
                    </div>
                    <div className="text-xs text-white/55">{t(`items.${k}.role`)}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
