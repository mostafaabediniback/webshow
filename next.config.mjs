import path from 'node:path';

/** @type {import('next').NextConfig} */
const config = {
  htmlLimitedBots: /.*/,
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: path.resolve(import.meta.dirname) },
  // The project root contains a separate, unrelated Vite lockfile.
  outputFileTracingRoot: path.resolve(import.meta.dirname),
  async headers() {
    return [
      { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
      { source: '/dashboard/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/user-dashboard/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/login', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};
export default config;
