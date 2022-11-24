/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // sans: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
