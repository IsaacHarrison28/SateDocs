import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: [
          '"Plus Jakarta Sans"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },

        navy: {
          DEFAULT: "#0a2540",
          900: "#061a30",
          800: "#0a2540",
          700: "#123a5c",
        },

        electric: {
          DEFAULT: "#0b6bf2",
          600: "#0b6bf2",
          700: "#0954c4",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
