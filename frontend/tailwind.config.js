/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {colors: {
      'darkgreen': '#3A4646',
      'lightgreen': '#C1CB9C',
      'verylightgreen': '#E5E6E1'
    },},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}

