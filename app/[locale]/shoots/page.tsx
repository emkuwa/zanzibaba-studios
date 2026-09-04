import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Reveal } from '@/components/site/Reveal';
import { Link } from '@/routing';
import { Camera, Film, Plane, Image, Sun } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

const PACKAGES = [
  { id: 'photography', icon: Camera, price: 350 },
  { id: 'drone', icon: Plane, price: 400 },
  { id: 'reels', icon: Film, price: 300 },
  { id: 'photo-drone', icon: Image, price: 600 },
  { id: 'full-day', icon: Sun, price: 1200 },
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title:
      'One-Off Shoots | Professional Content On Demand | Zanzibaba Studios',
    description:
      'Book professional photography, drone, and video shoots in Zanzibar. One-off sessions tailored to your needs — no long-term commitment required.',
    alternates: { canonical: `${siteConfig.url}/shoots` },
    openGraph: {
      title: `One-Off Shoots | ${siteConfig.name}`,
      description:
        'Professional photography, drone, and video shoots in Zanzibar on demand.',
      url: `${siteConfig.url}/shoots`,
      siteName: siteConfig.name,
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
    },
  };
}

export default async function ShootsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'quickShoots' });

  return (
    <main>
      <Breadcrumbs
        items={[{ href: '/', label: 'Home' }, { label: 'Shoots' }]}
        locale={locale as 'en' | 'sw'}
      />

      {/* Hero */}
      <section className="container-z pt-10 pb-16 md:pt-16 md:pb-24">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow">
              <span
                className="inline-block h-1 w-6 bg-coral-500"
                aria-hidden="true"
              />
              <span>{t('hero.eyebrow')}</span>
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              {t('hero.subtitle')}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Shoot Packages */}
      <section className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-xl font-bold tracking-tight text-white/90 md:text-2xl">
            {t('packages.heading')}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <Reveal key={pkg.id} delay={i * 80}>
                <div className="group relative flex h-full flex-col glass rounded-3xl p-6 transition-all duration-300 hover:border-coral-400/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-3">
                    <Icon
                      className="h-5 w-5 text-coral-400"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-sm font-bold text-white">
                      {t(`packages.items.${pkg.id}.name`)}
                    </h3>
                  </div>

                  <p className="mt-1 font-display text-2xl font-bold text-coral-400">
                    ${pkg.price}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {t(`packages.items.${pkg.id}.description`)}
                  </p>

                  <ul className="mt-4 flex-1 space-y-1.5">
                    {(
                      t.raw(`packages.items.${pkg.id}.features`) as string[]
                    ).map((feature: string, fi: number) => (
                      <li
                        key={fi}
                        className="flex items-start gap-2 text-xs text-white/60"
                      >
                        <span
                          className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-coral-500"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hi, I'd like to book the ${t(`packages.items.${pkg.id}.name`)} package.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-6 block w-full text-center"
                  >
                    {t('packages.bookButton')}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-z pb-20 md:pb-28">
        <Reveal>
          <div className="glass rounded-3xl p-8 text-center md:p-12">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              {t('cta.heading')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-white/70">
              {t('cta.description')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/monthly-content"
                className="btn-primary"
              >
                {t('cta.monthlyButton')}
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hi, I'd like to book a quick shoot."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {t('cta.whatsappButton')}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
