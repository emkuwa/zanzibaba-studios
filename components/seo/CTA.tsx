import { Reveal } from '@/components/site/Reveal';
import { Link } from '@/routing';
import { ArrowRight, Check } from 'lucide-react';

export function CTA({ title, sub, locale }: { title: string; sub: string; locale: 'en' | 'sw' }) {
  return (
    <section className="py-16 md:py-20">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl border border-coral-400/30 bg-gradient-to-br from-coral-500/[0.10] via-ink-900/80 to-ink-900/80 p-8 md:p-12">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-lagoon-500/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-coral-400/40 bg-coral-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-coral-200">
              <Check className="h-3 w-3" aria-hidden="true" />
              {locale === 'sw' ? 'Tayari kuanza' : 'Ready to start'}
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              {sub}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/#contact" className="btn-primary group">
                {locale === 'sw' ? 'Omba nukuu' : 'Request a quote'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href={`https://wa.me/255716002790`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {locale === 'sw' ? 'WhatsApp' : 'WhatsApp us'}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
