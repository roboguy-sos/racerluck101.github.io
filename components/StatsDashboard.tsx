"use client";

import { Activity, ShieldAlert, Radar } from "lucide-react";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { stats } from "@/lib/data";

export default function StatsDashboard() {
  return (
    <section id="stats" className="section">
      <div className="container-px">
        <Reveal>
          <div className="glass relative overflow-hidden p-7 sm:p-10">
            {/* animated scanline */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,59,59,0.06) 50%, transparent 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              aria-hidden
            />

            <div className="relative flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                  <Radar size={18} />
                </span>
                <div>
                  <p className="eyebrow">
                    <span className="text-accent">{"// "}</span>Operations Dashboard
                  </p>
                  <h2 className="text-xl font-bold text-white">Security Statistics</h2>
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <Activity size={13} className="text-accent" /> live profile
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldAlert size={13} className="text-accent" /> verified
                </span>
              </div>
            </div>

            <dl className="relative mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((s, i) => (
                <Reveal as="div" key={s.label} delay={i * 0.06}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <p className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {s.label === "Global HTB Ranking" ? (
                        <>
                          <span className="text-accent">#</span>
                          <Counter value={s.value} suffix={s.suffix} />
                        </>
                      ) : (
                        <Counter value={s.value} suffix={s.suffix} />
                      )}
                    </p>
                    <p className="mt-1 text-xs font-medium text-white/70">{s.label}</p>
                    <p className="mt-0.5 text-[11px] text-white/40">{s.hint}</p>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
