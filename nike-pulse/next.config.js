/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // ✅ allowedDevOrigins is top-level (NOT experimental)
  allowedDevOrigins: [
    'http://192.168.0.117:3000',
    'http://localhost:3000'
  ],
};

module.exports = nextConfig;
