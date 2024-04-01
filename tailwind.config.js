const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: "my-",
  // separator: "-",
  // important: "#container",
  darkMode: "class",
  content: ["./src/*.{html,js}", "./public/index.html"],
  corePlugins: {
    preflight: false,
    accentColor: false
  },
  theme: {
    // spacing: {
    //   thin: "2px",
    //   thick: "8px",
    // },
    // colors: {},
    // screens: {},

    extend: {
      fontSize: {
        normal: "14px",
        small: "12px",
        large: "24px",
      },
      spacing: {
        thin: "2px",
        thick: "8px",
        30: "7.5rem",
        15: "3.75rem",
        standard: "1.25rem",
      },
      screens: {
        sm: "768px",
        md: "1092px",
        lg: "1280px",
        xl: "1920px",
        "2xl": "2560px",
        huge: "4000px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  presets: [
    require("./src/bechdel.theme")
  ],
};
