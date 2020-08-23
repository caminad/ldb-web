module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },

  experimental: {
    uniformColorPalette: true,
  },

  purge: ['{components,pages}/**/*.{js,tsx}'],

  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },

    extend: {
      colors: {
        'nre-corporate-blue': 'rgb(0, 51, 100)',
      },
    },
  },

  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    display: ['responsive', 'group-hover', 'group-focus'],
  },

  plugins: [],
};
