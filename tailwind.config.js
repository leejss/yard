const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground-hsl) / <alpha-value>)",
        background: "hsl(var(--background-hsl) / <alpha-value>)",
        foregroundLink: "hsl(var(--foreground-link-hsl) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
