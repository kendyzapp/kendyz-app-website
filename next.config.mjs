// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "cloudflare-ipfs.com",
      "avatars.githubusercontent.com",
    ],
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
};

export default withPlaiceholder(nextConfig);
