import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Pencil,
} from "lucide-react";
import { mdxComponents } from "@/components/blog/mdx";
import PostCard from "@/components/blog/PostCard";
import ShareLinks from "@/components/blog/ShareLinks";
import TableOfContents from "@/components/blog/TableOfContents";
import { asset, blog, profile, siteUrl, socials } from "@/lib/data";
import {
  absoluteAsset,
  formatDate,
  formatTag,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  postUrl,
  resolveAsset,
} from "@/lib/blog";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function coverImageFor(post: NonNullable<ReturnType<typeof getPostBySlug>>): string {
  if (!post.cover) return `${siteUrl}/og-default.png`;
  return /^https?:\/\//i.test(post.cover)
    ? post.cover
    : absoluteAsset(post.cover);
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  const url = postUrl(post.slug);
  const coverImage = coverImageFor(post);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonical ?? url,
      types: { "application/rss+xml": `${siteUrl}/rss.xml` },
    },
    openGraph: {
      type: "article",
      url,
      siteName: `${profile.name} — ${blog.title}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [profile.name],
      tags: post.tags,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: post.coverAlt ?? post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [coverImage],
    },
    keywords: post.tags,
    robots: post.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const url = postUrl(post.slug);
  const cover = resolveAsset(post.cover);
  const coverImage = coverImageFor(post);
  const related = getRelatedPosts(post, 3);
  const { previous, next } = getAdjacentPosts(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [coverImage],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: profile.name,
      url: socials.github,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };

  return (
    <main id="main" className="relative pb-20 pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="container-px">
        <nav aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/45 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            All posts
          </Link>
        </nav>

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span className="text-accent">{post.type ?? "notes"}</span>
            {post.series ? (
              <span>
                Series · {post.series}
                {post.seriesOrder ? ` / ${post.seriesOrder}` : ""}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/40">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={14} aria-hidden />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={14} aria-hidden />
              {post.readingTime} min read
            </span>
            {post.updated ? (
              <span className="inline-flex items-center gap-2">
                <Pencil size={14} aria-hidden />
                Updated {formatDate(post.updated)}
              </span>
            ) : null}
          </div>

          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}/`}
                  className="chip transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {formatTag(tag)}
                </Link>
              ))}
            </div>
          ) : null}
        </header>

        {cover ? (
          <div className="mx-auto mt-10 max-w-5xl">
            <img
              src={cover}
              alt={post.coverAlt ?? ""}
              className="aspect-[1200/630] w-full rounded-2xl border border-white/10 object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}

        <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-16">
          <div className="mx-auto w-full min-w-0 max-w-3xl">
            <details className="glass mb-8 p-4 xl:hidden">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.25em] text-accent">
                On this page
              </summary>
              <div className="mt-2">
                <TableOfContents toc={post.toc} showLabel={false} />
              </div>
            </details>

            <article className="article-prose prose prose-invert max-w-none">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  blockJS: true,
                  mdxOptions: {
                    format: post.format,
                    remarkPlugins: [remarkGfm, remarkUnwrapImages],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "append",
                          properties: {
                            className: ["anchor-link"],
                            ariaLabel: "Link to this section",
                          },
                          content: {
                            type: "element",
                            tagName: "span",
                            properties: { ariaHidden: "true" },
                            children: [{ type: "text", value: "#" }],
                          },
                        },
                      ],
                      [
                        rehypePrettyCode,
                        {
                          theme: "vesper",
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </article>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
              <ShareLinks url={url} title={post.title} />
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-xs text-white/45 transition-colors hover:text-accent"
              >
                <ArrowLeft size={14} />
                All posts
              </Link>
            </div>

            <div className="glass mt-12 p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-sm font-semibold text-accent">
                  PJ
                </span>
                <div>
                  <p className="font-semibold text-white">{profile.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    OSCP+ certified penetration tester and security developer.
                    I write about exploitation, red team tradecraft, detection,
                    and security automation.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={asset("/#contact")}
                      className="btn-primary px-3 py-2 text-xs"
                    >
                      Work with me
                    </a>
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost px-3 py-2 text-xs"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {previous || next ? (
              <nav
                aria-label="Post navigation"
                className="mt-10 grid gap-4 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={`/blog/${previous.slug}/`}
                    className="glass glass-hover p-5"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      Newer
                    </span>
                    <span className="mt-2 block text-sm font-medium text-white">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}

                {next ? (
                  <Link
                    href={`/blog/${next.slug}/`}
                    className="glass glass-hover p-5 text-left sm:text-right"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      Older
                    </span>
                    <span className="mt-2 block text-sm font-medium text-white">
                      {next.title}
                    </span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <TableOfContents toc={post.toc} />
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-20" aria-label="Related posts">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                Related reading
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors hover:text-accent"
              >
                All posts
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
