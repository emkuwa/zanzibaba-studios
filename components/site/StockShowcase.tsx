'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { ArrowRight, Search, Camera, Video, Plane } from 'lucide-react';
import { STOCK_ASSETS, STOCK_CATEGORIES } from '@/lib/stock-data';
import { Reveal } from './Reveal';

const TYPE_FILTERS = [
  { key: 'all', icon: null },
  { key: 'photo', icon: Camera },
  { key: 'video', icon: Video },
  { key: 'drone', icon: Plane },
] as const;

type FilterType = 'all' | 'photo' | 'video' | 'drone';

export function StockShowcase() {
  const t = useTranslations('stockPage');
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const featuredAssets = STOCK_ASSETS.filter((a) => a.featured).slice(0, 6);

  const filteredAssets = featuredAssets.filter((asset) => {
    const matchesFilter = activeFilter === 'all' || asset.type === activeFilter;
    const matchesQuery =
      query === '' ||
      asset.title.toLowerCase().includes(query.toLowerCase()) ||
      asset.location.toLowerCase().includes(query.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  const displayAssets = query ? filteredAssets : featuredAssets;

  return (
    <section
      id="stock"
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
      aria-labelledby="stock-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(800px circle at 20% 20%, rgba(255,90,20,0.08), transparent 60%), radial-gradient(800px circle at 80% 80%, rgba(34,211,238,0.06), transparent 60%)',
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
            id="stock-title"
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Search & Filter Bar */}
        <Reveal delay={100} className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white placeholder-white/40 backdrop-blur-md transition-colors focus:border-coral-400/50 focus:outline-none focus:ring-1 focus:ring-coral-400/30"
              />
            </div>
            <div className="flex gap-2">
              {TYPE_FILTERS.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                    activeFilter === key
                      ? 'border-coral-400/50 bg-coral-500/20 text-coral-200'
                      : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {t(`filters.${key}`)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Stock Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(query ? filteredAssets : featuredAssets).map((asset, i) => (
            <Reveal key={asset.id} delay={i * 60}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 backdrop-blur-md transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-coral-500/0 blur-2xl transition-all duration-500 group-hover:bg-coral-500/15" aria-hidden="true" />

                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" aria-hidden="true" />

                  {/* Type Badge */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-coral-400/40 bg-coral-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-coral-200 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral-400" aria-hidden="true" />
                    {t(`assetType.${asset.type}`)}
                  </div>

                  {/* Resolution badge */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-lagoon-300 backdrop-blur-md">
                    {asset.resolution}
                  </div>
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-white md:text-lg">
                    {asset.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {asset.location}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-[11px] font-medium capitalize text-white/50">
                      {t(`licenseType.${asset.license}`)}
                    </span>
                    {asset.duration && (
                      <>
                        <span className="text-white/20">·</span>
                        <span className="text-[11px] font-medium text-white/50">{asset.duration}</span>
                      </>
                    )}
                  </div>

                  <div className="mt-auto pt-4">
                    <Link
                      href="/stock"
                      className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl border border-coral-400/30 bg-coral-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral-300 transition-all hover:border-coral-400/50 hover:bg-coral-500/20 hover:text-coral-200"
                    >
                      {t('licenseButton')}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Categories */}
        <Reveal delay={200} className="mt-12">
          <div className="flex flex-wrap justify-center gap-2">
            {STOCK_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href="/stock"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/60 transition-all hover:border-coral-400/30 hover:bg-coral-500/10 hover:text-coral-200"
              >
                {cat.label}
                <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-white/40">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={300} className="mt-10 text-center">
          <Link
            href="/stock"
            className="group/cta inline-flex items-center gap-3 rounded-2xl border border-coral-400/40 bg-coral-500/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-coral-200 backdrop-blur-md transition-all hover:border-coral-400/60 hover:bg-coral-500/25 hover:text-coral-100 hover:shadow-[0_0_40px_-10px_rgba(255,90,20,0.3)]"
          >
            {t('browseLibrary')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
