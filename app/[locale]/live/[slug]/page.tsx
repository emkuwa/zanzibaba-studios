import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLiveContent, LIVE_CONTENT, LIVE_CATEGORIES } from '@/lib/live-data';
import { siteConfig } from '@/lib/site';
import { routing } from '@/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Reveal } from '@/components/site/Reveal';
import { Link } from '@/routing';
import { Play, Eye, Calendar, Clock, ArrowRight, Film, Image as ImageIcon } from 'lucide-react';

const BASE = siteConfig.url;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const item of LIVE_CONTENT) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as any)) return {};

  const content = getLiveContent(slug);
  if (!content) return {};

  const t = await getTranslations({ locale, namespace: 'livePage' });
  const title = `${content.title} | Zanzibaba Studios`;
  const description = content.description;

  const canonicalPath = locale === 'en' ? `/live/${slug}` : `/${locale}/live/${slug}`;
  const url = `${BASE}${canonicalPath}`;

  return {
    title,
    description,
    keywords: content.tags.join(', '),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/live/${slug}`,
        sw: `${BASE}/sw/live/${slug}`,
        'x-default': `${BASE}/live/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: `${BASE}${content.image}`, width: 1200, height: 630, alt: content.title, type: 'image/jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE}${content.image}`],
    },
  };
}

export default async function LiveContentPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);

  const content = getLiveContent(slug);
  if (!content) notFound();

  const loc = locale as 'en' | 'sw';
  const t = await getTranslations({ locale, namespace: 'livePage' });

  const category = LIVE_CATEGORIES.find((c) => c.slug === content.category);
  const relatedContent = LIVE_CONTENT.filter(
    (c) => c.category === content.category && c.slug !== content.slug
  ).slice(0, 3);

  const statusColors: Record<string, string> = {
    live: 'bg-red-500 animate-pulse',
    premiere: 'bg-purple-500',
    latest: 'bg-coral-500',
    documentary: 'bg-lagoon-500',
    archive: 'bg-white/30',
  };

  const statusLabels: Record<string, string> = {
    live: 'LIVE',
    premiere: 'PREMIERE',
    latest: 'NEW',
    documentary: 'SERIES',
    archive: 'ARCHIVE',
  };

  return (
    <main>
      <Breadcrumbs
        locale={loc}
        items={[
          { label: t('home'), href: `/${loc}` },
          { label: t('title'), href: `/${loc}/live` },
          { label: content.title },
        ]}
      />

      {/* Hero Section */}
      <section className="container-z pt-10 md:pt-16">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink-900">
            <img
              src={content.image}
              alt=""
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105"
                aria-label={t('playVideo')}
              >
                <Play className="h-10 w-10 text-white fill-white" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="absolute top-6 left-6">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${statusColors[content.status]}`}>
                {statusLabels[content.status]}
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h1 className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  {category?.icon} {category?.label}
                </span>
                {content.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {content.duration}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {content.date}
                </span>
                {content.views && (
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    {content.views} {t('views')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Content Details */}
      <section className="container-z py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <Reveal>
              <p className="max-w-3xl text-pretty text-lg font-medium leading-relaxed text-white/85">
                {content.description}
              </p>

              {/* Series Info */}
              {content.series && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                    {t('seriesInfo')}
                  </h3>
                  <p className="mt-3 font-display text-xl font-semibold text-white">
                    {content.series}
                  </p>
                  {content.episodes && (
                    <p className="mt-2 text-sm text-white/60">
                      {t('episodes', { count: content.episodes })}
                    </p>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="mt-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                  {t('tags')}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Cross-Platform Connections */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                  {t('connectTitle')}
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href={`/${loc}/stock`}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:border-coral-400/40 hover:bg-coral-500/5 hover:text-coral-200"
                    >
                      <span className="flex items-center gap-2">
                        <Film className="h-4 w-4 text-coral-300" />
                        {t('licenseFootage')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-coral-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${loc}/stock`}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:border-coral-400/40 hover:bg-coral-500/5 hover:text-coral-200"
                    >
                      <span className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-coral-300" />
                        {t('browseStock')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-coral-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${loc}/#contact`}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:border-coral-400/40 hover:bg-coral-500/5 hover:text-coral-200"
                    >
                      <span className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-coral-300" />
                        {t('bookProduction')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-coral-300" />
                    </Link>
                  </li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <section className="container-z py-12 md:py-16 border-t border-white/10">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
              {t('relatedContent')}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedContent.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${loc}/live/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-colors hover:border-coral-400/40"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      width={600}
                      height={340}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span className={`inline-flex h-2 w-2 rounded-full ${statusColors[item.status]}`} />
                      {LIVE_CATEGORIES.find((c) => c.slug === item.category)?.label}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white line-clamp-2">
                      {item.title}
                    </h3>
                    {item.duration && (
                      <p className="mt-2 text-xs text-white/50">{item.duration}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </main>
  );
}
