import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { asset } from "@/lib/data";
import { cn } from "@/lib/utils";
import BlogImage from "./BlogImage";
import Callout from "./Callout";
import Pre from "./Pre";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isStaticFile =
      href.startsWith("/") && /\.[a-z0-9]+$/i.test(href.split("?")[0]);

    if (href === "/") {
      return (
        <a href={asset("/")} {...props}>
          {children}
        </a>
      );
    }

    // Preserve fragments when jumping from a post back to a portfolio section.
    if (href.startsWith("/") && href.includes("#")) {
      return (
        <a href={asset(href)} {...props}>
          {children}
        </a>
      );
    }

    if (href.startsWith("/") && !isStaticFile) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    if (isStaticFile) {
      return (
        <a href={asset(href)} {...props}>
          {children}
        </a>
      );
    }

    if (/^https?:\/\//i.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  img: BlogImage,
  pre: Pre,
  h2: (props) => <h2 className="scroll-mt-28" {...props} />,
  h3: (props) => <h3 className="scroll-mt-28" {...props} />,
  h4: (props) => <h4 className="scroll-mt-28" {...props} />,
  table: ({ children, className, ...props }) => (
    <div className="my-6 w-full max-w-full overflow-x-auto rounded-xl border border-white/10">
      <table {...props} className={cn("w-full min-w-[560px]", className)}>
        {children}
      </table>
    </div>
  ),
  Callout,
};
