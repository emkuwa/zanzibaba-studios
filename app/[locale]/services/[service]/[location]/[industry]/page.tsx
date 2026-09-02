import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import {
  COMBINATIONS,
  SERVICES,
  LOCATIONS,
  INDUSTRIES,
  getService,
  getLocation,
  getIndustry,
} from '@/lib/seo-data';
import { tSeo } from '@/lib/seo-translations';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedPages, type RelatedPage } from '@/components/seo/RelatedPages';
import { CTA } from '@/components/seo/CTA';
import { SEOContentPage } from '@/components/seo/SEOContentPage';

const BASE = siteConfig.url;

export function generateStaticParams() {
  const params: Array<{ locale: string; service: string; location: string; industry: string }> = [];
  for (const locale of routing.locales) {
    for (const s of SERVICES) {
      for (const l of LOCATIONS) {
        for (const i of INDUSTRIES) {
          params.push({
            locale,
            service: s.slug,
            location: l.slug,
            industry: i.slug,
          });
        }
      }
    }
  }
  return params;
}

type RouteParams = { locale: string; service: string; location: string; industry: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, service: sSlug, location: lSlug, industry: iSlug } = await params;
  if (!routing.locales.includes(locale as any)) return {};
  const s = getService(sSlug);
  const l = getLocation(lSlug);
  const i = getIndustry(iSlug);
  if (!s || !l || !i) return {};

  const serviceName = tSeo(locale as 'en' | 'sw', s.nameKey as any);
  const locationName = tSeo(locale as 'en' | 'sw', l.nameKey as any);
  const industryName = tSeo(locale as 'en' | 'sw', i.nameKey as any);

  const title = `${serviceName} in ${locationName} for ${industryName} | Zanzibaba Studios`;
  const description = locale === 'sw'
    ? `${serviceName} kwa ${industryName} katika ${locationName}. Kikosi cha hapa, ubora wa kimataifa, muda mfupi wa kukamilisha. Nukuu ya bure ndani ya saa 24.`
    : `Cinema-grade ${serviceName.toLowerCase()} for ${industryName.toLowerCase()} in ${locationName}. Local crew, international quality, fast turnaround. Free quote within 24 hours.`;

  const canonicalPath = locale === 'en' ? `/services/${s.slug}/${l.slug}/${i.slug}` : `/${locale}/services/${s.slug}/${l.slug}/${i.slug}`;
  const url = `${BASE}${canonicalPath}`;

  const altEn = {
    en: `${serviceName} in ${locationName} for ${industryName}`,
    sw: `${serviceName} katika ${locationName} kwa ${industryName}`,
  };

  return {
    title,
    description,
    keywords: [...s.keywords, locationName, industryName, 'zanzibar'].join(', '),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/services/${s.slug}/${l.slug}/${i.slug}`,
        sw: `${BASE}/sw/services/${s.slug}/${l.slug}/${i.slug}`,
        'x-default': `${BASE}/services/${s.slug}/${l.slug}/${i.slug}`,
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
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: altEn[locale as 'en' | 'sw'],
          type: siteConfig.ogImageType,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function SEOPage({ params }: { params: Promise<RouteParams> }) {
  const { locale, service: sSlug, location: lSlug, industry: iSlug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);

  const s = getService(sSlug);
  const l = getLocation(lSlug);
  const i = getIndustry(iSlug);
  if (!s || !l || !i) notFound();

  const loc = locale as 'en' | 'sw';

  // Build content for the page
  const service = {
    slug: s.slug,
    name: tSeo(loc, s.nameKey as any),
    short: tSeo(loc, s.shortKey as any),
    desc: tSeo(loc, s.descKey as any),
    keywords: s.keywords,
  };
  const location = {
    slug: l.slug,
    name: tSeo(loc, l.nameKey as any),
    region: tSeo(loc, l.regionKey as any),
    desc: tSeo(loc, l.descKey as any),
    lat: l.lat,
    lng: l.lng,
  };
  const industry = {
    slug: i.slug,
    name: tSeo(loc, i.nameKey as any),
    desc: tSeo(loc, i.descKey as any),
    pain: tSeo(loc, i.painKey as any),
    goal: tSeo(loc, i.goalKey as any),
  };

  const faqs = [
    { q: tSeo(loc, 'faqQ1', { service: service.name, location: location.name }), a: tSeo(loc, 'faqA1', { service: service.name, location: location.name }) },
    { q: tSeo(loc, 'faqQ2', {}), a: tSeo(loc, 'faqA2', {}) },
    { q: tSeo(loc, 'faqQ3', {}), a: tSeo(loc, 'faqA3', {}) },
    { q: tSeo(loc, 'faqQ4', { location: location.name }), a: tSeo(loc, 'faqA4', { location: location.name }) },
    { q: tSeo(loc, 'faqQ5', {}), a: tSeo(loc, 'faqA5', {}) },
  ];

  // Build related pages (same service, other locations)
  const related: RelatedPage[] = LOCATIONS
    .filter((x) => x.slug !== l.slug)
    .slice(0, 6)
    .map((x) => ({
      title: `${service.name} in ${tSeo(loc, x.nameKey as any)}`,
      href: `/${loc}/services/${s.slug}/${x.slug}/${i.slug}`,
      desc: `${service.short} for ${industry.name} in ${tSeo(loc, x.nameKey as any)}.`,
    }));

  // JSON-LD: Service
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.desc,
    provider: { '@id': `${BASE}#organization` },
    areaServed: { '@type': 'Place', name: `${location.name}, Zanzibar, Tanzania` },
    serviceType: service.name,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: 1200,
      highPrice: 12000,
      offerCount: 5,
    },
  };

  // JSON-LD: FAQ
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Breadcrumbs
        locale={loc}
        items={[
          { label: tSeo(loc, 'home' as any), href: `/${loc}` },
          { label: tSeo(loc, 'services' as any), href: `/${loc}#services` },
          { label: service.name, href: `/${loc}/services/${s.slug}` },
          { label: location.name, href: `/${loc}/services/${s.slug}/${l.slug}` },
          { label: industry.name },
        ]}
      />

      <SEOContentPage
        content={{
          locale: loc,
          service,
          location,
          industry,
          faqs,
        }}
      />

      <section className="container-z">
        <RelatedPages items={related} title={tSeo(loc, 'related' as any)} />
      </section>

      <section className="container-z">
        <CTA title={tSeo(loc, 'cta' as any)} sub={tSeo(loc, 'ctaSub' as any)} locale={loc} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
