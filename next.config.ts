import type { NextConfig } from "next";

// GitHub Pages serves this project from /eclipse-racing, so the deploy workflow sets
// PAGES_BASE_PATH. Locally, on Vercel and on the custom domain it stays empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages. Remove this when moving to Vercel with accounts.
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
