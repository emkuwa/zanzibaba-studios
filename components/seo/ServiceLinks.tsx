import type { Service } from '@/lib/seo-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  service: Service;
  text: string;
  locale: 'en' | 'sw';
};

export function ServiceLinks({ service, text, locale }: Props) {
  return (
    <div className="my-10 rounded-2xl border border-coral-400/20 bg-gradient-to-br from-coral-500/[0.08] to-lagoon-500/[0.04] p-6 md:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-300">
            Featured Service
          </p>
          <p className="mt-1 font-display text-lg font-bold text-white">
            {service.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} in Zanzibar
          </p>
          <p className="mt-1 text-sm font-medium text-white/70">
            Professional {service.slug.replace('-', ' ')} for tourism and hospitality brands across Zanzibar and East Africa.
          </p>
        </div>
        <Link
          href={`/${locale === 'en' ? '' : 'sw/'}services/${service.slug}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-coral-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
        >
          {text}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
