"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type PreProps = React.HTMLAttributes<HTMLPreElement>;

export default function Pre({ children, className, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const text = preRef.current?.innerText ?? "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can fail in insecure contexts or when permission is denied.
    }
  }

  return (
    <div className="group relative my-6">
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0b] p-4 pr-20 text-sm leading-relaxed",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copyCode}
        aria-label={copied ? "Code copied" : "Copy code"}
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink/80 px-2.5 py-1.5 font-mono text-[11px] text-white/60 opacity-100 backdrop-blur transition-colors hover:border-accent/40 hover:text-accent sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
