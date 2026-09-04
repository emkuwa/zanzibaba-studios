import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { SERVICES, LOCATIONS, INDUSTRIES } from '@/lib/seo-data';
import { BLOG_POSTS } from '@/lib/blog-data';
import { STOCK_ASSETS } from '@/lib/stock-data';
import { LIVE_CONTENT } from '@/lib/live-data';

const BASE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Core pages
  entries.push(
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: { en: `${BASE}/`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
    { url: `${BASE}/sw`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${BASE}/`, sw: `${BASE}/sw`, 'x-default': `${BASE}/` } } },
  );

  // Stock & Live hub pages
  entries.push(
    { url: `${BASE}/stock`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${BASE}/stock`, sw: `${BASE}/sw/stock`, 'x-default': `${BASE}/stock` } } },
    { url: `${BASE}/sw/stock`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { en: `${BASE}/stock`, sw: `${BASE}/sw/stock`, 'x-default': `${BASE}/stock` } } },
    { url: `${BASE}/live`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${BASE}/live`, sw: `${BASE}/sw/live`, 'x-default': `${BASE}/live` } } },
    { url: `${BASE}/sw/live`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { en: `${BASE}/live`, sw: `${BASE}/sw/live`, 'x-default': `${BASE}/live` } } },
  );

  // Commercial service pages
  entries.push(
    { url: `${BASE}/monthly-content`, lastModified: now, changeFrequency: 'monthly', priority: 0.85, alternates: { languages: { en: `${BASE}/monthly-content`, sw: `${BASE}/sw/monthly-content`, 'x-default': `${BASE}/monthly-content` } } },
    { url: `${BASE}/sw/monthly-content`, lastModified: now, changeFrequency: 'monthly', priority: 0.8, alternates: { languages: { en: `${BASE}/monthly-content`, sw: `${BASE}/sw/monthly-content`, 'x-default': `${BASE}/monthly-content` } } },
    { url: `${BASE}/construction-documentation`, lastModified: now, changeFrequency: 'monthly', priority: 0.85, alternates: { languages: { en: `${BASE}/construction-documentation`, sw: `${BASE}/sw/construction-documentation`, 'x-default': `${BASE}/construction-documentation` } } },
    { url: `${BASE}/sw/construction-documentation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8, alternates: { languages: { en: `${BASE}/construction-documentation`, sw: `${BASE}/sw/construction-documentation`, 'x-default': `${BASE}/construction-documentation` } } },
    { url: `${BASE}/shoots`, lastModified: now, changeFrequency: 'monthly', priority: 0.85, alternates: { languages: { en: `${BASE}/shoots`, sw: `${BASE}/sw/shoots`, 'x-default': `${BASE}/shoots` } } },
    { url: `${BASE}/sw/shoots`, lastModified: now, changeFrequency: 'monthly', priority: 0.8, alternates: { languages: { en: `${BASE}/shoots`, sw: `${BASE}/sw/shoots`, 'x-default': `${BASE}/shoots` } } },
  );

  // Stock asset pages
  for (const locale of ['en', 'sw'] as const) {
    for (const asset of STOCK_ASSETS) {
      const path = locale === 'en' ? `/stock/${asset.slug}` : `/sw/stock/${asset.slug}`;
      entries.push({
        url: `${BASE}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE}/stock/${asset.slug}`,
            sw: `${BASE}/sw/stock/${asset.slug}`,
            'x-default': `${BASE}/stock/${asset.slug}`,
          },
        },
      });
    }
  }

  // Live content pages
  for (const locale of ['en', 'sw'] as const) {
    for (const content of LIVE_CONTENT) {
      const path = locale === 'en' ? `/live/${content.slug}` : `/sw/live/${content.slug}`;
      entries.push({
        url: `${BASE}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE}/live/${content.slug}`,
            sw: `${BASE}/sw/live/${content.slug}`,
            'x-default': `${BASE}/live/${content.slug}`,
          },
        },
      });
    }
  }

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
