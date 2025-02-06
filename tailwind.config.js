/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0C1B',
        secondary: '#141630',
        accent: '#6C5CE7',
        success: '#00B894',
        error: '#FF6B6B',
      },
      boxShadow: {
        glow: '0 0 20px rgba(108, 92, 231, 0.2)',
      },
    },
  },
  plugins: [],
};