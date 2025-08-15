/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi', 'Inter', 'sans-serif'],
        'sans': ['Satoshi', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 