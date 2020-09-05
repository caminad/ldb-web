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

  corePlugins: {
    fontVariantNumeric: false,
  },

  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        // Enable stylistic alternates for Inter on all elements.
        // Set explicitly as input elements appear not to inherit this in Firefox.
        '*, ::before, ::after': {
          fontFeatureSettings: '"salt"',
        },
      });

      addUtilities({
        // Uses a simpler implementation than https://github.com/tailwindlabs/tailwindcss/pull/2305
        // as the void variables in that implementation get purged as of v1.8.2.
        '.tabular-nums': {
          fontVariantNumeric: 'tabular-nums',
        },
      });
    }),
  ],
};
