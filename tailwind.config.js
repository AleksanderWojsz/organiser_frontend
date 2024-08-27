/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '400px',
      md: '866px',
      lg: '966px',
      xl: '1440px'
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
