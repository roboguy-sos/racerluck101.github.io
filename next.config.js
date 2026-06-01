/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages
  output: "export",
  // racerluck101.github.io is a USER page → served from the domain root,
  // so no basePath / assetPrefix is required.
  images: {
    unoptimized: true,
  },
  // Emit /about/index.html style routes so deep links resolve on GH Pages.
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
