/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ee4a73",
        secondary: "#FB6F92",
        tertiary: "#FF8FAB",
        quaternary: "#FFB3C6",
        quinary: "#FFC2D1",
        senary: "#FFE5EC",
      },
    },
  },
  plugins: [],
};
