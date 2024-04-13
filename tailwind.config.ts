import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        brand: "hsl(var(--brand))",
        "brand-light": "hsl(var(--brand-light))",
      },

      margin: {
        nav: "var(--nav-height)",
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
} satisfies Config;
