/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        sanjivini: {
          primary: '#2B7A0B',
          secondary: '#F0A500',
          dark: '#143601',
        }
      }
    },
  },
  plugins: [],
}
