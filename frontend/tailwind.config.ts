import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shebuilds: {
          violet: "#8B5CF6",
          teal: "#14B8A6",
          pink: "#EC4899",
        },
      },
    },
  },
  plugins: [],
};
export default config;