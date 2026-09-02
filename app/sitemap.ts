import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { SERVICES, LOCATIONS, INDUSTRIES } from '@/lib/seo-data';
import { BLOG_POSTS } from '@/lib/blog-data';

const BASE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Core pages
  entries.push(
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: { en: `${BASE}/`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
    { url: `${BASE}/sw`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${BASE}/`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
  );

  // Blog pages
  entries.push(
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${BASE}/blog`, sw: `${BASE}/sw/blog`, 'x-default': `${BASE}/blog` } } },
    { url: `${BASE}/sw/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { en: `${BASE}/blog`, sw: `${BASE}/sw/blog`, 'x-default': `${BASE}/blog` } } },
  );

  for (const locale of ['en', 'sw'] as const) {
    for (const post of BLOG_POSTS) {
      const path = locale === 'en' ? `/blog/${post.slug}` : `/sw/blog/${post.slug}`;
      entries.push({
        url: `${BASE}${path}`,
        lastModified: new Date(post.published),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE}/blog/${post.slug}`,
            sw: `${BASE}/sw/blog/${post.slug}`,
            'x-default': `${BASE}/blog/${post.slug}`,
          },
        },
      });
    }
  }

  // Service hub pages (7 services × 2 locales = 14)
  for (const locale of ['en', 'sw'] as const) {
    for (const s of SERVICES) {
      const path = locale === 'en' ? `/services/${s.slug}` : `/${locale}/services/${s.slug}`;
      entries.push({
        url: `${BASE}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: {
            en: `${BASE}/services/${s.slug}`,
            sw: `${BASE}/sw/services/${s.slug}`,
            'x-default': `${BASE}/services/${s.slug}`,
          },
        },
      });
    }
  }

  // Service × Location pages (7 × 10 × 2 = 140)
  for (const locale of ['en', 'sw'] as const) {
    for (const s of SERVICES) {
      for (const l of LOCATIONS) {
        const path = locale === 'en' ? `/services/${s.slug}/${l.slug}` : `/${locale}/services/${s.slug}/${l.slug}`;
        entries.push({
          url: `${BASE}${path}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: {
              en: `${BASE}/services/${s.slug}/${l.slug}`,
              sw: `${BASE}/sw/services/${s.slug}/${l.slug}`,
              'x-default': `${BASE}/services/${s.slug}/${l.slug}`,
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
          const path = locale === 'en' ? `/services/${s.slug}/${l.slug}/${i.slug}` : `/${locale}/services/${s.slug}/${l.slug}/${i.slug}`;
          entries.push({
            url: `${BASE}${path}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.75,
            alternates: {
              languages: {
                en: `${BASE}/services/${s.slug}/${l.slug}/${i.slug}`,
                sw: `${BASE}/sw/services/${s.slug}/${l.slug}/${i.slug}`,
                'x-default': `${BASE}/services/${s.slug}/${l.slug}/${i.slug}`,
              },
            },
          });
        }
      }
    }
  }

  return entries;
}
