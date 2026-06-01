"use client";

import { useEffect, useState } from "react";
import { Menu, X, Shield, Download } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-accent/40 bg-accent/10 text-accent">
            <Shield size={16} strokeWidth={2.5} />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-white">
            prateek<span className="text-accent">.</span>jaiswal
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-white/65 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`/${profile.resume}`}
            download
            className="btn-primary ml-2 px-4 py-2 text-xs"
          >
            <Download size={15} />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-base/95 backdrop-blur-xl lg:hidden">
          <div className="container-px flex flex-col py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`/${profile.resume}`}
              download
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
