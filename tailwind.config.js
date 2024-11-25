/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff7e6',
          100: '#ffe5b4',
          200: '#ffd700',
          300: '#ffc82e',
          400: '#ffbf00',
          500: '#ffa500',
          600: '#ff8c00',
          700: '#ff7f00',
          800: '#ff6f00',
          900: '#ff5f00',
        },
      },
    },
  },
  plugins: [],
};