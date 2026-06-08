import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type RelatedPage = {
  title: string;
  href: string;
  desc?: string;
};

export function RelatedPages({ items, title }: { items: RelatedPage[]; title: string }) {
  return (
    <section className="py-12 md:py-16">
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-5 transition-colors hover:border-coral-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
          >
            <div>
              <h3 className="font-display text-lg font-semibold leading-snug text-white">
                {p.title}
              </h3>
              {p.desc && (
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
              )}
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-coral-300 transition-transform group-hover:translate-x-0.5">
              Explore
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
