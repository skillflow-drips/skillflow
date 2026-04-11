import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  'hsl(238, 100%, 97%)',
          100: 'hsl(238, 100%, 94%)',
          200: 'hsl(238, 96%, 87%)',
          300: 'hsl(238, 94%, 78%)',
          400: 'hsl(238, 90%, 68%)',
          500: 'hsl(238, 83%, 57%)',
          600: 'hsl(238, 76%, 48%)',
          700: 'hsl(238, 72%, 40%)',
          800: 'hsl(238, 64%, 32%)',
          900: 'hsl(238, 56%, 26%)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
