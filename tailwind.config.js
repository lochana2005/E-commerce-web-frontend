/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush-pink': '#fce7f3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}