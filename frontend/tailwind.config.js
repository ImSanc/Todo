/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        '110':'650px',
        '90' : '500px'
      },
      fontFamily: {
        'brush-script' : ['Brush Script MT','cursive'],
      }
    },
  },
  plugins: [],
}