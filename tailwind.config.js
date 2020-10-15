const plugin = require('tailwindcss/plugin');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },

  experimental: {
    uniformColorPalette: true,
    extendedSpacingScale: true,
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
        // Enable some optional stylistic features for Inter.
        // Some elements do not inherit font-feature-settings in Firefox.
        'html, button, input, optgroup, select, textarea': {
          fontFeatureSettings: [
            '"ss01"', // Stylistic Set 1 "Open Digits"
            '"ss03"', // Stylistic set 3 "Lower case r curves into round neighbors"
            '"cv05"', // Character Variant 5 "Lower case l with tail"
          ].join(', '),
        },
      });
    }),
  ],
};
