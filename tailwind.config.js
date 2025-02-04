/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary:["Montserrat","sans-serif"],
        secondary:["Inter","sans-serif"],
        third:["Petit Formal Script","sans-serif"],
      },
    },
  },
  plugins: [],
}

