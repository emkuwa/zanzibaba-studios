import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blog-data';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: 'Blog — Zanzibar Tourism Media, Video Production & Photography',
    description: 'Expert guides on Zanzibar video production, drone services, hotel photography, live streaming, and tourism content marketing. Insights from Zanzibaba Studios.',
    alternates: { canonical: `${siteConfig.url}/blog` },
    openGraph: { title: `Blog | ${siteConfig.name}`, description: 'Zanzibar tourism media production guides and insights.', url: `${siteConfig.url}/blog`, siteName: siteConfig.name, type: 'website', locale: locale === 'sw' ? 'sw_TZ' : 'en_US' },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Breadcrumbs
        items={[{ href: '/', label: 'Home' }, { label: 'Blog' }]}
        locale={locale as 'en' | 'sw'}
      />

      <section className="container-z pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
            <span>Insights & Guides</span>
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Zanzibar Tourism Media Blog
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            Expert guides on video production, drone services, hotel photography, live streaming, and content marketing for Zanzibar tourism brands.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale === 'en' ? '' : 'sw/'}blog/${post.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 transition-all duration-500 hover:border-coral-400/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {post.published}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {post.readMinutes} min read
                  </span>
                </div>
                <h2 className="mt-4 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-white/70">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-coral-300">
                  <span>Read More</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
