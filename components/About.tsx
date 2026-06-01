import { MapPin, GraduationCap, Crosshair, Code2, Bot, BookOpen } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { bio, education, profile } from "@/lib/data";

const focusAreas = [
  { icon: Crosshair, title: "Offensive Security", text: "Web, network & identity exploitation across the full kill chain." },
  { icon: Code2, title: "Secure Development", text: "Defense-in-depth applications and purpose-built offensive tooling." },
  { icon: Bot, title: "AI Security Automation", text: "Agentic recon, LLM triage, and scalable security workflows." },
  { icon: BookOpen, title: "Continuous Learning", text: "HTB, PortSwigger & live CTFs to stay ahead of the threat curve." },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Profile"
          title="Offensive mindset, builder's discipline"
          description="An attacker's perspective paired with the engineering rigor to remediate, automate, and ship."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <article className="glass h-full p-7 sm:p-9">
              <div className="space-y-5">
                {bio.map((para, i) => (
                  <p key={i} className="text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="glass p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  Identity
                </h3>
                <p className="mt-3 text-lg font-semibold text-white">{profile.name}</p>
                <p className="text-sm text-white/55">{profile.role}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/60">
                  <MapPin size={15} className="text-accent" />
                  {profile.location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  Education
                </h3>
                <ul className="mt-3 space-y-3">
                  {education.map((e) => (
                    <li key={e.degree} className="flex items-start gap-3">
                      <GraduationCap size={16} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-white">{e.degree}</p>
                        <p className="text-xs text-white/45">{e.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="glass glass-hover h-full p-5">
                <f.icon size={20} className="text-accent" />
                <h4 className="mt-3 text-sm font-semibold text-white">{f.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
