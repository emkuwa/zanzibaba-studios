import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { getStockAsset, STOCK_ASSETS, STOCK_CATEGORIES } from '@/lib/stock-data';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CTA } from '@/components/seo/CTA';
import { Link } from '@/routing';
import { Reveal } from '@/components/site/Reveal';
import {
  Camera,
  Film,
  Plane,
  MapPin,
  Tag,
  Download,
  MessageSquare,
  ArrowRight,
  Eye,
} from 'lucide-react';

const BASE = siteConfig.url;

const TYPE_BADGE: Record<string, { label: string; icon: typeof Camera; color: string }> = {
  photo: { label: 'Photo', icon: Camera, color: 'bg-lagoon-500/20 text-lagoon-200 border-lagoon-400/30' },
  video: { label: 'Video', icon: Film, color: 'bg-coral-500/20 text-coral-200 border-coral-400/30' },
  drone: { label: 'Drone', icon: Plane, color: 'bg-amber-500/20 text-amber-200 border-amber-400/30' },
};

const LICENSE_LABEL: Record<string, string> = {
  editorial: 'Editorial Use',
  commercial: 'Commercial License',
  both: 'Editorial & Commercial',
};

const RESOLUTION_LABEL: Record<string, string> = {
  '4k': '4K Ultra HD',
  'hd': 'Full HD 1080p',
  'high-res': 'High Resolution',
};

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const asset of STOCK_ASSETS) {
      params.push({ locale, slug: asset.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as any)) return {};
  const asset = getStockAsset(slug);
  if (!asset) return {};

  const title = `${asset.title} | Zanzibaba Stock`;
  const description = `${asset.description} — ${RESOLUTION_LABEL[asset.resolution]} ${TYPE_BADGE[asset.type].label} from ${asset.location}, Zanzibar. Available for ${LICENSE_LABEL[asset.license].toLowerCase()} use.`;

  const canonicalPath = locale === 'en' ? `/stock/${slug}` : `/${locale}/stock/${slug}`;
  const url = `${BASE}${canonicalPath}`;

  return {
    title,
    description,
    keywords: asset.tags.join(', '),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/stock/${slug}`,
        sw: `${BASE}/sw/stock/${slug}`,
        'x-default': `${BASE}/stock/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: asset.image.startsWith('http') ? asset.image : `${BASE}${asset.image}`,
          width: 1200,
          height: 630,
          alt: asset.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [asset.image.startsWith('http') ? asset.image : `${BASE}${asset.image}`],
    },
  };
}

export default async function StockAssetPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);

  const asset = getStockAsset(slug);
  if (!asset) notFound();

  const loc = locale as 'en' | 'sw';
  const badge = TYPE_BADGE[asset.type];
  const BadgeIcon = badge.icon;
  const category = STOCK_CATEGORIES.find((c) => c.slug === asset.category);
  const related = STOCK_ASSETS.filter(
    (a) => a.category === asset.category && a.slug !== asset.slug,
  ).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: asset.title,
    description: asset.description,
    image: asset.image.startsWith('http') ? asset.image : `${BASE}${asset.image}`,
    brand: { '@type': 'Organization', name: siteConfig.name },
    category: category?.label ?? asset.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: { '@type': 'Organization', name: siteConfig.name },
    },
    locationCreated: {
      '@type': 'Place',
      name: `${asset.location}, Zanzibar`,
    },
  };

  return (
    <>
      <Breadcrumbs
        locale={loc}
        items={[
          { label: loc === 'sw' ? 'Mwanzo' : 'Home', href: `/${loc}` },
          { label: 'Stock', href: `/${loc}/stock` },
          { label: asset.title },
        ]}
      />

      <section className="container-z pt-10 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Asset preview (2/3) */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
                <div className="aspect-video w-full bg-ink-800">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
                {asset.type === 'video' || asset.type === 'drone' ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-colors hover:bg-black/70">
                      <Eye className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>

          {/* Right: Asset details (1/3) */}
          <div className="lg:col-span-1">
            <Reveal>
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6 md:p-8">
                {/* Type badge */}
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${badge.color}`}>
                  <BadgeIcon className="h-3 w-3" aria-hidden="true" />
                  {badge.label}
                </div>

                {/* Title */}
                <h1 className="mt-4 text-balance font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  {asset.title}
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {asset.description}
                </p>

                {/* Details grid */}
                <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  <DetailRow label={loc === 'sw' ? 'Ugumu' : 'Resolution'} value={RESOLUTION_LABEL[asset.resolution]} />
                  {asset.dimensions && (
                    <DetailRow label={loc === 'sw' ? 'Vipimo' : 'Dimensions'} value={asset.dimensions} />
                  )}
                  {asset.duration && (
                    <DetailRow label={loc === 'sw' ? 'Muda' : 'Duration'} value={asset.duration} />
                  )}
                  <DetailRow label={loc === 'sw' ? 'Leseni' : 'License'} value={LICENSE_LABEL[asset.license]} />
                  <DetailRow label={loc === 'sw' ? 'Kitengo' : 'Category'} value={category?.label ?? asset.category} />
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-coral-400" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">{loc === 'sw' ? 'Eneo' : 'Location'}</span>
                      <p className="mt-0.5 text-sm text-white/85">{asset.location}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {asset.tags.length > 0 && (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {loc === 'sw' ? 'Lebo' : 'Tags'}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-6 space-y-2.5">
                  <Link
                    href="/#contact"
                    className="btn-primary flex w-full items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {loc === 'sw' ? 'Leseni & Pakua' : 'License & Download'}
                  </Link>
                  <Link
                    href="/#contact"
                    className="btn-ghost flex w-full items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    {loc === 'sw' ? 'Omba Leseni Maalum' : 'Request Custom License'}
                  </Link>
                  <Link
                    href={`/${loc}/stock`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-white/20 hover:text-white"
                  >
                    {loc === 'sw' ? 'Vinjari Vya Ziada' : 'Browse Related Stock'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related Assets */}
      {related.length > 0 && (
        <section className="container-z py-16 md:py-24">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
              {loc === 'sw' ? 'Vya Kuhusiana' : 'Related Assets'}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${loc}/stock/${rel.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/50 to-ink-900/30 transition-all duration-300 hover:border-coral-400/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const relBadge = TYPE_BADGE[rel.type];
                        const RelIcon = relBadge.icon;
                        return (
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] ${relBadge.color}`}>
                            <RelIcon className="h-2.5 w-2.5" aria-hidden="true" />
                            {relBadge.label}
                          </span>
                        );
                      })()}
                      <span className="text-[10px] font-medium text-white/40">
                        {RESOLUTION_LABEL[rel.resolution]}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-white group-hover:text-coral-300 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/50 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Production CTA */}
      <section className="container-z pb-16 md:pb-24">
        <CTA
          title={
            loc === 'sw'
              ? 'Unahitaji picha za kipekee? Book uzalishaji wa Zanzibaba Studios.'
              : 'Need exclusive footage? Book Zanzibaba Studios production.'
          }
          sub={
            loc === 'sw'
              ? 'Tunazalisha video, picha na picha za drone kwa matukio ya kipekee. Wasiliana nasi kwa nukuu ya bure.'
              : 'We produce custom video, photography and drone content for exclusive projects. Get in touch for a free quote.'
          }
          locale={loc}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
        {label}
      </span>
      <span className="text-sm font-medium text-white/85">{value}</span>
    </div>
  );
}
