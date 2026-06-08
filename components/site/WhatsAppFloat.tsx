'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export function WhatsAppFloat() {
  const t = useTranslations('contact');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    'Hello Zanzibaba Studios! I would like to enquire about a production project.'
  )}`;

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 md:bottom-7 md:right-7 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {expanded && (
        <div
          className="glass-strong max-w-[280px] rounded-2xl p-4 text-sm text-white/90 shadow-card"
          role="tooltip"
        >
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-lagoon-300">
            <span
              className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-lagoon-400"
              aria-hidden="true"
            />
            Online now
          </div>
          <p className="text-balance text-white/85">{t('whatsapp')}</p>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 active:scale-95 md:h-16 md:w-16"
        aria-label={t('whatsapp')}
      >
        <span
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 opacity-50"
          aria-hidden="true"
        />
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
        <span
          className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-coral-500 text-[10px] font-bold text-white"
          aria-hidden="true"
        >
          1
        </span>
      </a>
    </div>
  );
}
