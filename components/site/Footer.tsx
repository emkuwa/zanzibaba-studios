'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useState } from 'react';
import { Instagram, Youtube, Linkedin, Facebook, ArrowRight, Check } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '@/lib/site';

const socials = [
  { Icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { Icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { Icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
];

export function Footer() {
  const t = useTranslations('footer');
  const tBr = useTranslations('brand');
  const tNav = useTranslations('nav');
  const tNewsletter = useTranslations('footer.newsletter');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 5000);
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/5 bg-ink-950 sm:mt-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral-500/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-coral-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-z relative py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
              aria-label={`${tBr('name')} home`}
            >
              <Logo className="h-9 w-9 text-coral-500" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-tight text-white">
                  {tBr('short')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.32em] text-lagoon-300/80">
                  {tBr('sub')}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-white/65">
              {t('tagline')}
            </p>

            <form onSubmit={onSubmit} className="mt-8 max-w-md" aria-label="Newsletter signup">
              <label
                htmlFor="newsletter-email"
                className="text-[11px] font-semibold uppercase tracking-[0.32em] text-lagoon-300/90"
              >
                {tNewsletter('title')}
              </label>
              <p className="mt-1 text-sm text-white/60">{tNewsletter('desc')}</p>
              <div className="mt-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 transition-colors focus-within:border-lagoon-300/60">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tNewsletter('placeholder')}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={tNewsletter('cta')}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-coral-500 px-4 text-xs font-semibold text-white transition-colors hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {tNewsletter('cta')}
                </button>
              </div>
              {done && (
                <p className="mt-2 text-xs text-lagoon-300" role="status">
                  {tNewsletter('success')}
                </p>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
                {t('explore')}
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="/#portfolio" className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {t('links.portfolio')}
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {t('links.about')}
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {t('links.pricing')}
                  </Link>
                </li>
                <li>
                  <Link href="/#zanzibar-live" className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {t('links.live')}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {t('links.contact')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
                {t('services')}
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li><Link href="/#services" className="text-white/75 transition-colors hover:text-lagoon-300">{t('links.about')}</Link></li>
                <li><Link href="/#portfolio" className="text-white/75 transition-colors hover:text-lagoon-300">{t('links.portfolio')}</Link></li>
                <li><Link href="/#zanzibar-live" className="text-white/75 transition-colors hover:text-lagoon-300">{t('links.live')}</Link></li>
                <li><Link href="/#pricing" className="text-white/75 transition-colors hover:text-lagoon-300">{t('links.pricing')}</Link></li>
                <li><Link href="/#contact" className="text-white/75 transition-colors hover:text-lagoon-300">{t('links.contact')}</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
                {t('connect')}
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="text-white/75 transition-colors hover:text-coral-300 focus:outline-none focus-visible:text-coral-300">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="text-white/55">{siteConfig.address}</li>
              </ul>
              <div className="mt-5 flex items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-coral-400/60 hover:text-coral-300 focus:outline-none focus-visible:border-coral-400 focus-visible:text-coral-300"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hairline mt-14" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {tBr('name')}. {t('rights')}
          </p>
          <p className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-lagoon-400"
              aria-hidden="true"
            />
            {t('crafted')}
          </p>
        </div>
      </div>
    </footer>
  );
}
