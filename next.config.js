/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve your existing standalone output
  output: 'standalone',

  // Security headers (non-breaking)
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff' 
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        }
      ]
    }]
  },

  // Explicitly expose ONLY your existing env vars
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },

  // Performance tweaks (safe)
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false
}

module.exports = nextConfig
