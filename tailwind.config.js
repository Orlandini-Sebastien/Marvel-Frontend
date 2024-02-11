/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'red-marvel' : '#ED1D24',
        
        },
        cursor: {
        
          'fancy': 'url(./src/assets/Captain_America_Shield.svg.png), pointer',
        },
        
    },
  },
  plugins: [

  ],
}

