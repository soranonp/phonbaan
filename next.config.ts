import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizePackageImports: ["recharts", "lucide-react", "date-fns"],
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer && config.optimization?.splitChunks) {
      const splitChunks = config.optimization.splitChunks;
      if (typeof splitChunks === "object") {
        splitChunks.cacheGroups = {
          ...(splitChunks.cacheGroups ?? {}),
          recharts: {
            test: /[\\/]node_modules[\\/](recharts|d3-.*|victory-vendor|internmap|robust-predicates|delaunator)[\\/]/,
            name: "recharts",
            chunks: "async",
            priority: 30,
            reuseExistingChunk: true,
          },
        };
      }
    }
    return config;
  },
};

export default nextConfig;
