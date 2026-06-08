'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const GA_MEASUREMENT_ID = 'G-76F21X58RW';
const CONSENT_KEY = 'zanzibaba-consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

function getStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted') return 'accepted';
  if (stored === 'rejected') return 'rejected';
  return null;
}

function loadGA4() {
  if (typeof window === 'undefined') return;
  const existing = document.getElementById('ga4-script');
  if (existing) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.id = 'ga4-init';
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inline);
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (stored === 'accepted') {
      loadGA4();
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
    loadGA4();
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsent('rejected');
  };

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6" role="dialog" aria-label="Cookie consent">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 rounded-2xl border border-white/10 bg-ink-950/95 p-5 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:gap-6 md:p-6">
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-white/80">
            We use cookies to understand how you interact with our site and improve your experience. Accept all or reject non-essential tracking.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={reject}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-coral-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
