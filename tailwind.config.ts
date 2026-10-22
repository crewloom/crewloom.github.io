import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        space: {
          950: "#05070d",
          900: "#0a0e17",
          850: "#0f1523",
          800: "#161e31",
          700: "#1f2b45",
        },
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        latin: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
