"use client";

import { Award, Trophy, GraduationCap, Flag } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { achievements } from "@/lib/data";

const icons = [Award, Trophy, GraduationCap, Flag];

export default function Achievements() {
    return (
        <section id="achievements" className="section">
            <div className="container-px text-white">
                <SectionHeading
                    eyebrow="Achievements"
                    title="Credentials that hold up under scrutiny"
                    description="Proven, hands-on results — not just coursework."
                />

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {achievements.map((a, i) => {
                        const Icon = icons[i];
                        return (
                            <Reveal key={a.label} delay={i * 0.08}>
                                <article className="glass glass-hover group relative h-full overflow-hidden p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                                            <Icon size={18} />
                                        </span>
                                        <span className="chip">{a.label}</span>
                                    </div>

                                    <div className="mt-5">
                                        {a.suffix === "%" ? (
                                            <p className="font-mono text-3xl font-bold text-white">
                                                <Counter
                                                    value={a.value}
                                                    suffix="%"
                                                />
                                            </p>
                                        ) : a.label === "HackTheBox" ? (
                                            <p className="font-mono text-3xl font-bold text-white">
                                                Top <Counter value={a.value} />
                                            </p>
                                        ) : (
                                            <p className="font-mono text-3xl font-bold text-white">
                                                {a.display}
                                            </p>
                                        )}
                                        <p className="mt-1 text-sm font-medium text-white/80">
                                            {a.title}
                                        </p>
                                    </div>

                                    <p className="mt-3 text-xs leading-relaxed text-white">
                                        {a.description}
                                    </p>

                                    <div
                                        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                                        aria-hidden
                                    />
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
