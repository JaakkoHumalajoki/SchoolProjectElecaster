const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "520px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
