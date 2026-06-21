/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF5EF',
        ink: '#2B2420',
        pink: {
          DEFAULT: '#F4A6B7',
          light: '#FBE3E8',
          deep: '#C76E84',
        },
        sage: {
          DEFAULT: '#9CAE91',
          light: '#E4ECDF',
          deep: '#6F8264',
        },
        brass: '#CBA66C',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease forwards',
        fadeSlow: 'fadeSlow 1.4s ease forwards',
      },
    },
  },
  plugins: [],
}
