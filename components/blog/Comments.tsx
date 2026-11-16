"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { comments } from "@/lib/data";

/**
 * Utterances comments. The widget creates/uses a GitHub issue per post based on
 * the current pathname. It needs the Utterances GitHub App installed once:
 * https://github.com/apps/utterances
 */
export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!comments.enabled) return;

    const container = containerRef.current;
    if (!container) return;

    // Re-create the widget when navigating between posts.
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", comments.repo);
    script.setAttribute("issue-term", comments.issueTerm);
    script.setAttribute("theme", comments.theme);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [pathname]);

  if (!comments.enabled) return null;

  return <div ref={containerRef} className="min-h-[12rem]" />;
}
