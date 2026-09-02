import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import {
  SERVICES,
  LOCATIONS,
  INDUSTRIES,
  getService,
  getLocation,
} from '@/lib/seo-data';
import { tSeo } from '@/lib/seo-translations';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Link } from '@/routing';
import { Reveal } from '@/components/site/Reveal';
import { CTA } from '@/components/seo/CTA';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';

const BASE = siteConfig.url;

export function generateStaticParams() {
  const params: Array<{ locale: string; service: string; location: string }> = [];
  for (const locale of routing.locales) {
    for (const s of SERVICES) {
      for (const l of LOCATIONS) {
        params.push({ locale, service: s.slug, location: l.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string; location: string }>;
}): Promise<Metadata> {
  const { locale, service: sSlug, location: lSlug } = await params;
  if (!routing.locales.includes(locale as any)) return {};
  const s = getService(sSlug);
  const l = getLocation(lSlug);
  if (!s || !l) return {};

  const serviceName = tSeo(locale as 'en' | 'sw', s.nameKey as any);
  const locationName = tSeo(locale as 'en' | 'sw', l.nameKey as any);
  const title = `${serviceName} in ${locationName} | Zanzibaba Studios`;
  const description = locale === 'sw'
    ? `${serviceName} katika ${locationName}. Tunafanya kazi na hoteli, kituo cha starehe, villa, na waendeshaji wa ziara. Nukuu ya bure ndani ya saa 24.`
    : `${serviceName} in ${locationName}, Zanzibar. We work with hotels, resorts, villas, and tour operators. Free quote within 24 hours.`;

  const canonicalPath = locale === 'en' ? `/services/${s.slug}/${l.slug}` : `/${locale}/services/${s.slug}/${l.slug}`;
  const url = `${BASE}${canonicalPath}`;

  return {
    title,
    description,
    keywords: [...s.keywords, locationName, 'zanzibar'].join(', '),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/services/${s.slug}/${l.slug}`,
        sw: `${BASE}/sw/services/${s.slug}/${l.slug}`,
        'x-default': `${BASE}/services/${s.slug}/${l.slug}`,
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

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ locale: string; service: string; location: string }>;
}) {
  const { locale, service: sSlug, location: lSlug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);

  const s = getService(sSlug);
  const l = getLocation(lSlug);
  if (!s || !l) notFound();
  const loc = locale as 'en' | 'sw';

  const serviceName = tSeo(loc, s.nameKey as any);
  const locationName = tSeo(loc, l.nameKey as any);
  const serviceDesc = tSeo(loc, s.descKey as any);
  const locationDesc = tSeo(loc, l.descKey as any);

  return (
    <>
      <Breadcrumbs
        locale={loc}
        items={[
          { label: tSeo(loc, 'home' as any), href: `/${loc}` },
          { label: tSeo(loc, 'services' as any), href: `/${loc}#services` },
          { label: serviceName, href: `/${loc}/services/${s.slug}` },
          { label: locationName },
        ]}
      />

      <section className="container-z pt-10 md:pt-16">
        <Reveal>
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>
              {serviceName} · {locationName}
            </span>
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {serviceName} {loc === 'sw' ? 'katika' : 'in'} {locationName}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
            {serviceDesc}. {locationDesc}
          </p>
        </Reveal>
      </section>

      <section className="container-z py-12 md:py-16">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {loc === 'sw' ? 'Chagua tasnia yako' : 'Choose your industry'}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((i) => {
            const name = tSeo(loc, i.nameKey as any);
            const desc = tSeo(loc, i.descKey as any);
            return (
              <Link
                key={i.slug}
                href={`/${loc}/services/${s.slug}/${l.slug}/${i.slug}`}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-5 transition-colors hover:border-coral-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
              >
                <Building2 className="h-4 w-4 text-lagoon-300" aria-hidden="true" />
                <span className="font-display text-lg font-semibold text-white">{name}</span>
                <span className="text-xs text-white/55">{desc}</span>
                <ArrowRight className="mt-2 h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-coral-300" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-z">
        <CTA
          title={tSeo(loc, 'cta' as any)}
          sub={tSeo(loc, 'ctaSub' as any)}
          locale={loc}
        />
      </section>
    </>
  );
}
