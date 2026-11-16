import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog/`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : undefined,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(post.updated ?? post.date),
    })),
  ];
}
