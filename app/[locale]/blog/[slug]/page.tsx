import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from '@/lib/blog-data';
import { siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedArticles } from '@/components/seo/RelatedArticles';
import { ServiceLinks } from '@/components/seo/ServiceLinks';
import { SERVICES } from '@/lib/seo-data';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const post of BLOG_POSTS) {
    for (const locale of ['en', 'sw'] as const) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} • ${siteConfig.name}`,
    description: post.description,
    keywords: post.keywords.join(', '),
    alternates: { canonical: `${siteConfig.url}/${locale === 'en' ? '' : 'sw/'}blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: post.published,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  const serviceLinks = post.relatedServices
    .map((s) => SERVICES.find((sv) => sv.slug === s))
    .filter(Boolean);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { label: post.title },
        ]}
        locale={locale as 'en' | 'sw'}
      />

      <article className="container-z pt-10 pb-20 md:pt-16 md:pb-28">
        <Link
          href={`/${locale === 'en' ? '' : 'sw/'}blog`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-coral-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {post.published}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readMinutes} min read
            </span>
          </div>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/80">
            {post.description}
          </p>
        </header>

        <div className="mt-8 aspect-[21/9] w-full overflow-hidden rounded-3xl">
          <img
            src={post.image}
            alt=""
            width={1200}
            height={514}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_300px]">
          <div className="prose-custom max-w-none">
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2 className="mt-12 first:mt-0 font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base font-medium leading-relaxed text-white/80 md:text-lg">
                  {section.body}
                </p>

                {post.featuredService && i === Math.floor(post.sections.length / 2) && (
                  <ServiceLinks
                    service={serviceLinks[0] || SERVICES[0]}
                    text={post.featuredService.text}
                    locale={locale as 'en' | 'sw'}
                  />
                )}
              </section>
            ))}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {serviceLinks.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                  Related Services
                </h3>
                <ul className="mt-4 space-y-3">
                  {serviceLinks.map((sv) => (
                    <li key={sv!.slug}>
                      <Link
                        href={`/${locale === 'en' ? '' : 'sw/'}services/${sv!.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:border-coral-400/40 hover:bg-coral-500/5 hover:text-coral-200"
                      >
                        <span>{sv!.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                        <span className="text-coral-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                Keywords
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/60"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-coral-500/[0.08] to-lagoon-500/[0.05] p-6">
              <h3 className="font-display text-lg font-bold text-white">Need a Quote?</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/70">
                Tell us about your project. We respond within one business day with a tailored proposal.
              </p>
              <Link
                href={`/${locale === 'en' ? '' : 'sw/'}#contact`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-coral-400"
              >
                Request a Quote
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <RelatedArticles posts={related} locale={locale as 'en' | 'sw'} />
        )}
      </article>
    </main>
  );
}
