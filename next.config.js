const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages
  output: "export",
  // Hosted as a PROJECT page under the roboguy-sos account:
  // https://roboguy-sos.github.io/racerluck101.github.io/
  // basePath makes routing + /_next assets resolve under the subpath.
  // In development it is empty so `npm run dev` serves from localhost:3000
  // without Next's basePath + trailingSlash root redirect loop.
  basePath: isProd ? "/racerluck101.github.io" : "",
  images: {
    unoptimized: true,
  },
  // Emit /about/index.html style routes so deep links resolve on GH Pages.
  trailingSlash: true,
  reactStrictMode: true,
  // Required for next-mdx-remote's RSC output in development, but not for the
  // production static export. Keeping it dev-only speeds up CI builds.
  transpilePackages: isProd ? [] : ["next-mdx-remote"],
};

module.exports = nextConfig;
