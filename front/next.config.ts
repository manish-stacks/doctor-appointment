import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doctro.saasmonks.in",
      }
    ],
  }
};

export default nextConfig;
