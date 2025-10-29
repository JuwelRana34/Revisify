import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keep this here, outside `pwa`
  experimental: {
    appDir: true, // if you use the /app directory
  },
  pwa: {
    dest: "public",          // where service worker files go
    register: true,          // auto register SW
    skipWaiting: true,       // update SW immediately
    disable: process.env.NODE_ENV === "development", // disable in dev
    // Workbox options here, e.g., 'exclude', 'runtimeCaching'
  },
};

export default withPWA(nextConfig);
