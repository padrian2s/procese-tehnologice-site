import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : 'standalone',
  trailingSlash: isStaticExport,
  basePath: isGitHubPages ? '/procese-tehnologice-site' : '',
  assetPrefix: isGitHubPages ? '/procese-tehnologice-site/' : '',
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
