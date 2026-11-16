import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PostCard from "@/components/blog/PostCard";
import { blog, siteUrl } from "@/lib/data";
import { formatTag, getAllPosts, getAllTags } from "@/lib/blog";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const name = formatTag(tag);

  return {
    title: `${name} posts`,
    description: `Security research, lab notes, and writeups tagged ${name} on ${blog.title}.`,
    alternates: { canonical: `${siteUrl}/blog/tag/${tag}/` },
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getAllPosts().filter((post) => post.tags.includes(tag));

  if (posts.length === 0) notFound();

  const name = formatTag(tag);

  return (
    <main id="main" className="relative pb-20 pt-28 sm:pt-32">
      <div className="container-px">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-white/45 transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">
            <span className="text-accent">{"// "}</span>
            Topic
          </p>
          <h1 className="heading mt-3 text-4xl sm:text-5xl">{name}</h1>
          <p className="mt-4 text-white/60">
            {posts.length} {posts.length === 1 ? "post" : "posts"} tagged{" "}
            <span className="font-mono text-white/80">{tag}</span>.
          </p>
        </header>

        <h2 className="sr-only">Posts tagged {name}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
