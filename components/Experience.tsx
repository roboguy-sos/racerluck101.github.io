"use client";

import { motion } from "framer-motion";
import { Briefcase, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Experience"
          title="Hands-on offensive engagements"
          description="Real assessments, real reports, real remediation guidance."
        />

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="relative pl-8 sm:pl-10">
            {/* timeline rail */}
            <span
              className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-accent via-accent/30 to-transparent sm:left-4"
              aria-hidden
            />
            <span
              className="absolute left-[5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-base sm:left-[9px]"
              aria-hidden
            />

            <article className="glass p-6 sm:p-8">
              <header className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Briefcase size={18} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{experience.title}</h3>
                    <p className="text-sm text-white/55">{experience.type}</p>
                  </div>
                </div>
                <span className="chip self-start whitespace-nowrap">{experience.period}</span>
              </header>

              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {experience.responsibilities.map((r, i) => (
                  <motion.li
                    key={r}
                    className="flex items-start gap-2.5 text-sm text-white/70"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                    <span>{r}</span>
                  </motion.li>
                ))}
              </ul>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
