'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type FAQ = { q: string; a: string };

export function FAQBlock({ items, title }: { items: FAQ[]; title: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-16">
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-white/5 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 px-2 md:px-4">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-5 text-left text-sm font-medium text-white transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:bg-white/[0.04] md:text-base"
              >
                <span className="text-balance">{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-coral-300 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
              {isOpen && (
                <div id={`faq-${i}`} className="px-4 pb-5 pr-12">
                  <p className="text-pretty text-sm leading-relaxed text-white/70 md:text-base">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
