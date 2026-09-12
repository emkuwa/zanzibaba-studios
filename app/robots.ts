import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'Google-Extended', 'ChatGPT-User', 'OAI-SearchBot'],
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['PerplexityBot', 'ClaudeBot', 'Anthropic-ai', 'meta-externalagent'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
