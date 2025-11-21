import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // ✅ allowedDevOrigins dipindah ke root
  allowedDevOrigins: [
    'https://flow-ai.fun',      // domain custom kamu
    'http://localhost:3000',    // lokal dev
    'http://127.0.0.1:3000',    // opsional
  ],

  // TypeScript & ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Webpack dev watch options
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['node_modules'],
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://flow-ai.fun/api',
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  },

  // Rewrites / proxy
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://flow-ai.fun/api'
    return [
      {
        source: '/api/:path*',
        destination: apiUrl.startsWith('http')
          ? `${apiUrl}/:path*`
          : `/${apiUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
