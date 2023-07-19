/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      serverActions: true,
   },
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
        },
      ],
    },
}

module.exports = nextConfig
