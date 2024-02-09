/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0085FF",
        bg: "#F4F7F8",
        grey: "#6A6A6A",
      },
      keyframes: {
        scale_down: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.5)" },
        },
      },
      animation: {
        scale_down: "scale_down 1s ease-in 1",
      },
      backgroundImage: {
        "line-pattern": "url(/src/assets/img/bg.webp)",
      },
    },
  },
  plugins: [],
};
