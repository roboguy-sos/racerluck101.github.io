import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";
import { blog, profile, siteUrl, asset } from "@/lib/data";
import { getAllPosts, getAllTags } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  alternates: {
    canonical: `${siteUrl}/blog/`,
    types: { "application/rss+xml": `${siteUrl}/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog/`,
    title: `${blog.title} — ${profile.name}`,
    description: blog.description,
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: `${blog.title} — security research and writeups`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${blog.title} — ${profile.name}`,
    description: blog.description,
    images: [`${siteUrl}/og-default.png`],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blog.title,
    description: blog.description,
    url: `${siteUrl}/blog/`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}/`,
      datePublished: post.date,
    })),
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
        <section className="max-w-3xl">
          <p className="eyebrow">
            <span className="text-accent">{"// "}</span>
            {blog.title}
          </p>
          <h1 className="heading mt-3 text-4xl sm:text-5xl">
            Security research, lab notes &amp; writeups
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/65">
            {blog.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={asset("/rss.xml")} className="btn-ghost">
              <Rss size={16} />
              RSS feed
            </a>
            <a href={asset("/")} className="btn-ghost">
              Back to portfolio
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              Topics
            </span>
            {tags.map((tag) => (
              <Link
                key={tag.tag}
                href={`/blog/tag/${tag.tag}/`}
                className="chip transition-colors hover:border-accent/40 hover:text-accent"
              >
                {tag.name}
                <span className="ml-1.5 text-white/30">{tag.count}</span>
              </Link>
            ))}
          </div>
        ) : null}

        {featured ? (
          <section className="mt-12" aria-label="Featured post">
            <h2 className="sr-only">Featured post</h2>
            <PostCard post={featured} featured />
          </section>
        ) : (
          <div className="glass mt-12 p-8 text-center sm:p-12">
            <p className="font-mono text-sm text-white/50">
              No posts published yet. Add a Markdown file under{" "}
              <code className="text-accent-soft">content/blog/</code> and push to{" "}
              <code className="text-accent-soft">main</code>.
            </p>
          </div>
        )}

        {rest.length > 0 ? (
          <section className="mt-12" aria-label="All posts">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                All posts
              </h2>
              <span className="font-mono text-xs text-white/30">
                {posts.length} {posts.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
