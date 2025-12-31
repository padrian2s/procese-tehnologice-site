import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const hasCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

// Custom domain = no basePath needed (served from root)
// GitHub Pages without custom domain = needs basePath
const useBasePath = isGitHubPages && !hasCustomDomain;

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : 'standalone',
  trailingSlash: isStaticExport,
  basePath: useBasePath ? '/procese-tehnologice-site' : '',
  assetPrefix: useBasePath ? '/procese-tehnologice-site/' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
