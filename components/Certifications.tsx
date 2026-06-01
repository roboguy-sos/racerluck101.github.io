import { BadgeCheck, ExternalLink, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Certifications"
          title="Verified credentials"
          description="Independently verifiable certifications and platform achievements."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {certifications.map((cert, i) => {
            const Wrapper = cert.href ? "a" : "div";
            return (
              <Reveal key={cert.name} delay={i * 0.08}>
                <Wrapper
                  {...(cert.href
                    ? { href: cert.href, target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="glass glass-hover group relative flex h-full flex-col overflow-hidden p-6"
                >
                  {/* sheen */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(70% 60% at 50% 0%, rgba(255,59,59,0.12), transparent 70%)",
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <ShieldCheck size={20} />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 font-mono text-[11px] text-accent">
                      <BadgeCheck size={12} />
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-base font-semibold text-white">{cert.name}</h3>
                  <p className="relative mt-0.5 font-mono text-xs uppercase tracking-wider text-white/40">
                    {cert.issuer}
                  </p>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {cert.detail}
                  </p>

                  {cert.href ? (
                    <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                      Verify credential
                      <ExternalLink size={13} />
                    </span>
                  ) : null}
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
