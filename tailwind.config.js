/** @type {import('tailwindcss').Config} */
module.exports = {
  // 100% compatible content paths (unchanged)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Safely extended theme
  theme: {
    extend: {
      // Preserved all existing styles while adding new capabilities
      colors: {
        // Your existing color palette (matches current CSS)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6', // Primary blue
          600: '#2563eb', // Darker blue
        },
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
      // Original gradient preserved
      backgroundImage: {
        'dashboard-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        'neural-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      },
      // Your existing animations
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Original shadows preserved
      boxShadow: {
        'button': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }
    },
  },

  // Safe plugins that won't affect existing styles
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Won't affect existing form elements
    }),
    require('@tailwindcss/typography')({
      className: 'prose', // Only applies when explicitly used
    }),
  ],

  // Important safety guarantees
  corePlugins: {
    // Disable only unused core features
    float: false,     // Not used in your components
    clear: false,     // Not used in your components
    // All other core plugins remain enabled
  }
}
