/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Default to local development
      },
    ];
  },
  // Enable static optimization for production
  swcMinify: true,
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Configure images if needed
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig; 