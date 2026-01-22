/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A2540',
        espresso: '#4A3728',
        cream: '#F8F1E9',
        'soft-gold': '#C19A6B',
      }
    }
  },
  plugins: [],
}