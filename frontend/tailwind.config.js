/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#C45E0A",
        gold: "#F4A030",
        maroon: "#7B1818",
        cream: "#FFFAF5",
        saffronpale: "#FEF7F0",
        darkink: "#1A0A04",
        agedgold: "#A07850",
        border: "#E8D5C0",
        darkbrown: "#5A2A00",
        deepbrown: "#2A1A0A",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        cinzel: ["Cinzel", "serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
}