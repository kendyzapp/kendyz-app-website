/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['loremflickr.com'],
    },
    experimental: {
        typedRoutes: true,
        serverActions: true,
    },
};

module.exports = nextConfig;