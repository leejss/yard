import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paprika: {
          "50": "#ffefef",
          "100": "#ffe1e1",
          "200": "#ffc7cb",
          "300": "#ff99a0",
          "400": "#ff5f6e",
          "500": "#ff2842",
          "600": "#fa042b",
          "700": "#d40024",
          "800": "#b10026",
          "900": "#950428",
          "950": "#550010",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
