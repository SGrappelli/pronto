const createNextIntlPlugin = require('next-intl/plugin')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Disable in development to avoid confusing caching during dev
  disable: process.env.NODE_ENV === 'development',
  // Prevent caching Next.js internal manifests (causes build errors with App Router)
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/],
  // Offline fallback: serve /offline when a navigation request fails
  fallbacks: {
    document: '/offline',
  },
  runtimeCaching: [
    // Cache Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    // Cache static assets (JS, CSS, images)
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static',
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    // Cache Supabase API responses (stale-while-revalidate for freshness)
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'supabase-data',
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
      },
    },
  ],
})

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

// Build the list of allowed origins for Server Actions.
// Always includes localhost (dev) and trypronto.app (SaaS).
// Self-hosted: NEXT_PUBLIC_APP_URL is added automatically so server
// actions work when the app is deployed on a custom domain.
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
const appHost = appUrl ? appUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : null
const allowedOrigins = ['localhost:3000', '*.trypronto.app']
if (appHost && !allowedOrigins.includes(appHost)) {
  allowedOrigins.push(appHost)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // required for Docker multi-stage build
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
    ],
  },
  async redirects() {
    return [
      // Redirect www → non-www (301 permanent) to fix Soft 404 in Google Search Console
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.trypronto.app' }],
        destination: 'https://trypronto.app/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = withPWA(withNextIntl(nextConfig))
