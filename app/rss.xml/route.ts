import { Feed } from "feed";
import { blog, profile, siteUrl } from "@/lib/data";
import { absoluteAsset, getAllPosts, postUrl } from "@/lib/blog";

export const dynamic = "force-static";

function coverUrl(cover?: string): string {
  if (!cover) return `${siteUrl}/og-default.png`;
  return /^https?:\/\//i.test(cover) ? cover : absoluteAsset(cover);
}

export function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    id: `${siteUrl}/blog/`,
    title: `${profile.name} — ${blog.title}`,
    description: blog.description,
    link: `${siteUrl}/blog/`,
    language: "en",
    image: `${siteUrl}/og-default.png`,
    favicon: `${siteUrl}/favicon.svg`,
    copyright: `© ${new Date().getFullYear()} ${profile.name}`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
    feedLinks: { rss: `${siteUrl}/rss.xml` },
    author: {
      name: profile.name,
      email: profile.email,
      link: siteUrl,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: postUrl(post.slug),
      link: postUrl(post.slug),
      description: post.description,
      date: new Date(post.date),
      image: coverUrl(post.cover),
      category: post.tags.map((name) => ({ name })),
      author: [{ name: profile.name, link: siteUrl }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
