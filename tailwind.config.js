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
      sans: ['Inter var', 'sans-serif'],
    },

    extend: {
      colors: {
        'nre-corporate-blue': 'rgb(0, 51, 100)',
      },
    },
  },

  variants: {},

  plugins: [],
};
