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

  // Security headers (Vercel ignores public/.htaccess, so they must be set here).
  // The CSP only restricts framing, plugins, <base> and form targets; a script-src policy
  // would need per-request nonces for Next.js inline scripts.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;