'use client';

import { useState } from 'react';
import { Link } from '@/routing';
import type { LiveContent, LiveCategory } from '@/lib/live-data';

interface LiveGridProps {
  content: LiveContent[];
  categories: { slug: LiveCategory; label: string; icon: string }[];
}

export function LiveGrid({ content, categories }: LiveGridProps) {
  const [activeCategory, setActiveCategory] = useState<LiveCategory | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? content
    : content.filter((c) => c.category === activeCategory);

  return (
    <div>
      <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
        All Content
      </h2>

      {/* Filter bar */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
            activeCategory === 'all'
              ? 'bg-coral-500 text-white'
              : 'border border-white/10 bg-white/5 text-white/60 hover:border-coral-400/30 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
              activeCategory === cat.slug
                ? 'bg-coral-500 text-white'
                : 'border border-white/10 bg-white/5 text-white/60 hover:border-coral-400/30 hover:text-white'
            }`}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/live/${item.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
          >
            {item.status === 'live' && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Live
              </div>
            )}
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={item.image}
                alt=""
                width={800}
                height={450}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/50">
                {item.series && <span>{item.series}</span>}
                {item.duration && <span>{item.duration}</span>}
                <span>{item.date}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                {item.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-300">
                <span>Watch</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-white/50">
          No content found for this category.
        </p>
      )}
    </div>
  );
}
