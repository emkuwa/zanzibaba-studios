'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/site/Reveal';
import { FAQBlock, type FAQ } from './FAQBlock';
import { Check, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { tSeo } from '@/lib/seo-translations';
import { siteConfig } from '@/lib/site';

export type SEOContent = {
  locale: 'en' | 'sw';
  service: { slug: string; name: string; short: string; desc: string; keywords: string[] };
  location: { slug: string; name: string; region: string; desc: string; lat: number; lng: number };
  industry: { slug: string; name: string; desc: string; pain: string; goal: string };
  faqs: FAQ[];
};

export function SEOContentPage({ content }: { content: SEOContent }) {
  const { locale, service, location, industry, faqs } = content;
  const tHome = useTranslations('home');

  // Build process steps with templated copy
  const processSteps = [
    { titleKey: 'processStep1Title', descKey: 'processStep1Desc', n: 1 },
    { titleKey: 'processStep2Title', descKey: 'processStep2Desc', n: 2 },
    { titleKey: 'processStep3Title', descKey: 'processStep3Desc', n: 3 },
    { titleKey: 'processStep4Title', descKey: 'processStep4Desc', n: 4 },
    { titleKey: 'processStep5Title', descKey: 'processStep5Desc', n: 5 },
  ];

  const benefits = [
    { titleKey: 'benefit1Title', descKey: 'benefit1Desc', icon: Sparkles },
    { titleKey: 'benefit2Title', descKey: 'benefit2Desc', icon: Check },
    { titleKey: 'benefit3Title', descKey: 'benefit3Desc', icon: Check },
    { titleKey: 'benefit4Title', descKey: 'benefit4Desc', icon: Check },
  ];

  return (
    <article>
      {/* Hero */}
      <section className="relative pt-12 md:pt-20">
        <div className="container-z">
          <Reveal>
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
              <span>{tSeo(locale, 'heroPre', { service: service.name, location: location.name, industry: industry.name })}</span>
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {tSeo(locale, 'heroTitle', { service: service.name, location: location.name, industry: industry.name })}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              {tSeo(locale, 'heroSub', { service: service.name, serviceShort: service.short, industry: industry.name, location: location.name })}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/#contact" className="btn-primary group">
                {tSeo(locale, 'cta')}
                <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.whatsappDisplay}
              </a>
            </div>

            {/* Location meta strip */}
            <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-lagoon-300/80">
                  {locale === 'sw' ? 'Eneo' : 'Location'}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{location.name}</dd>
                <dd className="text-xs text-white/55">{location.region}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-lagoon-300/80">
                  {locale === 'sw' ? 'Sekta' : 'Industry'}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{industry.name}</dd>
                <dd className="text-xs text-white/55">{industry.desc}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-lagoon-300/80">
                  {locale === 'sw' ? 'Huduma' : 'Service'}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{service.name}</dd>
                <dd className="text-xs text-white/55">{service.desc}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="container-z py-12 md:py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {tSeo(locale, 'overview')}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-pretty text-base leading-relaxed text-white/75 md:text-lg">
                {location.desc}
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/65">
                {locale === 'sw'
                  ? `Tunafanya kazi na ${industry.name} katika ${location.name} kutoa ${service.short} ya daraja la sinema ambayo inaendesha uhifadhi, kuboresha uwajibikaji, na kuinua uzoefu wa wageni.`
                  : `We work with ${industry.name.toLowerCase()} in ${location.name} to deliver cinema-grade ${service.short.toLowerCase()} that drives bookings, increases visibility, and elevates the guest experience.`}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 p-6">
              <div className="text-[10px] uppercase tracking-[0.32em] text-lagoon-300/80">
                {locale === 'sw' ? 'Changamoto' : 'The Challenge'}
              </div>
              <p className="mt-2 text-base font-medium leading-snug text-white">
                {industry.pain}
              </p>
              <div className="mt-5 text-[10px] uppercase tracking-[0.32em] text-coral-300/80">
                {locale === 'sw' ? 'Lengo Letu' : 'Our Goal'}
              </div>
              <p className="mt-2 text-base font-medium leading-snug text-white">
                {industry.goal}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why this works (benefits) */}
      <section className="container-z py-12 md:py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {tSeo(locale, 'benefits')}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 p-6 transition-colors hover:border-coral-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-coral-300">
                    <b.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {tSeo(locale, b.titleKey as any)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {tSeo(locale, b.descKey as any)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="container-z py-12 md:py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {tSeo(locale, 'process')}
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-5">
            {processSteps.map((s) => (
              <li
                key={s.n}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-5"
              >
                <div className="font-display text-3xl font-semibold text-coral-300/70">
                  0{s.n}
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-white">
                  {tSeo(locale, s.titleKey as any)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/65">
                  {tSeo(locale, s.descKey as any)}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-z">
        <FAQBlock items={faqs} title={tSeo(locale, 'faq')} />
      </section>

      {/* Contact info card */}
      <section className="container-z">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/70 to-ink-900/40 p-6 sm:grid-cols-3 md:p-8">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.05] p-4 transition-colors hover:bg-[#25D366]/[0.10]"
          >
            <Phone className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-lagoon-300/80">
                WhatsApp
              </div>
              <div className="text-sm font-semibold text-white">{siteConfig.whatsappDisplay}</div>
            </div>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-coral-400/40"
          >
            <Mail className="h-5 w-5 text-coral-300" aria-hidden="true" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-lagoon-300/80">
                {locale === 'sw' ? 'Barua pepe' : 'Email'}
              </div>
              <div className="text-sm font-semibold text-white">{siteConfig.email}</div>
            </div>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <MapPin className="h-5 w-5 text-lagoon-300" aria-hidden="true" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-lagoon-300/80">
                {locale === 'sw' ? 'Studio' : 'Studio'}
              </div>
              <div className="text-sm font-semibold text-white">
                {siteConfig.address}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
