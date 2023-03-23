const nativewind = require("nativewind/tailwind/css")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./components/*.tsx", "./features/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [nativewind],
};