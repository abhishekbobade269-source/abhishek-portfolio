import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly: a stray package-lock.json up in the
  // home directory otherwise makes Turbopack guess the wrong project root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
