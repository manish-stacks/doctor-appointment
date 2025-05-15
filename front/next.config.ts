import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doctro.saasmonks.in",
      },
      {
        protocol: "https", 
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
