import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add external image domains here if needed
    // domains: ["example.com"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
