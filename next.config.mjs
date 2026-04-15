import path from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-router-dom': path.resolve('./src/utils/reactRouterCompat.js'),
    }
    return config
  },
}

export default nextConfig
