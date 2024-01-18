/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground))",
        "foreground-link": "hsl(var(--foreground-link-hsl) / <alpha-value>)",
        background: "var(--background))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      height: {
        nav: "var(--nav-height)",
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
