import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Shield } from "lucide-react";
import { formatDate, formatTag, resolveAsset, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  featured?: boolean;
  className?: string;
};

export default function PostCard({
  post,
  featured = false,
  className,
}: PostCardProps) {
  const cover = resolveAsset(post.cover);

  return (
    <article
      className={cn(
        "glass glass-hover group relative flex h-full flex-col overflow-hidden",
        className
      )}
    >
      <Link
        href={`/blog/${post.slug}/`}
        className="absolute inset-0 z-10"
        aria-label={`Read ${post.title}`}
      />

      <div
        className="relative aspect-[1200/630] overflow-hidden border-b border-white/10 bg-white/[0.02]"
      >
        {cover ? (
          <img
            src={cover}
            alt={post.coverAlt ?? ""}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading={featured ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-accent/10 via-transparent to-transparent">
            <Shield size={44} className="text-accent/40" aria-hidden />
          </div>
        )}

        <ArrowUpRight
          size={18}
          className="pointer-events-none absolute right-4 top-4 z-20 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-white/40">
          {post.type ? (
            <span className="uppercase tracking-[0.16em] text-accent/80">
              {post.type}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={12} aria-hidden />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={12} aria-hidden />
            {post.readingTime} min read
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 text-balance font-semibold text-white transition-colors group-hover:text-accent",
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            "mt-2 flex-1 text-pretty text-sm leading-relaxed text-white/65",
            featured && "sm:text-base"
          )}
        >
          {post.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-white/50"
            >
              {formatTag(tag)}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
