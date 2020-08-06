module.exports = {
  purge: ['{components,pages}/**/*.{js,tsx}'],
  theme: {
    fontFamily: {
      casual: ['Kalam', 'cursive'],
      marker: ['Permanent Marker', 'cursive'],
      sans: ['Inter', 'sans-serif'],
    },
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    display: ['responsive', 'group-hover', 'group-focus'],
  },
  plugins: [require('@tailwindcss/typography')],
};
