import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import {
  SERVICES,
  LOCATIONS,
  INDUSTRIES,
  getService,
} from '@/lib/seo-data';
import { tSeo } from '@/lib/seo-translations';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedPages, type RelatedPage } from '@/components/seo/RelatedPages';
import { CTA } from '@/components/seo/CTA';
import { Link } from '@/routing';
import { Reveal } from '@/components/site/Reveal';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';

const BASE = siteConfig.url;

export function generateStaticParams() {
  const params: Array<{ locale: string; service: string }> = [];
  for (const locale of routing.locales) {
    for (const s of SERVICES) {
      params.push({ locale, service: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service: sSlug } = await params;
  if (!routing.locales.includes(locale as any)) return {};
  const s = getService(sSlug);
  if (!s) return {};

  const serviceName = tSeo(locale as 'en' | 'sw', s.nameKey as any);
  const title = `${serviceName} across Zanzibar | Zanzibaba Studios`;
  const description = locale === 'sw'
    ? `${serviceName} katika Zanzibar — kwa hoteli, kituo cha starehe, villa, na waendeshaji wa ziara. Nukuu ya bure ndani ya saa 24.`
    : `${serviceName} across Zanzibar — for hotels, resorts, villas, and tour operators. Free quote within 24 hours.`;

  const canonicalPath = locale === 'en' ? `/services/${s.slug}` : `/${locale}/services/${s.slug}`;
  const url = `${BASE}${canonicalPath}`;

  return {
    title,
    description,
    keywords: s.keywords.join(', '),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/services/${s.slug}`,
        sw: `${BASE}/sw/services/${s.slug}`,
        'x-default': `${BASE}/services/${s.slug}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title, type: siteConfig.ogImageType }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ServiceHubPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service: sSlug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);

  const s = getService(sSlug);
  if (!s) notFound();
  const loc = locale as 'en' | 'sw';

  const serviceName = tSeo(loc, s.nameKey as any);
  const serviceShort = tSeo(loc, s.shortKey as any);
  const serviceDesc = tSeo(loc, s.descKey as any);

  // JSON-LD: ItemList of all locations × industries
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${serviceName} across Zanzibar`,
    numberOfItems: LOCATIONS.length * INDUSTRIES.length,
    itemListElement: LOCATIONS.flatMap((l, li) =>
      INDUSTRIES.map((i, ii) => ({
        '@type': 'ListItem',
        position: li * INDUSTRIES.length + ii + 1,
        url: `${BASE}/${loc}/services/${s.slug}/${l.slug}/${i.slug}`,
        name: `${serviceName} in ${tSeo(loc, l.nameKey as any)} for ${tSeo(loc, i.nameKey as any)}`,
      }))
    ),
  };

  return (
    <>
      <Breadcrumbs
        locale={loc}
        items={[
          { label: tSeo(loc, 'home' as any), href: `/${loc}` },
          { label: tSeo(loc, 'services' as any), href: `/${loc}#services` },
          { label: serviceName },
        ]}
      />

      <section className="container-z pt-10 md:pt-16">
        <Reveal>
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{tSeo(loc, 'overview' as any)}</span>
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {serviceName} {loc === 'sw' ? 'katika' : 'in'} Zanzibar
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
            {serviceDesc}. {loc === 'sw'
              ? `Tunafanya kazi na hoteli, kituo cha starehe, villa, na waendeshaji wa ziara katika kila eneo la Zanzibar.`
              : `We work with hotels, resorts, villas, and tour operators across every Zanzibar location.`}
          </p>
        </Reveal>
      </section>

      {/* Locations grid */}
      <section className="container-z py-12 md:py-16">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {loc === 'sw' ? 'Chagua eneo' : 'Choose a location'}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {LOCATIONS.map((l) => {
            const name = tSeo(loc, l.nameKey as any);
            return (
              <Link
                key={l.slug}
                href={`/${loc}/services/${s.slug}/${l.slug}`}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-5 transition-colors hover:border-coral-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
              >
                <MapPin className="h-4 w-4 text-coral-300" aria-hidden="true" />
                <span className="font-display text-lg font-semibold text-white">{name}</span>
                <span className="text-xs text-white/55">
                  {INDUSTRIES.length} {loc === 'sw' ? 'sehemu' : 'industries'}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-coral-300" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-z">
        <CTA
          title={`${serviceName} — ${loc === 'sw' ? 'Pata nukuu yako' : 'Get your quote'}`}
          sub={loc === 'sw'
            ? 'Tuambie kuhusu mradi wako. Tunajibu ndani ya siku moja ya kazi na pendekezo lililobinafsishwa.'
            : 'Tell us about your project. We respond within one business day with a tailored proposal.'}
          locale={loc}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
