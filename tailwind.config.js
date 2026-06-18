/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fifa: {
          navy: '#001A5C',
          navyDark: '#000D2E',
          navyLight: '#002680',
          gold: '#C9A84C',
          goldLight: '#E8C96A',
          goldDark: '#A07830',
          red: '#DC143C',
          redDark: '#A00028',
          white: '#FFFFFF',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          gray: '#F4F6FA',
          darkGray: '#1A1A2E',
        }
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #000D2E 0%, #001A5C 40%, #002680 70%, #001A5C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #A07830 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(0,26,92,0.95) 0%, rgba(0,13,46,0.98) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    },
  },
  plugins: [],
}
