import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the project-owned agent instructions unchanged during development.
  agentRules: false,
  experimental: {
    agentFeedback: false,
  },
  async redirects() {
    return [{ source: "/favicon.ico", destination: "/icon.svg", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // Preserve Next.js native CSS Module scoping for page-specific styles.
        condition: { not: { path: "*.module.css" } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
