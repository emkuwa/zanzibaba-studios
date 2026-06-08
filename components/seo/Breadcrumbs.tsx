import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: 'en' | 'sw' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://studios.zanzibaba.com${c.href}` } : {}),
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="container-z pt-6 md:pt-8"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-white/50">
          {items.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {c.href ? (
                <Link
                  href={c.href}
                  className="rounded transition-colors hover:text-coral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/80" aria-current="page">
                  {c.label}
                </span>
              )}
              {i < items.length - 1 && (
                <ChevronRight className="h-3 w-3 text-white/30" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
