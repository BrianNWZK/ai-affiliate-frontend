/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Quantum Configuration
  output: 'standalone',
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Quantum Security Headers with Paystack Integration
  async headers() {
    const quantumSecurityHeaders = [
      {
        key: 'X-Quantum-Shield',
        value: 'active; mode=block'
      },
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
          default-src 'self' ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_QUANTUM_GATEWAY} https://api.paystack.co;
          script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'quantum-ai' https://js.paystack.co;
          style-src 'self' 'unsafe-inline' 'quantum-styles';
          img-src 'self' data: blob: https://*.quantum-cdn.com https://*.paystack.com;
          connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} *.vercel.app wss://*.quantum-network.com https://api.paystack.co;
          frame-src 'none' https://js.paystack.co;
          base-uri 'self';
          form-action 'self' https://api.paystack.co;
          require-trusted-types-for 'script';
        `.replace(/\n\s+/g, ' ')
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
      {
        key: 'X-Quantum-AI',
        value: 'active; version=2.4.0'
      }
    ];

    return [{
      source: '/(.*)',
      headers: quantumSecurityHeaders
    }];
  },

  // Quantum + Paystack Environment Variables
  env: {
    // Core Quantum
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_QUANTUM_MODE: process.env.NEXT_PUBLIC_QUANTUM_MODE || 'false',
    NEXT_PUBLIC_AI_ASSISTANT_VERSION: '2.4.0',
    NEXT_PUBLIC_QUANTUM_GATEWAY: process.env.NEXT_PUBLIC_QUANTUM_GATEWAY,
    
    // Paystack Integration
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    PAYSTACK_API_URL: 'https://api.paystack.co',
    PAYSTACK_WEBHOOK_SECRET: process.env.PAYSTACK_WEBHOOK_SECRET,
    
    // Revenue Sync
    REVENUE_SYNC_INTERVAL: process.env.REVENUE_SYNC_INTERVAL || '3600',
    REVENUE_WEBHOOK_PATH: '/api/revenue/webhooks/paystack'
  },

  // Image Optimization with Paystack CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.paystack.com',
      }
    ],
    minimumCacheTTL: 3600,
    formats: ['image/avif', 'image/webp', 'image/quantum'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    quantumCompression: true
  },

  // API Route Rewrites for Paystack
  async rewrites() {
    return [
      {
        source: '/paystack-api/:path*',
        destination: 'https://api.paystack.co/:path*'
      },
      {
        source: '/api/revenue/webhooks/paystack',
        destination: '/api/webhooks/paystack'
      }
    ];
  },

  // Quantum Experimental Features
  experimental: {
    serverActions: {
      allowedOrigins: [
        process.env.NEXT_PUBLIC_API_URL,
        '*.quantum-ai.vercel.app',
        'https://api.paystack.co'
      ],
      quantumEncryption: true
    },
    optimizeCss: {
      quantumMinify: true
    },
    nextScriptWorkers: {
      quantumThreads: 4
    },
    instrumentationHook: true,
    turbo: {
      resolveAlias: {
        '~': './src',
        '@quantum': './node_modules/@quantum/core',
        '@ai': './node_modules/@ai',
        '@paystack': './node_modules/@paystack'
      },
      quantumOptimization: true
    },
    proxyTimeout: 30000,
    quantumRouting: true,
    neuralCache: true
  },

  // Webpack Configuration with Paystack
  webpack: (config, { isServer, dev }) => {
    // Quantum Module Federation
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
      quantumSplitting: true
    };

    // AI Model + Paystack Optimization
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        'quantum-runtime': '@quantum/core/dist/web',
        'paystack-js': '@paystack/inline-js/dist/paystack.min.js'
      };
    }

    // Quantum Production Optimizations
    if (!dev) {
      config.plugins.push(
        new (require('@quantum/webpack-plugin').QuantumWebpackPlugin)({
          entanglement: true,
          neuralCompression: true,
          paystackIntegration: true
        })
      );
    }

    return config;
  },

  // Paystack Webhook Configuration
  serverRuntimeConfig: {
    paystack: {
      secretKey: process.env.PAYSTACK_SECRET_KEY,
      webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET,
      verificationEndpoint: '/api/transactions/verify'
    }
  }
};

// Quantum Mode Specific Enhancements
if (process.env.NEXT_PUBLIC_QUANTUM_MODE === 'true') {
  // Enable Quantum Worker Threads
  nextConfig.experimental.workerThreads = {
    count: 4,
    quantumBoost: true
  };

  // Enhanced Quantum Webpack Config with Paystack
  nextConfig.webpack = (config) => {
    config.plugins.push(
      new (require('@quantum/webpack-plugin').QuantumWebpackPlugin)({
        entanglement: true,
        neuralCompression: true,
        quantumMinification: true,
        paystackOptimization: true
      }),
      new (require('@ai/webpack-plugin').NeuralOptimizerPlugin)(),
      new (require('@paystack/webpack-plugin').PaystackOptimizerPlugin)()
    );

    // Quantum Code Splitting
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      chunks: 'all',
      maxSize: 244 * 1024,
      minSize: 20 * 1024,
      quantumOptimized: true,
      paystackChunks: true
    };

    return config;
  };
}

module.exports = nextConfig;
