/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#228B22",
          light: "#2E8B57",
          dark: "#006400",
        },
      },
    },
  },
  plugins: [],
};
