import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
import { asset } from "@/lib/data";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[80svh] items-center justify-center pb-20 pt-28"
    >
      <div className="container-px text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
          <ShieldAlert size={30} strokeWidth={1.75} />
        </span>

        <p className="eyebrow mt-7">
          <span className="text-accent">{"// "}</span>
          404
        </p>
        <h1 className="heading mt-3 text-4xl sm:text-5xl">Signal lost.</h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
          That route does not exist. It may have moved, or the link may be
          wrong. Try the portfolio or the blog.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={asset("/")} className="btn-primary">
            <Home size={16} />
            Back home
          </a>
          <Link href="/blog" className="btn-ghost">
            <ArrowLeft size={16} />
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
