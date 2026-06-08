'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { routing, usePathname, useRouter } from '@/routing';

const labels: Record<string, string> = {
  en: 'English',
  sw: 'Kiswahili',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const onSelect = (next: string) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 text-[12px] font-medium uppercase tracking-wider text-white/85 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        <Languages className="h-3.5 w-3.5 text-lagoon-300" aria-hidden="true" />
        <span>{locale}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Available languages"
          className="glass-strong absolute right-0 top-12 z-50 min-w-[160px] overflow-hidden rounded-2xl p-1.5 shadow-card"
        >
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => onSelect(l)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 focus:outline-none focus-visible:bg-white/5 ${
                  l === locale ? 'text-coral-300' : 'text-white/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  {l === locale && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                  {l !== locale && <span className="inline-block h-3.5 w-3.5" aria-hidden="true" />}
                  {labels[l] ?? l}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">
                  {l}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
