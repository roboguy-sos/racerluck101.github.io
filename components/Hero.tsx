"use client";

import { motion } from "framer-motion";
import { Download, Mail, ShieldCheck, Trophy, Search, Crosshair } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import { profile, heroBadges, asset } from "@/lib/data";

const badgeIcons = [ShieldCheck, Trophy, Search, Crosshair];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* layered background */}
      <div className="absolute inset-0 bg-grid [background-size:48px_48px] opacity-60" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,230,118,0.10), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(0,230,118,0.06), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 opacity-70" aria-hidden>
        <NetworkBackground />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink"
        aria-hidden
      />

      <div className="container-px relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 font-mono text-xs text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for offensive security engagements
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-6 font-mono text-sm text-white/60">
            <span className="text-accent">root@offsec</span>:<span className="text-white/40">~</span>$ whoami
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_0_34px_rgba(0,230,118,0.22)] sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-accent">{profile.headline.replace(/\.$/, "")}</span>
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href={asset(profile.resume)} download className="btn-primary">
              <Download size={17} />
              Download Resume
            </a>
            <a href="#contact" className="btn-ghost">
              <Mail size={17} />
              Contact Me
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {heroBadges.map((badge, i) => {
              const Icon = badgeIcons[i];
              return (
                <li
                  key={badge.label}
                  className="glass glass-hover group flex flex-col gap-2 p-4"
                >
                  <Icon size={18} className="text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-white">{badge.label}</p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/45">
                      {badge.sub}
                    </p>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
