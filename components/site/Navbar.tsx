'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    { href: '/stock', label: t('stock') },
    { href: '/live', label: t('live') },
    { href: '/live#originals', label: t('originals') },
    { href: '/monthly-content', label: t('monthlyContent') },
    { href: '/construction-documentation', label: t('constructionDocs') },
    { href: '/shoots', label: t('shoots') },
    { href: '/blog', label: t('blog') },
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
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
            {t('production')}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 md:hidden"
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink-950/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />
            <motion.nav
              className="relative flex h-full flex-col overflow-y-auto px-6 py-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              aria-label="Mobile"
            >
              <button
                type="button"
                className="absolute right-6 top-8 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
                aria-label={t('close')}
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <ul className="mt-12 flex flex-col gap-1">
                {items.map((it, i) => {
                  const active = pathname === it.href.split('#')[0];
                  return (
                    <motion.li
                      key={it.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-colors hover:bg-white/5 focus:outline-none focus-visible:bg-white/5',
                          active ? 'text-white' : 'text-white/70 hover:text-white'
                        )}
                      >
                        <span>{it.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-coral-400" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  {t('production')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
