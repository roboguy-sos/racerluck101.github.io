/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages
  output: "export",
  // Hosted as a PROJECT page under the roboguy-sos account:
  // https://roboguy-sos.github.io/racerluck101.github.io/
  // basePath makes routing + /_next assets resolve under the subpath.
  basePath: "/racerluck101.github.io",
  images: {
    unoptimized: true,
  },
  // Emit /about/index.html style routes so deep links resolve on GH Pages.
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
