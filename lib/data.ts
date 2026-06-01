/**
 * Single source of truth for all portfolio content.
 * Edit values here to update the site — components read from this module.
 */

/**
 * Deployment location. Hosted as a GitHub *project* page, so it lives under
 * a subpath. `basePath` must match next.config.js and is prepended to links
 * pointing at static files in /public (plain <a>/metadata aren't auto-prefixed).
 */
export const basePath = "/racerluck101.github.io";
export const siteUrl = "https://roboguy-sos.github.io/racerluck101.github.io";

/** Prefix a /public asset path with the deployment basePath. */
export const asset = (path: string): string =>
  `${basePath}/${path.replace(/^\/+/, "")}`;

export const profile = {
  name: "Prateek Jaiswal",
  role: "Penetration Tester & Security Developer",
  location: "Raipur, India",
  email: "xprateekjaiswal@gmail.com",
  phone: "+91 9131048875",
  headline: "Breaking Applications Before Attackers Do.",
  subheadline:
    "OSCP+ Certified Penetration Tester, Red Team Operator, and Security Developer specializing in web exploitation, Active Directory attacks, offensive security automation, and AI-assisted security workflows.",
  resume: "Prateek_Jaiswal_Resume.pdf",
  footerTagline: "Securing Systems. Building Trust.",
} as const;

export const heroBadges = [
  { label: "OSCP+", sub: "OffSec Certified" },
  { label: "HTB Top 500", sub: "Worldwide" },
  { label: "Security Researcher", sub: "Web · AD · C2" },
  { label: "Red Team Operator", sub: "Adversary Emulation" },
] as const;

export const socials = {
  linkedin: "https://www.linkedin.com/in/prateek-jaiswal-1106ab334/",
  github: "https://github.com/racerluck101",
  hackthebox: "https://app.hackthebox.com/users/2379756",
  ctftime: "https://ctftime.org/user/257777",
  oscp: "https://credentials.offsec.com/36da3022-02b3-49d8-8290-2d082d1fc719",
} as const;

export const bio = [
  "I'm an OSCP+ certified offensive security engineer focused on finding and exploiting the flaws that put real systems at risk — from web application logic bugs to full Active Directory compromise. I approach every engagement with an attacker's mindset and a defender's discipline, translating technical findings into clear, business-ready risk.",
  "My work spans red team adversary emulation, Mythic C2 operations, and hands-on exploitation across the kill chain — initial access, privilege escalation, lateral movement, and evasion. I pair that with a builder's background, writing secure-by-design applications and the offensive tooling that powers faster, deeper assessments.",
  "I'm increasingly focused on AI-assisted security automation: agentic recon pipelines, LLM-driven vulnerability triage, and workflow automation that scales offensive operations without sacrificing rigor. Continuous learning is the core of the craft — I train constantly across HackTheBox, PortSwigger Academy, and live CTF competitions to stay ahead of the threat curve.",
] as const;

export const education = [
  { degree: "M.A. Philosophy", note: "Analytical reasoning & rigorous argumentation" },
  { degree: "D. Pharmacy", note: "Scientific method & systems thinking" },
] as const;

export type Achievement = {
  label: string;
  title: string;
  value: number;
  suffix: string;
  display: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    label: "OSCP+",
    title: "Offensive Security Certified Professional+",
    value: 1,
    suffix: "",
    display: "OSCP+",
    description: "Hands-on, exam-proven offensive security certification from OffSec.",
  },
  {
    label: "HackTheBox",
    title: "Top 500 Worldwide Ranking",
    value: 500,
    suffix: "",
    display: "Top 500",
    description: "Elite global standing across machines, challenges, and pro labs.",
  },
  {
    label: "PortSwigger Academy",
    title: "Web Security Learning Path",
    value: 80,
    suffix: "%",
    display: "80%",
    description: "Learning path completed across the full Web Security Academy.",
  },
  {
    label: "CTF Competitor",
    title: "Active Competition Player",
    value: 4,
    suffix: " domains",
    display: "Web · Crypto · Pwn · Forensics",
    description: "Competing actively across Web, Crypto, Pwn, and Forensics.",
  },
];

export type SkillGroup = {
  category: string;
  blurb: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Offensive Security",
    blurb: "Full-scope exploitation across web, network, and identity.",
    skills: [
      { name: "Web Application Pentesting", level: 95 },
      { name: "OWASP Top 10", level: 95 },
      { name: "Active Directory", level: 88 },
      { name: "Privilege Escalation", level: 90 },
      { name: "Network Exploitation", level: 85 },
      { name: "OSINT", level: 82 },
    ],
  },
  {
    category: "Red Team",
    blurb: "Adversary emulation mapped to MITRE ATT&CK.",
    skills: [
      { name: "Mythic C2", level: 86 },
      { name: "Kerberoasting", level: 88 },
      { name: "DCSync", level: 85 },
      { name: "LAPS Bypass", level: 80 },
      { name: "Lateral Movement", level: 87 },
      { name: "Process Injection", level: 82 },
      { name: "MITRE ATT&CK", level: 90 },
    ],
  },
  {
    category: "AI & Security Automation",
    blurb: "Agentic pipelines that scale offensive operations.",
    skills: [
      { name: "Agentic AI", level: 88 },
      { name: "LLM APIs", level: 90 },
      { name: "Recon Automation", level: 92 },
      { name: "Vulnerability Triage", level: 85 },
      { name: "Security Workflows", level: 87 },
    ],
  },
  {
    category: "Security Tools",
    blurb: "Daily-driver tooling for assessment and exploitation.",
    skills: [
      { name: "Burp Suite Pro", level: 95 },
      { name: "Metasploit", level: 88 },
      { name: "Nmap", level: 93 },
      { name: "Masscan", level: 85 },
      { name: "BloodHound", level: 88 },
      { name: "Impacket", level: 86 },
      { name: "SQLMap", level: 90 },
      { name: "Gobuster", level: 88 },
      { name: "Hashcat", level: 84 },
      { name: "Ffuf", level: 89 },
      { name: "Wireshark", level: 82 },
    ],
  },
  {
    category: "Development",
    blurb: "Secure-by-design engineering and offensive tooling.",
    skills: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 86 },
      { name: "TypeScript", level: 84 },
      { name: "Node.js", level: 85 },
      { name: "React", level: 83 },
      { name: "TailwindCSS", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Git", level: 90 },
      { name: "CI/CD", level: 82 },
    ],
  },
];

export const experience = {
  title: "Penetration Tester & Security Developer",
  period: "January 2024 – Present",
  type: "Freelance / Self Employed",
  responsibilities: [
    "Conducted OWASP Top 10 assessments across web applications and APIs.",
    "Delivered professional, reproducible exploit reports for stakeholders.",
    "Created CVSS-based remediation documentation with risk prioritization.",
    "Built AI-powered reconnaissance workflows for large attack surfaces.",
    "Automated vulnerability triage pipelines to accelerate analysis.",
    "Operated Mythic C2 infrastructure for adversary emulation.",
    "Performed red team simulations across the full attack lifecycle.",
    "Implemented process injection techniques for in-memory execution.",
    "Developed AV/EDR evasion research for defensive validation.",
    "Built secure web applications with defense-in-depth architecture.",
    "Created SQLi / XSS / SSRF scanning tools to scale testing coverage.",
  ],
} as const;

export type Project = {
  name: string;
  description: string;
  tags: string[];
  category: string;
};

export const projects: Project[] = [
  {
    name: "Agentic Security Recon Platform",
    description:
      "AI-powered reconnaissance pipeline automating subdomain enumeration, endpoint discovery, and vulnerability triage. Orchestrates LLM agents to prioritize attack surface at scale.",
    tags: ["Agentic AI", "Python", "LLM APIs", "Recon"],
    category: "AI Automation",
  },
  {
    name: "Offensive Web Security Scanner",
    description:
      "Automated SQLi, XSS, and SSRF testing framework with intelligent payload generation and a low false-positive verification engine for fast, reliable web assessments.",
    tags: ["Python", "SQLi", "XSS", "SSRF"],
    category: "Offensive Tooling",
  },
  {
    name: "Active Directory Attack Lab",
    description:
      "Enterprise-scale AD lab for privilege escalation and lateral movement simulations — Kerberoasting, DCSync, and ACL abuse mapped end-to-end to MITRE ATT&CK.",
    tags: ["Active Directory", "BloodHound", "Impacket", "ATT&CK"],
    category: "Red Team",
  },
  {
    name: "Secure Web Application Framework",
    description:
      "Security-first web application architecture implementing strict CSP, JWT hardening, and secure development practices as a reusable, audited baseline.",
    tags: ["TypeScript", "Node.js", "CSP", "JWT"],
    category: "Secure Development",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  detail: string;
  href?: string;
  status: string;
};

export const certifications: Certification[] = [
  {
    name: "OSCP+",
    issuer: "OffSec",
    detail: "Offensive Security Certified Professional+ — hands-on exploitation exam.",
    href: socials.oscp,
    status: "Verified",
  },
  {
    name: "PortSwigger Web Security Academy",
    issuer: "PortSwigger",
    detail: "80% of the Web Security learning path completed across all topics.",
    status: "80% Complete",
  },
  {
    name: "HackTheBox Achievements",
    issuer: "HackTheBox",
    detail: "Top 500 worldwide ranking across machines, challenges, and labs.",
    href: socials.hackthebox,
    status: "Top 500",
  },
];

export type Stat = {
  label: string;
  value: number;
  suffix: string;
  hint: string;
};

export const stats: Stat[] = [
  { label: "Vulnerabilities Identified", value: 350, suffix: "+", hint: "Across web, network & AD" },
  { label: "Machines Compromised", value: 200, suffix: "+", hint: "HTB · labs · engagements" },
  { label: "CTF Competitions", value: 40, suffix: "+", hint: "Web · Crypto · Pwn · Forensics" },
  { label: "Global HTB Ranking", value: 500, suffix: "", hint: "Top 500 worldwide" },
  { label: "Exploit Reports Delivered", value: 60, suffix: "+", hint: "CVSS-scored remediation" },
  { label: "Security Tools Built", value: 15, suffix: "+", hint: "Recon, scanning & C2 ops" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#terminal", label: "Terminal" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
] as const;
