import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isStaticExport = process.env.NEXT_OUTPUT_EXPORT === "true";
const isStandalone = process.env.NEXT_STANDALONE === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isStaticExport && isProd ? "/azmera-job" : "");
const nestBackendUrl = process.env.NEST_BACKEND_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : isStandalone
    ? { output: "standalone" as const }
    : {}),
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  ...(!isStaticExport
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: `${nestBackendUrl}/api/:path*`,
            },
          ];
        },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
