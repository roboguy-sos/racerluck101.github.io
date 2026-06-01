import { Download, Mail, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { profile, asset } from "@/lib/data";

export default function CTA() {
    return (
        <section className="section">
            <div className="container-px text-white">
                <Reveal>
                    <div className="glass relative overflow-hidden p-8 text-center sm:p-14">
                        <div
                            className="pointer-events-none absolute inset-0"
                            aria-hidden
                            style={{
                                background:
                                    "radial-gradient(60% 80% at 50% 0%, rgba(0,230,118,0.14), transparent 70%)",
                            }}
                        />
                        <div
                            className="pointer-events-none absolute inset-0 bg-grid [background-size:40px_40px] opacity-30"
                            aria-hidden
                        />

                        <div className="relative mx-auto max-w-2xl">
                            <p className="eyebrow">
                                <span className="text-accent">{"// "}</span>
                                Hiring or scoping an engagement?
                            </p>
                            <h2 className="heading mt-4 text-3xl sm:text-4xl">
                                Let&rsquo;s find your weak points before someone
                                else does.
                            </h2>
                            <p className="mt-4 text-pretty text-sm leading-relaxed text-white sm:text-base">
                                Open to penetration testing, red team, and
                                security engineering roles — full-time,
                                contract, or freelance. Bring me your hardest
                                targets.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="btn-primary"
                                >
                                    <Mail size={17} />
                                    Get in touch
                                    <ArrowRight size={16} />
                                </a>
                                <a
                                    href={asset(profile.resume)}
                                    download
                                    className="btn-ghost"
                                >
                                    <Download size={17} />
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
