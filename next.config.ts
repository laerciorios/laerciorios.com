import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  turbopack: {
    // Explicitly set the workspace root to this project directory so Next.js doesn't
    // get confused by lockfiles in parent directories (e.g. a bun.lock at ~/bun.lock).
    root: __dirname,
  },
};

export default withNextIntl(nextConfig);
