import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ✅ 已删除 swcMinify (Next.js 13+ 默认开启，Next.js 15+ 已移除该 Key)
  
  transpilePackages: ["@deeprubric/ui"],
  
  experimental: {
    // ✅ 已删除 appDir (Next.js 13.4+ 已经是稳定版，配置此项会导致报错)
  },

  // ✅ 如果不需要特定配置，建议留空或删除 turbopack 对象
  // turbopack: {},

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },

  async rewrites() {
    return [
      {
        // 这里的配置很棒，可以解决跨域问题
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:8000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;