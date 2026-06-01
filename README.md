# Prateek Jaiswal — Offensive Security Engineer Portfolio

Premium, dark-mode portfolio for an **OSCP+ certified Penetration Tester / Red Team Operator / Security Developer**.

Built with **Next.js 15 · TypeScript · TailwindCSS · Framer Motion**, statically exported for **GitHub Pages**.

🔗 **Live:** https://roboguy-sos.github.io/racerluck101.github.io/

---

## Features

- Cyber-security "SOC command-center" aesthetic — black (`#050505`), deep-red accent (`#ff3b3b`), glassmorphism cards, subtle grid.
- Animated network-graph / threat-map hero background (canvas, battery-aware, reduced-motion safe).
- Scroll-triggered reveals, animated counters, and animated skill bars.
- **Interactive terminal** (`whoami`, `skills`, `certifications`, `contact`, `help`, `clear`, arrow-key history).
- Security statistics dashboard with live count-up metrics.
- Sections: Hero · About · Achievements · Stats · Skills · Terminal · Experience · Projects · Certifications · CTA · Contact · Footer.
- SEO: metadata, Open Graph, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`.
- Accessibility: skip-link, focus rings, semantic landmarks, `prefers-reduced-motion`.
- Fully static export — no server required.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build (static export)

```bash
npm run build    # outputs static site to ./out
```

The `out/` directory is a complete static site (`output: "export"` in `next.config.js`).

---

## Deployment — GitHub Pages

This repo is hosted as a **project page** under the `roboguy-sos` account, so it
serves from a subpath. `next.config.js` sets `basePath: "/racerluck101.github.io"`
so routing and `_next/` assets resolve correctly.

### Automatic (recommended)

A workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Repository: `https://github.com/roboguy-sos/racerluck101.github.io`.
2. In **GitHub → Settings → Pages → Build and deployment**, set **Source = GitHub Actions**.
3. Push to `main`. The Action runs `npm ci && npm run build` and publishes `./out`.
4. Site goes live at **https://roboguy-sos.github.io/racerluck101.github.io/**.

### Manual

```bash
npm run build
# commit the ./out folder to a gh-pages branch, or upload via any static host
```

> `public/.nojekyll` is included so GitHub Pages serves Next.js's `_next/` asset folder correctly.

---

## Updating content

All copy lives in **`lib/data.ts`** — profile, bio, achievements, skills, experience,
projects, certifications, stats, and social links. Edit there; components read from it.

Replace the resume at **`public/Prateek_Jaiswal_Resume.pdf`** to update the download.

---

## Project structure

```
app/            layout, page, globals.css, sitemap, robots
components/      Hero, Navbar, About, Skills, Terminal, StatsDashboard, ...
lib/            data.ts (content) · utils.ts
public/         resume PDF, favicon, .nojekyll
.github/        Pages deploy workflow
```

---

© Prateek Jaiswal — *Securing Systems. Building Trust.*
