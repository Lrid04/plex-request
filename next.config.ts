import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.mockofun.com", "image.tmdb.org"]
  },
  env: {
      adminUser: "plexAdmin",
      adminPass: "Sep12004!"
  }
};

export default nextConfig;
