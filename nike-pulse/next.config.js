/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    unoptimized: true  // Required for static export + Netlify
  },
  output: 'export',  // STATIC HTML - no SSR issues
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove dev-only settings
};

module.exports = nextConfig;
