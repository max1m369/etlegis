/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'etlegis.ru' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
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
