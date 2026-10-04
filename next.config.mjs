/** @type {import('next').NextConfig} */
const isStaticExport = process.env.OUTPUT_EXPORT === 'true' || process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : (isStaticExport ? '/etlegis' : '');

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: isStaticExport ? 'export' : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: isStaticExport ? true : false,
  images: {
    unoptimized: isStaticExport ? true : false,
    remotePatterns: [
      { protocol: 'https', hostname: 'etlegis.ru' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
