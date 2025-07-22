/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#245E8A',
        secondary: '#024266',
        'custom-gray': '#F0EFF2', 
      }, 
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        slab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [

  ],
}
