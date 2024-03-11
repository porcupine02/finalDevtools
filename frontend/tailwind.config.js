/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   'darkgreen': '#3A4646',
    //   'lightgreen': '#C1CB9C',
    // },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}

