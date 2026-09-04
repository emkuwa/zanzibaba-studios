'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { Search, Camera, Video, Plane, MapPin, Clock, Download, Eye } from 'lucide-react';
import { type StockAsset, STOCK_CATEGORIES } from '@/lib/stock-data';
import { Reveal } from './Reveal';

const TYPE_FILTERS = [
  { key: 'all', icon: null },
  { key: 'photo', icon: Camera },
  { key: 'video', icon: Video },
  { key: 'drone', icon: Plane },
] as const;

type FilterType = 'all' | 'photo' | 'video' | 'drone';

const TYPE_BADGE: Record<string, { bg: string; text: string; dot: string }> = {
  photo: {
    bg: 'bg-coral-500/20',
    text: 'text-coral-200',
    dot: 'bg-coral-400',
  },
  video: {
    bg: 'bg-lagoon-300/20',
    text: 'text-lagoon-300',
    dot: 'bg-lagoon-300',
  },
  drone: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-200',
    dot: 'bg-amber-400',
  },
};

interface StockGridProps {
  assets: StockAsset[];
}

export function StockGrid({ assets }: StockGridProps) {
  const t = useTranslations('stockPage');
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<FilterType>('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredAssets = useMemo(() => {
    const q = query.toLowerCase().trim();

    return assets.filter((asset) => {
      const matchesType = activeType === 'all' || asset.type === activeType;
      const matchesCategory = !activeCategory || asset.category === activeCategory;

      let matchesQuery = true;
      if (q) {
        matchesQuery =
          asset.title.toLowerCase().includes(q) ||
          asset.description.toLowerCase().includes(q) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          asset.location.toLowerCase().includes(q);
      }

      return matchesType && matchesCategory && matchesQuery;
    });
  }, [assets, query, activeType, activeCategory]);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(800px circle at 20% 20%, rgba(255,90,20,0.08), transparent 60%), radial-gradient(800px circle at 80% 80%, rgba(34,211,238,0.06), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container-z relative">
        {/* Search & Type Filters */}
        <Reveal>
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
                  onClick={() => setActiveType(key)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                    activeType === key
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

        {/* Category Pills */}
        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === null
                  ? 'border-coral-400/50 bg-coral-500/20 text-coral-200'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70'
              }`}
            >
              {t('filters.all')}
            </button>
            {STOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === cat.slug
                    ? 'border-coral-400/50 bg-coral-500/20 text-coral-200'
                    : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
              >
                {cat.label}
                <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-white/40">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Result Count */}
        <Reveal delay={120}>
          <p className="mt-8 text-sm font-medium text-white/50">
            {t('resultsCount', { count: filteredAssets.length })}
          </p>
        </Reveal>

        {/* Grid */}
        {filteredAssets.length === 0 ? (
          <Reveal delay={160}>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="mb-4 h-10 w-10 text-white/20" />
              <h3 className="text-lg font-semibold text-white/70">{t('noResults')}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/40">{t('noResultsHint')}</p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssets.map((asset, i) => (
              <Reveal key={asset.id} delay={i * 50}>
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
                    <div
                      className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-current/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md ${
                        TYPE_BADGE[asset.type]?.bg
                      } ${TYPE_BADGE[asset.type]?.text}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${TYPE_BADGE[asset.type]?.dot}`}
                        aria-hidden="true"
                      />
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
                        <MapPin className="h-3 w-3" />
                        {asset.location}
                      </span>
                      {asset.duration && (
                        <>
                          <span className="text-white/20">·</span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50">
                            <Clock className="h-3 w-3" />
                            {asset.duration}
                          </span>
                        </>
                      )}
                      <span className="text-white/20">·</span>
                      <span className="text-[11px] font-medium capitalize text-white/50">
                        {t(`licenseType.${asset.license}`)}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-white/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 flex items-center gap-2">
                      <Link
                        href={`/stock/${asset.slug}`}
                        className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-coral-400/30 bg-coral-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral-300 transition-all hover:border-coral-400/50 hover:bg-coral-500/20 hover:text-coral-200"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {t('licenseButton')}
                      </Link>
                      <Link
                        href={`/stock/${asset.slug}`}
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white/50 transition-all hover:border-white/20 hover:text-white/80"
                        aria-label={t('previewLabel')}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
