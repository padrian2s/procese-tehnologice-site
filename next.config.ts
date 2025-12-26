import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : 'standalone',
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
