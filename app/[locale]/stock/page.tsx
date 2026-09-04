import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { STOCK_ASSETS, STOCK_CATEGORIES, STOCK_COLLECTIONS } from '@/lib/stock-data';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { StockGrid } from '@/components/site/StockGrid';
import { Camera, Film, Plane } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: 'Zanzibaba Stock \u2014 Licensed Photos, Video & Drone Footage | Zanzibaba Studios',
    description: 'Browse licensed photography, 4K video and drone footage from Zanzibar. Tourism, construction, real estate, culture, marine and aerial content available for commercial and editorial use.',
    alternates: { canonical: `${siteConfig.url}/stock` },
    openGraph: {
      title: `Zanzibaba Stock | ${siteConfig.name}`,
      description: 'Licensed photography, video and drone footage from Zanzibar.',
      url: `${siteConfig.url}/stock`,
      siteName: siteConfig.name,
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
    },
  };
}

export default async function StockPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Breadcrumbs
        items={[{ href: '/', label: 'Home' }, { label: 'Stock' }]}
        locale={locale as 'en' | 'sw'}
      />

      {/* Hero */}
      <section className="container-z pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>Licensed Content</span>
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Zanzibaba Stock
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            Premium licensed photography, 4K video and drone footage from across Zanzibar. Available for commercial, editorial and creative projects worldwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            <span className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-coral-400" aria-hidden="true" />
              {STOCK_ASSETS.filter((a) => a.type === 'photo').length} Photos
            </span>
            <span className="flex items-center gap-2">
              <Film className="h-4 w-4 text-coral-400" aria-hidden="true" />
              {STOCK_ASSETS.filter((a) => a.type === 'video').length} Videos
            </span>
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-coral-400" aria-hidden="true" />
              {STOCK_ASSETS.filter((a) => a.type === 'drone').length} Drone
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-z pb-16 md:pb-24">
        <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
          Browse by Category
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {STOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/50 to-ink-900/30 p-5 transition-all duration-300 hover:border-coral-400/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
            >
              <h3 className="font-display text-sm font-bold text-white">
                {cat.label}
              </h3>
              <p className="mt-1 text-xs font-medium text-white/50">
                {cat.count} assets
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stock Grid — client-side search & filter */}
      <section className="container-z pb-20 md:pb-28">
        <StockGrid
          assets={STOCK_ASSETS}
        />
      </section>
    </main>
  );
}
