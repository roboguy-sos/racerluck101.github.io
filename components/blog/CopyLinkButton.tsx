"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permissions can be denied; users can still copy the URL bar.
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-white/60 transition-colors hover:border-accent/40 hover:text-accent"
    >
      {copied ? <Check size={14} /> : <Link2 size={14} />}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
