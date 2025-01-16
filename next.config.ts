import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        hostname: "mockofun.com"
      },
      {
        hostname: "image.tmdb.org"
      }
    ]
  },
  env: {
      adminUser: "plexAdmin",
      adminPass: "Sep12004!"
  }
};

export default nextConfig;
