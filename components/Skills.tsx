"use client";

import { motion } from "framer-motion";
import {
    Crosshair,
    Swords,
    Bot,
    Wrench,
    Terminal as TerminalIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";

const groupIcons: Record<string, typeof Crosshair> = {
    "Offensive Security": Crosshair,
    "Red Team": Swords,
    "AI & Security Automation": Bot,
    "Security Tools": Wrench,
    Development: TerminalIcon,
};

function SkillBar({
    name,
    level,
    delay,
}: {
    name: string;
    level: number;
    delay: number;
}) {
    return (
        <li>
            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm text-white/75">{name}</span>
                <span className="font-mono text-xs text-white/40">
                    {level}%
                </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-dim via-accent to-accent-soft"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                        duration: 1.1,
                        delay,
                        ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                />
            </div>
        </li>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="section">
            <div className="container-px text-white">
                <SectionHeading
                    eyebrow="Capabilities"
                    title="A full offensive toolkit"
                    description="Categorized expertise spanning exploitation, adversary emulation, automation, tooling, and secure development."
                />

                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {skillGroups.map((group, gi) => {
                        const Icon = groupIcons[group.category] ?? Wrench;
                        const isWide = group.category === "Security Tools";
                        return (
                            <Reveal
                                key={group.category}
                                delay={gi * 0.06}
                                className={isWide ? "lg:col-span-2" : ""}
                            >
                                <article className="glass h-full p-6 sm:p-7">
                                    <header className="flex items-center gap-3">
                                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                                            <Icon size={18} />
                                        </span>
                                        <div>
                                            <h3 className="text-base font-semibold text-white">
                                                {group.category}
                                            </h3>
                                            <p className="text-xs text-white/80">
                                                {group.blurb}
                                            </p>
                                        </div>
                                    </header>

                                    <ul
                                        className={
                                            isWide
                                                ? "mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
                                                : "mt-6 space-y-4"
                                        }
                                    >
                                        {group.skills.map((s, si) => (
                                            <SkillBar
                                                key={s.name}
                                                name={s.name}
                                                level={s.level}
                                                delay={si * 0.05}
                                            />
                                        ))}
                                    </ul>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
