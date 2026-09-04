import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Reveal } from '@/components/site/Reveal';
import { Link } from '@/routing';
import {
  Camera,
  Plane,
  Video,
  ArrowRightLeft,
  BarChart3,
  Share2,
  Flag,
  Clapperboard,
  Archive,
} from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: 'Construction & Project Documentation | Zanzibaba Studios',
    description:
      'Professional construction and project documentation services in Zanzibar. Site photography, drone monitoring, progress videos, investor reports and completion films.',
    alternates: { canonical: `${siteConfig.url}/construction-documentation` },
    openGraph: {
      title: `Construction & Project Documentation | ${siteConfig.name}`,
      description:
        'Professional construction and project documentation services in Zanzibar.',
      url: `${siteConfig.url}/construction-documentation`,
      siteName: siteConfig.name,
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
    },
  };
}

const SERVICES = [
  { icon: Camera, titleKey: 'sitePhotography', descKey: 'sitePhotographyDesc' },
  { icon: Plane, titleKey: 'droneMonitoring', descKey: 'droneMonitoringDesc' },
  { icon: Video, titleKey: 'progressVideos', descKey: 'progressVideosDesc' },
  { icon: ArrowRightLeft, titleKey: 'beforeAfter', descKey: 'beforeAfterDesc' },
  { icon: BarChart3, titleKey: 'investorReports', descKey: 'investorReportsDesc' },
  { icon: Share2, titleKey: 'socialUpdates', descKey: 'socialUpdatesDesc' },
  { icon: Flag, titleKey: 'milestoneDocs', descKey: 'milestoneDocsDesc' },
  { icon: Clapperboard, titleKey: 'completionFilm', descKey: 'completionFilmDesc' },
  { icon: Archive, titleKey: 'visualArchive', descKey: 'visualArchiveDesc' },
];

const PRICING = [
  { tierKey: 'monthly', price: '$1,200', period: '/mo', features: ['monthly visits', 'photo + video deliverables', 'drone survey', 'progress report'] },
  { tierKey: 'milestone', price: '$2,500', period: '', features: ['per milestone delivery', 'full site coverage', 'investor-ready package', 'edited video'] },
  { tierKey: 'fullProject', price: 'Custom', period: '', features: ['end-to-end documentation', 'dedicated crew', 'completion film', 'visual archive'] },
];

const INDUSTRIES = [
  { icon: '🏨', titleKey: 'hotels' },
  { icon: '🏖️', titleKey: 'resorts' },
  { icon: '🏗️', titleKey: 'infrastructure' },
  { icon: '🏠', titleKey: 'residential' },
  { icon: '🏢', titleKey: 'commercial' },
  { icon: '🏗️', titleKey: 'renovations' },
];

export default async function ConstructionDocumentationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as 'en' | 'sw';

  const t = await getTranslations({ locale, namespace: 'constructionDocs' });

  return (
    <main>
      <Breadcrumbs
        items={[{ href: '/', label: t('home') }, { label: t('breadcrumb') }]}
        locale={loc}
      />

      {/* Hero */}
      <section className="container-z pt-10 pb-16 md:pt-16 md:pb-24">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
              <span>{t('eyebrow')}</span>
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              {t('heroSubtitle')}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Services Grid */}
      <section className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white/90 md:text-3xl">
            {t('servicesTitle')}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.titleKey} delay={i * 60}>
              <div className="group glass rounded-3xl p-6 transition-all duration-300 hover:border-coral-400/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]">
                <s.icon className="h-5 w-5 text-coral-400" aria-hidden="true" />
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  {t(s.titleKey as any)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {t(s.descKey as any)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white/90 md:text-3xl">
            {t('pricingTitle')}
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/65">
            {t('pricingSubtitle')}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.tierKey} delay={i * 80}>
              <div className="flex flex-col glass rounded-3xl p-6 transition-all duration-300 hover:border-coral-400/30">
                <h3 className="font-display text-lg font-bold text-white">
                  {t(`pricing.${p.tierKey}` as any)}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-coral-400">{p.price}</span>
                  {p.period && (
                    <span className="text-sm text-white/50">{p.period}</span>
                  )}
                </div>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="h-1 w-1 rounded-full bg-coral-400" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="btn-primary mt-8 inline-flex items-center gap-2"
                  >
                    {t('getStarted')}
                    <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="container-z pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white/90 md:text-3xl">
            {t('industriesTitle')}
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.titleKey} delay={i * 50}>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/50 to-ink-900/30 p-5 text-center transition-all duration-300 hover:border-coral-400/30">
                <span className="text-2xl" aria-hidden="true">{ind.icon}</span>
                <span className="font-display text-sm font-bold text-white">
                  {t(`industries.${ind.titleKey}` as any)}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-z pb-20 md:pb-28">
        <Reveal>
          <div className="glass rounded-3xl p-10 text-center md:p-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
              {t('ctaSubtitle')}
            </p>
            <Link
              href="/contact"
              className="btn-primary mt-8 inline-flex items-center gap-2"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
