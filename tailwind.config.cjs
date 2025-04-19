/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,md,mdx,ts}"],
  theme: {
    extend: {
      colors: {
        white: "#f8f9fa",
      },
      fontFamily: {
        body: [
          "Goudy Bookletter 1911",
          "Georgia",
          "Times",
          "serif",
          ...defaultTheme.fontFamily.serif,
        ],
      },
      gridTemplateColumns: {
        list: "repeat(auto-fill, minmax(400px, max-content))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
