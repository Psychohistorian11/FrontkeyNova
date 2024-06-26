/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "skinColor": "#fff6ed",
        "firstColor" : "#0E9594",
        "secondColor": "#F2542D",
        "warningColor" : "#562C2C",
        "bluecolor" : "#6EBDD1"

      },
      fontFamily: {
        "montserrat" : ['Montserrat' , 'sans-serif'],
        "poppins" : ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'blueprint1': "url('/src/Assets/fondo1.jpg')"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

