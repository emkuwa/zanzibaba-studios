import type { BlogPost } from '@/lib/blog-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  posts: BlogPost[];
  locale: 'en' | 'sw';
};

export function RelatedArticles({ posts, locale }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-white/10 pt-14">
      <h2 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
        Related Articles
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale === 'en' ? '' : 'sw/'}blog/${post.slug}`}
            className="group rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-5 transition-all duration-300 hover:border-coral-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
          >
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>{post.published}</span>
              <span>{post.readMinutes} min</span>
            </div>
            <h3 className="mt-3 font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-coral-200">
              {post.title}
            </h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/60 line-clamp-2">
              {post.description}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-coral-300">
              <span>Read</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
