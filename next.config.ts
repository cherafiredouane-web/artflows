import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: { unoptimized: true, formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  reactStrictMode: true
};
export default nextConfig;
