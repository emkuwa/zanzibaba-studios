import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { LIVE_CONTENT, LIVE_ORIGINALS, LIVE_CATEGORIES } from '@/lib/live-data';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { LiveGrid } from '@/components/site/LiveGrid';
import { Radio, Tv, Film, CalendarDays, MessageCircle, ArrowRight } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: 'Zanzibar Live — Live Streaming, Documentaries & Originals | Zanzibaba Studios',
    description: 'Watch live broadcasts, original documentary series and the latest films from Zanzibar. Live streaming, premieres, and exclusive Zanzibaba Originals.',
    alternates: { canonical: `${siteConfig.url}/live` },
    openGraph: {
      title: `Zanzibar Live | ${siteConfig.name}`,
      description: 'Live broadcasts, original documentaries and the latest films from Zanzibar.',
      url: `${siteConfig.url}/live`,
      siteName: siteConfig.name,
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
    },
  };
}

export default async function LivePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const liveNow = LIVE_CONTENT.filter((c) => c.status === 'live');
  const premieres = LIVE_CONTENT.filter((c) => c.status === 'premiere');
  const latest = LIVE_CONTENT.filter((c) => c.status === 'latest');
  const documentaries = LIVE_CONTENT.filter((c) => c.status === 'documentary');
  const archive = LIVE_CONTENT.filter((c) => c.status === 'archive');

  const tFeatured = await getTranslations({ locale, namespace: 'featuredProjects' });

  return (
    <main>
      <Breadcrumbs
        items={[{ href: '/', label: 'Home' }, { label: 'Live' }]}
        locale={locale as 'en' | 'sw'}
      />

      {/* Hero */}
      <section className="container-z pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>Streaming & Broadcast</span>
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Zanzibar Live
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            Live broadcasts, original documentary series and the latest films from Zanzibar. Stream premieres, explore Zanzibaba Originals, and watch exclusive content.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            <span className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-red-400" aria-hidden="true" />
              {liveNow.length} Live Now
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-coral-400" aria-hidden="true" />
              {premieres.length} Premieres
            </span>
            <span className="flex items-center gap-2">
              <Tv className="h-4 w-4 text-coral-400" aria-hidden="true" />
              {LIVE_ORIGINALS.length} Originals
            </span>
            <span className="flex items-center gap-2">
              <Film className="h-4 w-4 text-coral-400" aria-hidden="true" />
              {LIVE_CONTENT.length} Total
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="container-z pb-12 md:pb-16">
        <div className="flex flex-wrap gap-3">
          {LIVE_CATEGORIES.map((cat) => (
            <span
              key={cat.slug}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-coral-400/30 hover:text-white"
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </span>
          ))}
        </div>
      </section>

      {/* Live Now */}
      {liveNow.length > 0 && (
        <section className="container-z pb-16 md:pb-24">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
              Live Now
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveNow.map((item) => (
              <a
                key={item.id}
                href={`/live/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/30 to-ink-900/40 transition-all duration-500 hover:border-red-400/50 hover:shadow-[0_20px_60px_-15px_rgba(239,68,68,0.15)]"
              >
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </div>
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
                  <h3 className="font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-red-200">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                    {item.description}
                  </p>
                  {item.views && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                      {item.views} watching
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Premieres */}
      {premieres.length > 0 && (
        <section className="container-z pb-16 md:pb-24">
          <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
            Premieres
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {premieres.map((item) => (
              <a
                key={item.id}
                href={`/live/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              >
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
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-coral-400">
                    Premieres {item.date}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Zanzibaba Originals */}
      <section className="container-z pb-16 md:pb-24">
        <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
          Zanzibaba Originals
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_ORIGINALS.map((series) => (
            <a
              key={series.id}
              href={`/live/${series.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={series.image}
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
                  <span>{series.episodes} Episodes</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    series.status === 'ongoing'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {series.status}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
                  {series.title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                  {series.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Feature Your Project */}
      <section id="feature" className="container-z pb-16 md:pb-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-8 md:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
              <span>{tFeatured('eyebrow')}</span>
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
              {tFeatured('title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">
              {tFeatured('subtitle')}
            </p>
          </div>

          {/* Feature Examples */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
              {tFeatured('examples.title')}
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-coral-400/30"
                >
                  <h4 className="font-display text-base font-bold text-white">
                    {tFeatured(`examples.items.${i}.title`)}
                  </h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                    {tFeatured(`examples.items.${i}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
              {tFeatured('howItWorks.title')}
            </h3>
            <div className="mx-auto mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-500/20 text-sm font-bold text-coral-400">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium leading-relaxed text-white/75">
                    {tFeatured(`howItWorks.steps.${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-white/45">
            {tFeatured('distinguish')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-coral-400"
            >
              {tFeatured('cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white/80 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {tFeatured('whatsapp')}
            </a>
          </div>
        </div>
      </section>

      {/* Latest Films */}
      {latest.length > 0 && (
        <section className="container-z pb-16 md:pb-24">
          <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
            Latest Films
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => (
              <a
                key={item.id}
                href={`/live/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              >
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
                  {item.views && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                      {item.views} views
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Documentaries */}
      {documentaries.length > 0 && (
        <section className="container-z pb-16 md:pb-24">
          <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
            Documentaries
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documentaries.map((item) => (
              <a
                key={item.id}
                href={`/live/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              >
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
                    {item.episodes && <span>{item.episodes} Episodes</span>}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                    {item.description}
                  </p>
                  {item.views && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                      {item.views} views
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Project Updates */}
      <section className="container-z pb-16 md:pb-24">
        <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
          Project Updates
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_CONTENT.filter((c) => c.tags.includes('update')).map((item) => (
            <a
              key={item.id}
              href={`/live/${item.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            >
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
                  {item.duration && <span>{item.duration}</span>}
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Archive */}
      {archive.length > 0 && (
        <section className="container-z pb-16 md:pb-24">
          <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
            Archive
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((item) => (
              <a
                key={item.id}
                href={`/live/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              >
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
                  {item.views && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                      {item.views} views
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Client-side interactive grid */}
      <section className="container-z pb-20 md:pb-28">
        <LiveGrid
          content={LIVE_CONTENT}
          categories={LIVE_CATEGORIES}
        />
      </section>
    </main>
  );
}
