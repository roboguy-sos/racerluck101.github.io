import { Shield, Linkedin, Github, Crosshair, Flag, ArrowUp } from "lucide-react";
import { profile, socials } from "@/lib/data";

const links = [
  { icon: Linkedin, href: socials.linkedin, label: "LinkedIn" },
  { icon: Github, href: socials.github, label: "GitHub" },
  { icon: Crosshair, href: socials.hackthebox, label: "HackTheBox" },
  { icon: Flag, href: socials.ctftime, label: "CTFtime" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div
        className="pointer-events-none absolute inset-0 bg-grid [background-size:44px_44px] opacity-20"
        aria-hidden
      />
      <div className="container-px relative py-12">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-accent/40 bg-accent/10 text-accent">
              <Shield size={17} strokeWidth={2.5} />
            </span>
            <span className="font-mono text-sm font-semibold text-white">
              prateek<span className="text-accent">.</span>jaiswal
            </span>
          </a>

          <p className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Securing Systems.{" "}
            <span className="text-gradient">Building Trust.</span>
          </p>

          <div className="flex items-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={l.label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/65 transition-all hover:border-accent/40 hover:text-accent"
              >
                <l.icon size={17} />
              </a>
            ))}
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="font-mono text-xs text-white/35">
              © {profile.name} · {profile.location}
            </p>
            <p className="font-mono text-xs text-white/35">
              Built with Next.js · TypeScript · Tailwind
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors hover:text-accent"
            >
              Back to top <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
