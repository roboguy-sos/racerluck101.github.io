import { Linkedin, Twitter } from "lucide-react";
import CopyLinkButton from "./CopyLinkButton";

export default function ShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
        Share
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-white/60 transition-colors hover:border-accent/40 hover:text-accent"
      >
        <Linkedin size={14} />
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-white/60 transition-colors hover:border-accent/40 hover:text-accent"
      >
        <Twitter size={14} />
        X
      </a>
      <CopyLinkButton url={url} />
    </div>
  );
}
