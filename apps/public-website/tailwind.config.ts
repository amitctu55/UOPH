import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f4c81",
        secondary: "#16a34a",
        surface: "#ffffff",
        muted: "#6b7280",
      },
      boxShadow: {
        card: "0 20px 25px -5px rgba(15,23,42,0.08), 0 10px 10px -5px rgba(15,23,42,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
