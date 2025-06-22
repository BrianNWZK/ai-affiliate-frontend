/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Quantum Configuration
  output: 'standalone',
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Quantum Security Headers with AI Protection
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
          default-src 'self' ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_QUANTUM_GATEWAY};
          script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'quantum-ai';
          style-src 'self' 'unsafe-inline' 'quantum-styles';
          img-src 'self' data: blob: https://*.quantum-cdn.com;
          connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} *.vercel.app wss://*.quantum-network.com;
          frame-src 'none';
          base-uri 'self';
          form-action 'self';
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

  // Quantum Environment Variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_QUANTUM_MODE: process.env.NEXT_PUBLIC_QUANTUM_MODE || 'false',
    NEXT_PUBLIC_AI_ASSISTANT_VERSION: '2.4.0',
    NEXT_PUBLIC_QUANTUM_GATEWAY: process.env.NEXT_PUBLIC_QUANTUM_GATEWAY,
    NEXT_PUBLIC_WEB_MONETIZATION_POINTER: process.env.NEXT_PUBLIC_WEB_MONETIZATION_POINTER
  },

  // Quantum Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 3600,
    formats: ['image/avif', 'image/webp', 'image/quantum'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    quantumCompression: true
  },

  // Quantum Experimental Features
  experimental: {
    serverActions: {
      allowedOrigins: [
        process.env.NEXT_PUBLIC_API_URL,
        '*.quantum-ai.vercel.app'
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
        '@ai': './node_modules/@ai'
      },
      quantumOptimization: true
    },
    proxyTimeout: 30000,
    quantumRouting: true,
    neuralCache: true
  },

  // Quantum Webpack Configuration
  webpack: (config, { isServer, dev }) => {
    // Quantum Module Federation
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
      quantumSplitting: true
    };

    // AI Model Optimization
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        'quantum-runtime': '@quantum/core/dist/web'
      };
    }

    // Quantum Production Optimizations
    if (!dev) {
      config.plugins.push(
        new (require('@quantum/webpack-plugin').QuantumWebpackPlugin)({
          entanglement: true,
          neuralCompression: true
        })
      );
    }

    return config;
  },

  // Quantum SSR Caching
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 10,
    quantumCache: true
  },

  // Quantum Deployment Optimization
  generateBuildId: async () => {
    return process.env.VERCEL_GIT_COMMIT_SHA || 
           `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Quantum Mode Specific Enhancements
if (process.env.NEXT_PUBLIC_QUANTUM_MODE === 'true') {
  // Enable Quantum Worker Threads
  nextConfig.experimental.workerThreads = {
    count: 4,
    quantumBoost: true
  };

  // Enable Quantum CPU Optimization
  nextConfig.experimental.cpus = {
    max: 4,
    min: 2,
    quantumAllocation: true
  };

  // Enhanced Quantum Webpack Config
  nextConfig.webpack = (config) => {
    config.plugins.push(
      new (require('@quantum/webpack-plugin').QuantumWebpackPlugin)({
        entanglement: true,
        neuralCompression: true,
        quantumMinification: true
      }),
      new (require('@ai/webpack-plugin').NeuralOptimizerPlugin)()
    );

    // Quantum Code Splitting
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      chunks: 'all',
      maxSize: 244 * 1024, // 244KB chunks
      minSize: 20 * 1024, // 20KB minimum
      quantumOptimized: true
    };

    return config;
  };

  // Quantum-Specific Image Optimization
  nextConfig.images.quantumCompression = {
    enabled: true,
    quality: 80,
    neuralEnhancement: true
  };
}

// Export the Quantum-Optimized Config
module.exports = nextConfig;
