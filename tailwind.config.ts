import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-darkerBlue", // Always include this class
    "bg-darkerBlue-30", // Always include this class
    "bg-darkBlue", // Always include this class
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(1, 57, 120)",
        secondary: "rgb(0, 19, 53)",
        grey: "rgb(194, 199, 204)",

        darkBlue: "#0C4A86", // Full opacity

        darkerBlue: "#00152D",
        "light-blue": "rgb(0, 123, 255)",
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ["responsive"],
    },
  },
  plugins: [],
};
export default config;
