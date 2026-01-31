/** @type {import('next').NextConfig} */
const withPWAInit = require('next-pwa')

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  experimental: {
    // Enable standalone output for Vercel
    standalone: true,
  },
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true
  },
  // For static builds (GitHub Pages fallback)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/habit-tracker' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/habit-tracker' : ''
}

const pwaConfig = withPWAInit({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'sw.js',
  scope: '/',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'http-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60
        }
      }
    },
    {
      urlPattern: /\.(?:js|css|html|json)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources'
      }
    }
  ]
})

module.exports = { ...nextConfig, ...pwaConfig }