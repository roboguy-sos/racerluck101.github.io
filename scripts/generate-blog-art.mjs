import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const postDir = path.join(root, "public", "blog", "welcome-to-field-notes");
fs.mkdirSync(postDir, { recursive: true });

function coverSvg({ eyebrow, lines, subline, footer }) {
  const titleLines = lines
    .map(
      (line, index) =>
        `<text x="80" y="${250 + index * 72}" font-family="DejaVu Sans, Arial, sans-serif" font-size="62" font-weight="700" fill="#ffffff">${line}</text>`
    )
    .join("");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050505"/>
      <stop offset="1" stop-color="#0a120e"/>
    </linearGradient>
    <radialGradient id="glow" cx="18%" cy="0%" r="80%">
      <stop offset="0" stop-color="#00e676" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#00e676" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e676" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="96" width="54" height="4" fill="#00e676"/>
  <text x="80" y="150" font-family="DejaVu Sans Mono, monospace" font-size="20" letter-spacing="6" fill="#00e676">${eyebrow}</text>
  ${titleLines}
  <text x="80" y="388" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" fill="#ffffff" fill-opacity="0.55">${subline}</text>
  <rect x="80" y="540" width="1040" height="1" fill="#ffffff" fill-opacity="0.08"/>
  <text x="80" y="580" font-family="DejaVu Sans Mono, monospace" font-size="18" fill="#ffffff" fill-opacity="0.4">${footer}</text>
  <g transform="translate(890 190)">
    <path d="M100 0 L190 34 V128 C190 196 150 244 100 270 C50 244 10 196 10 128 V34 Z" fill="#00e676" fill-opacity="0.04" stroke="#00e676" stroke-opacity="0.45" stroke-width="4"/>
    <path d="M60 130 L88 158 L146 96" fill="none" stroke="#00e676" stroke-opacity="0.8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="100" cy="135" r="150" fill="none" stroke="#00e676" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="100" cy="135" r="210" fill="none" stroke="#00e676" stroke-opacity="0.05" stroke-width="2"/>
  </g>
</svg>`;
}

const postCover = coverSvg({
  eyebrow: "FIELD NOTES",
  lines: ["Security research,", "lab notes &amp; writeups."],
  subline: "Exploitation · Active Directory · Red team · Security automation",
  footer: "Prateek Jaiswal · OSCP+ · Offensive Security",
});

const defaultCover = coverSvg({
  eyebrow: "FIELD NOTES",
  lines: ["Security research,", "lab notes &amp; writeups."],
  subline: "Prateek Jaiswal · OSCP+ · Offensive Security Engineer",
  footer: "roboguy-sos.github.io/racerluck101.github.io/blog",
});

const pipelineSvg = `<svg width="1200" height="360" viewBox="0 0 1200 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e676" fill-opacity="0.7"/>
    </marker>
  </defs>
  <rect width="1200" height="360" rx="16" fill="#0a0a0b"/>
  <rect x="0.5" y="0.5" width="1199" height="359" rx="15.5" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="40" y="48" font-family="DejaVu Sans Mono, monospace" font-size="15" letter-spacing="3" fill="#00e676">// BUILD PIPELINE</text>
  <text x="40" y="76" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#ffffff" fill-opacity="0.45">Markdown in Git becomes a fast static site on every push.</text>

  <g font-family="DejaVu Sans, Arial, sans-serif">
    <rect x="40" y="120" width="230" height="130" rx="12" fill="#00e676" fill-opacity="0.04" stroke="#00e676" stroke-opacity="0.3"/>
    <text x="62" y="158" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#00e676">01 · WRITE</text>
    <text x="62" y="190" font-size="20" font-weight="700" fill="#ffffff">content/blog/*.mdx</text>
    <text x="62" y="218" font-size="14" fill="#ffffff" fill-opacity="0.5">Markdown + frontmatter</text>

    <rect x="330" y="120" width="230" height="130" rx="12" fill="#ffffff" fill-opacity="0.02" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="352" y="158" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#00e676">02 · BUILD</text>
    <text x="352" y="190" font-size="20" font-weight="700" fill="#ffffff">next build</text>
    <text x="352" y="218" font-size="14" fill="#ffffff" fill-opacity="0.5">MDX → HTML + RSS</text>

    <rect x="620" y="120" width="230" height="130" rx="12" fill="#ffffff" fill-opacity="0.02" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="642" y="158" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#00e676">03 · EXPORT</text>
    <text x="642" y="190" font-size="20" font-weight="700" fill="#ffffff">out/</text>
    <text x="642" y="218" font-size="14" fill="#ffffff" fill-opacity="0.5">Static HTML + assets</text>

    <rect x="910" y="120" width="230" height="130" rx="12" fill="#00e676" fill-opacity="0.04" stroke="#00e676" stroke-opacity="0.3"/>
    <text x="932" y="158" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#00e676">04 · DEPLOY</text>
    <text x="932" y="190" font-size="20" font-weight="700" fill="#ffffff">GitHub Pages</text>
    <text x="932" y="218" font-size="14" fill="#ffffff" fill-opacity="0.5">No server required</text>
  </g>

  <g stroke="#00e676" stroke-opacity="0.55" stroke-width="2" marker-end="url(#arrow)">
    <line x1="278" y1="185" x2="318" y2="185"/>
    <line x1="568" y1="185" x2="608" y2="185"/>
    <line x1="858" y1="185" x2="898" y2="185"/>
  </g>

  <text x="40" y="316" font-family="DejaVu Sans Mono, monospace" font-size="14" fill="#ffffff" fill-opacity="0.35">git push main → GitHub Actions → live site</text>
</svg>`;

const pngOptions = { compressionLevel: 9, palette: true };
await sharp(Buffer.from(postCover)).png(pngOptions).toFile(path.join(postDir, "cover.png"));
await sharp(Buffer.from(defaultCover)).png(pngOptions).toFile(path.join(root, "public", "og-default.png"));
fs.writeFileSync(path.join(postDir, "pipeline.svg"), pipelineSvg);

console.log("Generated cover.png, og-default.png, pipeline.svg");
