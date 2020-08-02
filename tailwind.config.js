module.exports = {
  purge: ['{components,pages}/**/*.{js,tsx}'],
  theme: {
    fontFamily: {
      casual: ['Kalam', 'cursive'],
      marker: ['Permanent Marker', 'cursive'],
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
