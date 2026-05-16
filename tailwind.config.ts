import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071326",
        navy: "#0B1F3A",
        royal: "#114BFF",
        gold: "#FFB400",
        snow: "#F5F7FA"
      },
      boxShadow: {
        glow: "0 0 42px rgba(17, 75, 255, 0.35)",
        gold: "0 0 34px rgba(255, 180, 0, 0.28)"
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at 30% 30%, rgba(17, 75, 255, 0.36), transparent 35%)",
        "radial-gold": "radial-gradient(circle at 70% 20%, rgba(255, 180, 0, 0.24), transparent 34%)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
