/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fifa-navy': '#0a0a2e',
        'fifa-blue': '#1a1a6e',
        'fifa-red': '#c41230',
        'fifa-gold': '#c9a84c',
        'fifa-gold-light': '#e8c96d',
        'fifa-dark': '#06061a',
        'fifa-card': '#0f0f3a',
        'fifa-border': '#2a2a6a',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 8px #c9a84c' },
          '50%': { boxShadow: '0 0 24px #c9a84c, 0 0 48px #c9a84c55' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c)',
        'gradient-hero': 'linear-gradient(135deg, #06061a 0%, #0a0a2e 40%, #1a0a2e 70%, #06061a 100%)',
      },
    },
  },
  plugins: [],
}
