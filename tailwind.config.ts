import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    themes: {
      dark: {
        colors: {
          background: "#1C1C1C",
          foreground: "#F8FAFC",
          primary: "#3A3A3A",
          secondary: "#7F7F7F"
        }
      },
      light: {
        colors: {
          background: "#DBE2EF",
          foreground: "#DBE2EF",
          primary: {
            DEFAULT: "#3F72AF",
            foreground: "#112D4E"
          }
        }
      }
    }
  })],
} satisfies Config;
