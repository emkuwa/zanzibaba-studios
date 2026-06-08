import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { SERVICES, LOCATIONS, INDUSTRIES, COMBINATIONS } from '@/lib/seo-data';

const BASE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Core pages
  entries.push(
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: { en: `${BASE}/en`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: { en: `${BASE}/en`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
    { url: `${BASE}/sw`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${BASE}/en`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
  );

  // Service hub pages (7 services × 2 locales = 14)
  for (const locale of ['en', 'sw'] as const) {
    for (const s of SERVICES) {
      entries.push({
        url: `${BASE}/${locale}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: {
            en: `${BASE}/en/services/${s.slug}`,
            sw: `${BASE}/sw/services/${s.slug}`,
            'x-default': `${BASE}/en/services/${s.slug}`,
          },
        },
      });
    }
  }

  // Service × Location pages (7 × 10 × 2 = 140)
  for (const locale of ['en', 'sw'] as const) {
    for (const s of SERVICES) {
      for (const l of LOCATIONS) {
        entries.push({
          url: `${BASE}/${locale}/services/${s.slug}/${l.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: {
              en: `${BASE}/en/services/${s.slug}/${l.slug}`,
              sw: `${BASE}/sw/services/${s.slug}/${l.slug}`,
              'x-default': `${BASE}/en/services/${s.slug}/${l.slug}`,
            },
          },
        });
      }
    }
  }

  // Service × Location × Industry pages (560 × 2 = 1120)
  for (const locale of ['en', 'sw'] as const) {
    for (const s of SERVICES) {
      for (const l of LOCATIONS) {
        for (const i of INDUSTRIES) {
          entries.push({
            url: `${BASE}/${locale}/services/${s.slug}/${l.slug}/${i.slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.75,
            alternates: {
              languages: {
                en: `${BASE}/en/services/${s.slug}/${l.slug}/${i.slug}`,
                sw: `${BASE}/sw/services/${s.slug}/${l.slug}/${i.slug}`,
                'x-default': `${BASE}/en/services/${s.slug}/${l.slug}/${i.slug}`,
              },
            },
          });
        }
      }
    }
  }

  return entries;
}
