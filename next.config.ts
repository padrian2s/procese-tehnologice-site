import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : 'standalone',
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
