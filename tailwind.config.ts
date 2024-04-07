import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "GeistSans, sans-serif",
        mono: "GeistMono, monospace",
      },
    },
  },
  plugins: [],
} satisfies Config;
