/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#2563eb',
          600: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}