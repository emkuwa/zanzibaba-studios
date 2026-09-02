'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Navbar() {
  const t = useTranslations('nav');
  const tBr = useTranslations('brand');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const items = [
    { href: '/', label: t('home') },
    { href: '/#services', label: t('services') },
    { href: '/blog', label: t('blog') },
    { href: '/#portfolio', label: t('portfolio') },
    { href: '/#zanzibar-live', label: t('zanzibarLive') },
    { href: '/#pricing', label: t('pricing') },
    { href: '/#contact', label: t('contact') },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/85 via-ink-950/60 to-transparent backdrop-blur-md"
        aria-hidden="true"
      />
      <div className="container-z flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          aria-label={`${tBr('name')} home`}
        >
          <Logo className="h-8 w-8 text-coral-500 transition-transform group-hover:rotate-12" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight text-white">
              {tBr('short')}
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-lagoon-300/80">
              {tBr('sub')}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((it) => {
            const active = pathname === it.href.split('#')[0];
            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400',
                  active && 'text-white'
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/#contact"
            className="btn-primary hidden md:inline-flex"
          >
            {t('quote')}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 lg:hidden"
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden">
          <div className="container-z pb-6">
            <div className="glass-strong rounded-3xl p-3">
              <ul className="flex flex-col">
                {items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-base text-white/80 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:bg-white/5"
                    >
                      <span>{it.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-coral-400" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li className="px-1 pt-2">
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    {t('quote')}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
