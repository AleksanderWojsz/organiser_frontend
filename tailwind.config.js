/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '400px', // screen of width [sm, md) is considered sm etc.
      md: '865px',
      lg: '1100px',
      xl: '1540px',
      '2xl': '2496px',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat'],
        handwriting: ['Pacifico'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
