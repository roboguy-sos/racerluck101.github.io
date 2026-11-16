import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { remark } from "remark";
import { toc } from "mdast-util-toc";
import { toString } from "mdast-util-to-string";
import type { Link, List, ListItem, Paragraph } from "mdast";
import { z } from "zod";
import { asset, productionBasePath, siteUrl } from "@/lib/data";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Decap CMS writes public paths with the deployed basePath. Normalize both
 * forms (/blog/x and /racerluck101.github.io/blog/x) to the repo-relative form.
 */
function normalizePublicPath(publicPath: string): string {
  return publicPath.startsWith(`${productionBasePath}/`)
    ? publicPath.slice(productionBasePath.length)
    : publicPath;
}

export type TocEntry = {
  id: string;
  text: string;
  children: TocEntry[];
};

export type PostFormat = "md" | "mdx";

export type PostType = "research" | "writeup" | "tooling" | "notes";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  type?: PostType;
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  featured: boolean;
  series?: string;
  seriesOrder?: number;
  canonical?: string;
  format: PostFormat;
  content: string;
  readingTime: number;
  toc: TocEntry[];
};

const dateSchema = z.coerce
  .date()
  .transform((value) => value.toISOString());

/** Decap CMS writes empty strings for cleared optional fields. */
const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

const frontmatterSchema = z
  .object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    date: dateSchema,
    updated: z.preprocess(emptyToUndefined, dateSchema.optional()),
    tags: z
      .array(
        z
          .string()
          .trim()
          .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "tags must be lowercase-hyphenated, e.g. active-directory"
          )
      )
      .default([]),
    type: z.enum(["research", "writeup", "tooling", "notes"]).optional(),
    cover: z.preprocess(
      emptyToUndefined,
      z.string().trim().optional()
    ),
    coverAlt: z.preprocess(
      emptyToUndefined,
      z.string().trim().optional()
    ),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    series: z.preprocess(emptyToUndefined, z.string().trim().optional()),
    seriesOrder: z.preprocess(
      emptyToUndefined,
      z.number().int().positive().optional()
    ),
    canonical: z.preprocess(
      emptyToUndefined,
      z.string().url().optional()
    ),
  })
  .strict();

type Frontmatter = z.infer<typeof frontmatterSchema>;

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const field = issue.path.length ? issue.path.join(".") : "frontmatter";
      return `${field}: ${issue.message}`;
    })
    .join("; ");
}

function buildToc(markdown: string): TocEntry[] {
  try {
    const tree = remark().parse(markdown);
    const result = toc(tree, { minDepth: 2, maxDepth: 4 });

    const walk = (list: List | undefined): TocEntry[] => {
      if (!list) return [];

      return list.children.flatMap((item: ListItem) => {
        const paragraph = item.children.find(
          (child): child is Paragraph => child.type === "paragraph"
        );
        const link = paragraph?.children.find(
          (child): child is Link => child.type === "link"
        );

        if (!link) return [];

        const nestedList = item.children.find(
          (child): child is List => child.type === "list"
        );

        return [
          {
            id: link.url.replace(/^#/, ""),
            text: toString(link),
            children: walk(nestedList),
          },
        ];
      });
    };

    return walk(result.map);
  } catch {
    // A malformed heading should not break the whole build. The post still renders.
    return [];
  }
}

function readingTimeFor(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function assertCoverExists(file: string, frontmatter: Frontmatter): void {
  if (!frontmatter.cover) return;

  if (!frontmatter.coverAlt) {
    throw new Error(
      `${file}: coverAlt is required when cover is set (describe the image for accessibility and social cards).`
    );
  }

  if (/^https?:\/\//i.test(frontmatter.cover)) return;

  const publicPath = normalizePublicPath(frontmatter.cover);

  if (!publicPath.startsWith("/")) {
    throw new Error(
      `${file}: cover must be a public path starting with "/blog/..." (received "${frontmatter.cover}").`
    );
  }

  const coverPath = path.join(PUBLIC_DIR, publicPath.replace(/^\/+/, ""));

  if (!fs.existsSync(coverPath)) {
    throw new Error(
      `${file}: cover image not found at public${publicPath}. Upload it there or remove the cover field.`
    );
  }
}

function readPost(file: string): Post | null {
  const extension = path.extname(file);
  if (extension !== ".md" && extension !== ".mdx") return null;

  const slug = path.basename(file, extension);
  if (slug.startsWith("_")) return null;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `${file}: filename must be lowercase-hyphenated, e.g. "ssrf-beyond-localhost.mdx".`
    );
  }

  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(`${file}: invalid frontmatter — ${formatIssues(parsed.error)}`);
  }

  const frontmatter = parsed.data;

  if (process.env.NODE_ENV === "production" && frontmatter.draft) {
    return null;
  }

  assertCoverExists(file, frontmatter);

  return {
    slug,
    ...frontmatter,
    format: extension === ".md" ? "md" : "mdx",
    content,
    readingTime: readingTimeFor(content),
    toc: buildToc(content),
  };
}

/**
 * Read every post from content/blog. Drafts are included during development so
 * `npm run dev` can preview them, but excluded from production builds.
 */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .map(readPost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const byDate = new Date(b.date).getTime() - new Date(a.date).getTime();
      return byDate !== 0 ? byDate : a.title.localeCompare(b.title);
    });
});

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export type TagSummary = {
  tag: string;
  name: string;
  count: number;
};

export function getAllTags(): TagSummary[] {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, name: formatTag(tag), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function getAdjacentPosts(slug: string): {
  previous: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

const tagLabels: Record<string, string> = {
  ad: "AD",
  adcs: "ADCS",
  ai: "AI",
  api: "API",
  av: "AV",
  bola: "BOLA",
  c2: "C2",
  csrf: "CSRF",
  ctf: "CTF",
  cve: "CVE",
  edr: "EDR",
  idor: "IDOR",
  jwt: "JWT",
  kerberos: "Kerberos",
  lfi: "LFI",
  lpe: "LPE",
  ntlm: "NTLM",
  osint: "OSINT",
  rce: "RCE",
  rfi: "RFI",
  sqli: "SQLi",
  ssrf: "SSRF",
  xss: "XSS",
  xxe: "XXE",
  "active-directory": "Active Directory",
  "red-team": "Red Team",
};

export function formatTag(tag: string): string {
  return (
    tagLabels[tag] ??
    tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export function postUrl(slug: string): string {
  return `${siteUrl}/blog/${slug}/`;
}

/** Turn a public path such as /blog/x/cover.png into an absolute URL. */
export function absoluteAsset(publicPath: string): string {
  const clean = normalizePublicPath(publicPath);
  return `${siteUrl}${clean.startsWith("/") ? clean : `/${clean}`}`;
}

/** Resolve a local public asset through basePath while leaving external URLs alone. */
export function resolveAsset(publicPath?: string): string | undefined {
  if (!publicPath) return undefined;
  return /^https?:\/\//i.test(publicPath)
    ? publicPath
    : asset(normalizePublicPath(publicPath));
}
