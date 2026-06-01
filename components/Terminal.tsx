"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  profile,
  socials,
  skillGroups,
  certifications,
} from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

const PROMPT = "visitor@prateek:~$";

const banner: string[] = [
  "Interactive shell — type a command and press Enter.",
  "Available: whoami · skills · certifications · contact · help · clear",
];

function runCommand(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return [];
    case "help":
      return [
        "Available commands:",
        "  whoami          Profile summary",
        "  skills          Core capability groups",
        "  certifications  Certifications & rankings",
        "  contact         Contact + social links",
        "  clear           Clear the screen",
      ];
    case "whoami":
      return [
        `${profile.name} — ${profile.role}`,
        `Location : ${profile.location}`,
        "Cert     : OSCP+ (OffSec Certified Professional+)",
        "Rank     : HackTheBox Top 500 Worldwide",
        "Focus    : Web exploitation · Active Directory · Red Team · AI security automation",
      ];
    case "skills":
      return skillGroups.flatMap((g) => [
        `${g.category}:`,
        "  " + g.skills.map((s) => s.name).join(", "),
      ]);
    case "certifications":
    case "certs":
      return certifications.map(
        (cert) => `• ${cert.name} — ${cert.issuer} [${cert.status}]`
      );
    case "contact":
      return [
        `Email     : ${profile.email}`,
        `Phone     : ${profile.phone}`,
        `LinkedIn  : ${socials.linkedin}`,
        `GitHub    : ${socials.github}`,
        `HackTheBox: ${socials.hackthebox}`,
        `CTFtime   : ${socials.ctftime}`,
      ];
    case "ls":
      return ["about  skills  certifications  projects  contact  resume.pdf"];
    case "sudo":
    case "sudo su":
      return ["nice try — this visitor is not in the sudoers file. 🛡️"];
    default:
      return [`command not found: ${cmd} — type 'help' for options`];
  }
}

const SUGGESTIONS = ["whoami", "skills", "certifications", "contact", "help"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    ...banner.map((text) => ({ type: "output" as const, text })),
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [...lines, { type: "input", text: cmd }];
    if (cmd.toLowerCase() === "clear") {
      setLines([]);
    } else {
      const out = runCommand(cmd).map((text) => ({ type: "output" as const, text }));
      setLines([...next, ...out]);
    }
    if (cmd) setHistory((h) => [...h, cmd]);
    setHIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(idx);
      setValue(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const idx = hIdx + 1;
      if (idx >= history.length) {
        setHIdx(-1);
        setValue("");
      } else {
        setHIdx(idx);
        setValue(history[idx]);
      }
    }
  };

  return (
    <section id="terminal" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Interactive"
          title="Drop into the shell"
          description="Explore the profile the way an operator would — run a command."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div
            className="glass overflow-hidden"
            onClick={() => inputRef.current?.focus()}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-white/45">
                bash — prateek-jaiswal
              </span>
            </div>

            {/* output */}
            <div
              ref={scrollRef}
              className="h-80 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((line, i) =>
                line.type === "input" ? (
                  <p key={i} className="text-white/90">
                    <span className="text-accent">{PROMPT}</span> {line.text}
                  </p>
                ) : (
                  <p key={i} className="whitespace-pre-wrap break-words text-white/60">
                    {line.text}
                  </p>
                )
              )}

              {/* live input line */}
              <div className="flex items-center text-white/90">
                <span className="shrink-0 text-accent">{PROMPT}</span>
                <span className="relative ml-2 flex-1">
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Terminal command input"
                    className="w-full bg-transparent text-white/90 caret-accent outline-none"
                  />
                </span>
              </div>
            </div>

            {/* quick-run chips */}
            <div className="flex flex-wrap gap-2 border-t border-white/10 bg-white/[0.02] px-4 py-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-white/60 transition-colors hover:border-accent/40 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
