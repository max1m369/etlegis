/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["etlegis.ru", "images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/payload/:path*',
        destination: 'http://localhost:3001/api/payload/:path*',
      },
    ];
  },
};

export default nextConfig;
