import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Flag, Crosshair } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { profile, socials } from "@/lib/data";

const directCards = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
];

const socialCards = [
  { icon: Linkedin, label: "LinkedIn", handle: "in/prateek-jaiswal", href: socials.linkedin },
  { icon: Github, label: "GitHub", handle: "racerluck101", href: socials.github },
  { icon: Crosshair, label: "HackTheBox", handle: "Top 500 · 2379756", href: socials.hackthebox },
  { icon: Flag, label: "CTFtime", handle: "user/257777", href: socials.ctftime },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Contact"
          title="Start a conversation"
          description="Available for engagements and full-time offensive security roles. Fastest response by email."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* direct contact */}
          <Reveal>
            <div className="glass h-full p-6 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                Direct
              </h3>
              <ul className="mt-5 space-y-3">
                {directCards.map((c) => {
                  const Inner = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <c.icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                          {c.label}
                        </p>
                        <p className="truncate text-sm text-white/85">{c.value}</p>
                      </div>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                        >
                          {Inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          {Inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <a href={`mailto:${profile.email}`} className="btn-primary mt-6 w-full">
                <Mail size={16} />
                Email {profile.name.split(" ")[0]}
              </a>
            </div>
          </Reveal>

          {/* social cards */}
          <Reveal delay={0.1}>
            <div className="glass h-full p-6 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                Networks & Profiles
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {socialCards.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="glass-hover group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/80 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <s.icon size={17} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{s.label}</p>
                        <p className="font-mono text-[11px] text-white/40">{s.handle}</p>
                      </div>
                    </div>
                    <ExternalLink
                      size={15}
                      className="text-white/20 transition-colors group-hover:text-accent"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
