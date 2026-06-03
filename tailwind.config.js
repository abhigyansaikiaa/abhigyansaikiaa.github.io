/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8A2BE2', // Neon Blue Violet
        secondary: '#00FFFF', // Cyan
        'deep-space': '#05050A',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 0.8, filter: 'drop-shadow(0 0 10px rgba(138,43,226,0.5))' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 25px rgba(138,43,226,0.9))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
