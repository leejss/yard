import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "GeistSans, sans-serif",
        mono: "GeistMono, monospace",
      },
      spacing: {
        nav_height: "var(--nav-height)",
      },

      colors: {
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
