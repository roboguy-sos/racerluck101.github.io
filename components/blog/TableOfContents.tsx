import type { TocEntry } from "@/lib/blog";
import { cn } from "@/lib/utils";

function TocList({
  entries,
  depth = 0,
}: {
  entries: TocEntry[];
  depth?: number;
}) {
  if (entries.length === 0) return null;

  return (
    <ul
      className={cn(
        "space-y-2",
        depth > 0 && "ml-3 border-l border-white/10 pl-3"
      )}
    >
      {entries.map((entry) => (
        <li key={entry.id}>
          <a
            href={`#${entry.id}`}
            className="block text-sm leading-snug text-white/50 transition-colors hover:text-accent"
          >
            {entry.text}
          </a>
          <TocList entries={entry.children} depth={depth + 1} />
        </li>
      ))}
    </ul>
  );
}

export default function TableOfContents({
  toc,
  showLabel = true,
}: {
  toc: TocEntry[];
  showLabel?: boolean;
}) {
  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      {showLabel ? (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          On this page
        </p>
      ) : null}
      <div className="mt-4 border-l border-white/10 pl-4">
        <TocList entries={toc} />
      </div>
    </nav>
  );
}
