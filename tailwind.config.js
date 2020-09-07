const plugin = require('tailwindcss/plugin');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },

  experimental: {
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true,
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

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        // Enable stylistic alternates for Inter on all elements.
        // Set explicitly as input elements appear not to inherit this in Firefox.
        '*, ::before, ::after': {
          fontFeatureSettings: '"salt"',
        },
      });
    }),
  ],
};
