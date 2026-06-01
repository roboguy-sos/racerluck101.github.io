import { ArrowUpRight, FolderGit2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects, socials } from "@/lib/data";

export default function Projects() {
    return (
        <section id="projects" className="section">
            <div className="container-px text-white">
                <SectionHeading
                    eyebrow="Selected Work"
                    title="Tools & labs that move the needle"
                    description="Offensive automation, scanning frameworks, and security-first engineering."
                />

                <div className="mt-14 grid gap-5 md:grid-cols-2">
                    {projects.map((p, i) => (
                        <Reveal key={p.name} delay={i * 0.08}>
                            <article className="glass glass-hover group relative flex h-full flex-col p-6 sm:p-7">
                                <div className="flex items-start justify-between">
                                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                                        <FolderGit2 size={18} />
                                    </span>
                                    <span className="chip">{p.category}</span>
                                </div>

                                <h3 className="mt-5 text-lg font-semibold text-white">
                                    {p.name}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-white">
                                    {p.description}
                                </p>

                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                        <li
                                            key={t}
                                            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-white/55"
                                        >
                                            {t}
                                        </li>
                                    ))}
                                </ul>

                                <div
                                    className="pointer-events-none absolute right-5 top-5 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                    aria-hidden
                                >
                                    <ArrowUpRight size={18} />
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-8 text-center">
                    <a
                        href={socials.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-ghost"
                    >
                        <FolderGit2 size={16} />
                        View more on GitHub
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
