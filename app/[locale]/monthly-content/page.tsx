import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Reveal } from '@/components/site/Reveal';
import { Calendar, Film, Package, Archive } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: 'Monthly Content Production | Zanzibaba Studios',
    description:
      'Hire Zanzibaba Studios as your ongoing production partner. We capture, edit and deliver social-ready photos, videos and drone footage every month — so you never run out of fresh visuals.',
    alternates: { canonical: `${siteConfig.url}/monthly-content` },
    openGraph: {
      title: `Monthly Content Production | ${siteConfig.name}`,
      description: 'Ongoing monthly content production for hotels, resorts, tour operators and brands.',
      url: `${siteConfig.url}/monthly-content`,
      siteName: siteConfig.name,
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
    },
  };
}

export default async function MonthlyContentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'monthlyContent' });
  const tIndustries = await getTranslations({ locale, namespace: 'industries' });

  const steps = [
    { key: 'step1' as const, icon: Calendar },
    { key: 'step2' as const, icon: Film },
    { key: 'step3' as const, icon: Package },
    { key: 'step4' as const, icon: Archive },
  ];

  const packages = ['essential', 'growth', 'premium'] as const;

  const industryKeys = [
    'tourism',
    'construction',
    'realEstate',
    'marine',
    'culture',
    'events',
    'business',
    'government',
  ] as const;

  return (
    <main>
      <Breadcrumbs
        items={[{ href: '/', label: 'Home' }, { label: 'Monthly Content' }]}
        locale={locale as 'en' | 'sw'}
      />

      {/* Hero */}
      <section className="container-z pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <Reveal>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              {t('subtitle')}
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/255700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t('cta')}
              </a>
              <a href="#pricing" className="btn-ghost">
                View Packages
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white/90 md:text-3xl">
            {t('howItWorks.title')}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.key}>
                <div className="group glass rounded-3xl p-6 transition-all duration-300 hover:border-coral-400/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-500/10 text-coral-400 transition-colors group-hover:bg-coral-500/20">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="mt-4 block font-display text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">
                    {t(`howItWorks.${step.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {t(`howItWorks.${step.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white/90 md:text-3xl">
            {t('packages.title')}
          </h2>
          <p className="mt-2 text-sm text-white/50">{t('packages.subtitle')}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => {
            const isGrowth = pkg === 'growth';
            const features = t.raw(`packages.${pkg}.features`) as string[];
            return (
              <Reveal key={pkg}>
                <div
                  className={`relative flex flex-col glass rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] ${
                    isGrowth
                      ? 'border-coral-400/40 bg-gradient-to-br from-coral-500/10 to-ink-900/30'
                      : 'hover:border-coral-400/30'
                  }`}
                >
                  {isGrowth && (
                    <span className="absolute -top-3 left-6 rounded-full bg-coral-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold text-white">
                    {t(`packages.${pkg}.name`)}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-coral-400">
                    {t(`packages.${pkg}.price`)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {t(`packages.${pkg}.desc`)}
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/255700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                      isGrowth
                        ? 'bg-coral-500 text-white hover:bg-coral-400'
                        : 'border border-white/15 text-white/80 hover:border-coral-400/40 hover:text-coral-300'
                    }`}
                  >
                    {t('cta')}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Industries */}
      <section className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white/90 md:text-3xl">
            {t('industries.title')}
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {industryKeys.map((key) => (
            <Reveal key={key}>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-coral-400/30 hover:text-white">
                {tIndustries(`items.${key}.title`)}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-z pb-20 md:pb-28">
        <Reveal>
            <div className="glass rounded-3xl p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('cta')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-white/60">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/255700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t('whatsapp')}
              </a>
              <a href="/contact" className="btn-ghost">
                {t('cta')}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
