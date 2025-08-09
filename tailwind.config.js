/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#14532d",
        "forest-light": "#e3f4e0",
      },
    },
  },
  plugins: [],
};
