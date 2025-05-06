import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io"
      }, {
        protocol: "https",
        hostname: "zmzqx3lw0v.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
