const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extends: {
      colors: {
        default: "#ff8833",
        highlight: {
          DEFAULT: "#00FFFF",
          bright: "#80FFFF",
          dark: "#008080",
        },
        primary: {
          light: "#dae6e9",
          DEFAULT: "#0000ff",
          dark: "#302b54",
        },
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
