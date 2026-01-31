import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0070f3",
          secondary: "#19fb9b",
        }
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
};

export default config;
