// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Crucial for your public HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS, TS, JSX, TSX files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}