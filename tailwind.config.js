/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        'navy': {
          100: '#657AAA',
          200: '#4E5F8A',
          300: '#37456A',
          400: '#212A4A',
          500: '#0A0F2A',
          600: '#000000',
          700: '#C7DAFD',          
        },
        'cream': {
          100: '#FBF5F1',
          200: '#F7ECE4',
          300: '#F3E2D7',
          400: '#EFD9CA',
          500: '#EAD0BD',
          600: '#E6C7B0',
          700: '#E2BEA3',
          800: '#DEB596',
          900: '#DAAE8A'
        },
        'text-navy': {
          100: '#2F4F72',
          200: '#1F3A54',
          300: '#0F2636',
          400: '#001219',
          500: '#486CC9',
        },
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
// https://github.com/tailwindlabs/tailwindcss-forms