import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customDark: "#0F141E",
        customWhite: "#F3F4F6",
        customBorder: "#d7d5db",
        customsunny: "#777CCE",
      },
    },
  },
  plugins: [],
} satisfies Config;
