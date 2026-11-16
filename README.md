# Prateek Jaiswal — Offensive Security Engineer Portfolio

Premium, dark-mode portfolio for an **OSCP+ certified Penetration Tester / Red Team Operator / Security Developer**.

Built with **Next.js 15 · TypeScript · TailwindCSS · Framer Motion · MDX**, statically exported for **GitHub Pages**.

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
- **Field Notes blog** — Markdown/MDX posts, tags, table of contents, syntax-highlighted code with copy buttons, RSS, per-post SEO/Open Graph, and optional GoatCounter analytics (set your site code in `lib/data.ts`).
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

Portfolio copy lives in **`lib/data.ts`** — profile, bio, achievements, skills, experience,
projects, certifications, stats, and social links. Blog posts live in **`content/blog/`**.
Edit those files; components read from those sources.

Replace the resume at **`public/Prateek_Jaiswal_Resume.pdf`** to update the download.

---

## Writing a blog post

The blog lives at **`/blog/`**. Posts are plain Markdown/MDX files in **`content/blog/`**; images live in **`public/blog/<slug>/`**. There is no CMS, database, or server.

### Publish from GitHub (web UI)

1. Open `content/_template.mdx`, copy its contents, and create a new file at `content/blog/my-post-slug.mdx` (GitHub: **Add file → Create new file**).
2. Fill in the frontmatter. Keep the filename lowercase-hyphenated; it becomes the URL: `/blog/my-post-slug/`.
3. Upload images to `public/blog/my-post-slug/`. On GitHub, create the folder first with a placeholder file if needed (e.g. `public/blog/my-post-slug/.gitkeep`), then use **Add file → Upload files**, or drag the whole folder onto the upload page.
4. Reference images with a public path:

   ```md
   ![Alt text describing the screenshot](/blog/my-post-slug/burp-01.webp "Figure 1 — Optional visible caption")
   ```

5. Set `draft: false` when ready. Commit to `main`; the GitHub Action builds and deploys the site.

### Browser editor at `/admin/` (optional)

The repo includes a **Decap CMS** admin page at:

```txt
https://roboguy-sos.github.io/racerluck101.github.io/admin/
```

It is a static page, not a secret endpoint. Publishing is protected by **GitHub
OAuth**: only GitHub accounts with write access to this repository can save.
There is no separate blog username/password.

Before it works, deploy the small OAuth proxy in **`workers/github-oauth/`** and
set its URL in **`public/admin/config.yml`**. Until then, `/admin/` shows a
setup message instead of the login screen. Full steps:
[`workers/github-oauth/README.md`](workers/github-oauth/README.md).

Once configured, `/admin/` gives you:

- A form-based editor for all frontmatter fields
- Cover image upload to `public/blog/<slug>/`
- Draft/published filters
- A Markdown body editor
- Direct commits to `main`, which trigger the existing Pages deployment

Decap is Markdown-first. The sample post uses a custom `<Callout>` MDX
component; the CMS may not preview that component perfectly, though it should
preserve the source. For component-heavy posts, use the GitHub web UI or
`github.dev`; for normal Markdown posts, `/admin/` is convenient.

The admin page is marked `noindex, nofollow` and is not linked from the public
site. URL obscurity is not security — GitHub OAuth is the real gate. The Decap
bundle is pinned to `3.17.3` and loaded with Subresource Integrity; update the
version and hash deliberately when upgrading.

### Temporary password editor (until OAuth is ready)

If the OAuth proxy is not configured yet, there is a temporary fallback at:

```txt
https://roboguy-sos.github.io/racerluck101.github.io/admin/temp/
```

It is a single static page with no external scripts. It stores a **GitHub
fine-grained token encrypted with your password** in this browser's
`localStorage`, and uses it to create/edit posts and upload images.

1. Create a **fine-grained GitHub token**:
   - GitHub → Settings → Developer settings → Personal access tokens →
     Fine-grained tokens → Generate new token.
   - Repository access: **Only select repositories** →
     `roboguy-sos/racerluck101.github.io`.
   - Permissions: **Contents → Read and write**.
   - Expiration: **7 days**.
2. Open `/admin/temp/`.
3. First visit: enter a strong admin password and paste the token. The token is
   encrypted with AES-GCM + PBKDF2 and saved in this browser only.
4. Later visits: enter the password only.
5. Create/edit posts, upload images, and use **Save changes** / **Create post**.
   Commits go to `main`, which triggers the normal Pages deployment.

Security caveats:

- A static site cannot verify a password server-side. The password only
  encrypts the token; anyone who knows the password can unlock it.
- The token is decrypted in memory while the tab is unlocked. Browser
  extensions or malware could still read it.
- Use a strong password, a fine-grained token, and a 7-day expiry.
- Never use a classic PAT with broad `repo` scope for this.
- Revoke the token and delete `public/admin/temp/` once the OAuth `/admin/`
  editor is active.

The temporary editor supports the new-post form, raw MDX editing, image upload,
and a live sanitized Markdown preview next to the body/raw editor. The preview
styles `Callout`, renders `{expressions}` as inline code, and shows other MDX
components as placeholders/code rather than executing them. For advanced MDX
components, the GitHub web UI remains available. The preview can be expanded
to full width, and the page header can be collapsed.

### Frontmatter

```yaml
---
title: "SSRF Beyond localhost"
description: "One or two sentences for cards, search results, and social previews."
date: "2026-11-16"
updated: "2026-11-20"        # optional
tags: ["web", "ssrf"]        # lowercase-hyphenated
type: "research"             # research | writeup | tooling | notes
cover: "/blog/ssrf-beyond-localhost/cover.webp"
coverAlt: "Describe the cover image"
draft: false
featured: true               # optional
series: "SSRF Deep Dive"     # optional
seriesOrder: 1               # optional
canonical: "https://..."     # optional, for cross-posts
---
```

If a cover is set, `coverAlt` is required and the file must exist, otherwise the build fails with a clear error. Covers are used for cards and social previews; **1200×630** is the right size.

### Image guidelines

- Put images in `public/blog/<slug>/` using lowercase-hyphenated filenames.
- Prefer **WebP** for screenshots and **SVG** for diagrams.
- Keep screenshots at ≤1600 px wide and strip EXIF/GPS metadata. If you only use the GitHub web UI, compress in [Squoosh](https://squoosh.app/) before uploading.
- Add useful alt text; use the Markdown title for a visible caption.
- Avoid GIFs; use MP4/WebM for terminal recordings.
- `next.config.js` sets `images.unoptimized: true`, so images are served exactly as committed — compress before uploading.

The custom `BlogImage` component adds the GitHub Pages base path automatically, so write `/blog/...` paths without the `/racerluck101.github.io` prefix.

### Drafts and preview

- `draft: true` hides a post from production builds but shows it in `npm run dev`.
- The repo is public, so do not put client data or secrets in drafts.
- For a local preview:

  ```bash
  npm run dev
  # open http://localhost:3000/ (blog: http://localhost:3000/blog/)
  ```

### RSS, SEO, and analytics

- **RSS:** `/rss.xml` is generated from published posts.
- **Sitemap:** `app/sitemap.ts` includes the blog index and every post.
- **SEO:** each post gets canonical metadata, Open Graph/Twitter cards, and `BlogPosting` JSON-LD.
- **Analytics:** set your GoatCounter site code in `lib/data.ts`:

  ```ts
  export const analytics = {
    goatCounter: "your-site-code",
  } as const;
  ```

  Create a free account at <https://www.goatcounter.com>. Leaving it empty disables the script, so no third-party requests load by default.

### Security-writing checklist

- Redact tokens, cookies, JWTs, API keys, internal IPs/hostnames, emails, and client names.
- Blur sensitive fields in screenshots; don't just crop them.
- Respect platform rules: no active CTF flags, no writeups for active HackTheBox machines.
- Coordinate disclosure before publishing vulnerability details.
- Never publish live malware; use benign PoCs, hashes, YARA rules, and detection guidance.

---

## Project structure

```
app/            layout, page, globals.css, sitemap, robots
app/blog/       blog index, post route, tag pages
app/rss.xml/    generated RSS feed
components/     Hero, Navbar, About, Skills, Terminal, ...
components/blog/ PostCard, TableOfContents, MDX components
content/_template.mdx  copy-paste post template
content/blog/   Markdown/MDX posts
lib/            data.ts (content) · blog.ts (post loader) · utils.ts
public/         resume PDF, favicon, og-default.png, blog/<slug>/ images
public/admin/   Decap CMS admin page + config.yml (+ temp/ password editor)
workers/github-oauth/  Cloudflare Worker OAuth proxy for /admin/
scripts/        generate-blog-art.mjs
.github/        Pages deploy workflow
```

---

© Prateek Jaiswal — *Securing Systems. Building Trust.*
