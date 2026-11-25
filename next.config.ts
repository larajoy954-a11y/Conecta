import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "172.20.10.5",
    "*.devtunnels.ms",
    "*.app.github.dev",
  ],
};

export default nextConfig;
