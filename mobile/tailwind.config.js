/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',
        secondary: '#F3212B',
        accent: '#F3E821',
      },
    },
  },
  plugins: [],
}
