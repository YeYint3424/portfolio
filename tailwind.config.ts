import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
      colors: {
        frost: "#e0f2fe",
        ice: "#bae6fd",
        sky: "#38bdf8",
        azure: "#0ea5e9",
        deep: "#0369a1",
        abyss: "#082f49",
        midnight: "#061827",
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        rotateBorder: "rotateBorder 5s linear infinite",
        fadeDown: "fadeDown 0.7s ease both",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        rotateBorder: {
          to: { transform: "rotate(360deg)" },
        },
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
