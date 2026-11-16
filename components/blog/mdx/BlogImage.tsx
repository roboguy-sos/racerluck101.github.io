import "server-only";

import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { asset, basePath } from "@/lib/data";
import { cn } from "@/lib/utils";

type BlogImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "title" | "src"
> & {
  src?: string;
  /** Markdown image title is rendered as a visible figure caption. */
  title?: string;
};

function toDimension(value: number | string | undefined): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

/**
 * Markdown images are written with public paths such as
 * /blog/my-post/screenshot.webp. This component adds the GitHub Pages
 * basePath, reads the real image dimensions at build time, and renders a
 * caption from the Markdown title.
 */
export default function BlogImage({
  src = "",
  alt = "",
  title,
  width,
  height,
  className,
  ...props
}: BlogImageProps) {
  if (!src) return null;

  const isExternal = /^https?:\/\//i.test(src);
  const publicPath = src.startsWith(`${basePath}/`)
    ? src.slice(basePath.length)
    : src;
  const resolvedSrc = isExternal ? src : asset(publicPath);

  let resolvedWidth = toDimension(width);
  let resolvedHeight = toDimension(height);

  if (!isExternal && (!resolvedWidth || !resolvedHeight)) {
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        publicPath.replace(/^\/+/, "")
      );
      const dimensions = imageSize(fs.readFileSync(filePath));
      resolvedWidth = resolvedWidth ?? dimensions.width;
      resolvedHeight = resolvedHeight ?? dimensions.height;
    } catch {
      // Dimensions are optional. A missing file will be caught by the build
      // when the cover is validated, and the browser still renders the image.
    }
  }

  return (
    <figure className="my-8">
      <a
        href={resolvedSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-zoom-in"
        aria-label={alt ? `Open image in a new tab: ${alt}` : "Open image in a new tab"}
      >
        <img
          src={resolvedSrc}
          alt={alt}
          width={resolvedWidth}
          height={resolvedHeight}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.02]",
            className
          )}
          {...props}
        />
      </a>
      {title ? (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-white/45">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}
