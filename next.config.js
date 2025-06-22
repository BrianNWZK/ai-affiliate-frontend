/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core configuration
  output: 'standalone',
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Quantum-Safe Security Headers
  async headers() {
    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'Content-Security-Policy',
        value: `
          default-src 'self' ${process.env.NEXT_PUBLIC_API_URL};
          script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: blob:;
          connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} *.vercel.app;
          frame-src 'none';
          base-uri 'self';
          form-action 'self';
        `.replace(/\s+/g, ' ')
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      }
    ]

    return [{
      source: '/(.*)',
      headers: securityHeaders
    }]
  },

  // Quantum-Enhanced Environment Variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_QUANTUM_MODE: process.env.NEXT_PUBLIC_QUANTUM_MODE || 'false',
    NEXT_PUBLIC_AI_ASSISTANT_VERSION: '2.3.1'
  },

  // Next-Gen Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
    minimumCacheTTL: 3600,
    formats: ['image/avif', 'image/webp'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // Quantum-Ready Experimental Features
  experimental: {
    serverActions: true,
    optimizeCss: true,
    nextScriptWorkers: true,
    instrumentationHook: true,
    turbo: {
      resolveAlias: {
        '~': './src',
        '@quantum': './node_modules/@quantum/core'
      }
    },
    proxyTimeout: 30000
  },

  // Webpack Quantum Optimizations
  webpack: (config, { isServer }) => {
    // Quantum module federation
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true
    }

    // AI model optimization
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': 'preact/compat',
        'react-dom': 'preact/compat'
      }
    }

    return config
  },

  // Quantum SSR Caching
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 10
  }
}

// Conditional Quantum Mode Enhancements
if (process.env.NEXT_PUBLIC_QUANTUM_MODE === 'true') {
  nextConfig.experimental.workerThreads = true
  nextConfig.experimental.cpus = 4
  nextConfig.webpack = (config) => {
    config.plugins.push(new (require('@quantum/webpack-plugin'))())
    return config
  }
}

module.exports = nextConfig
