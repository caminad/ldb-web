const plugin = require('tailwindcss/plugin');

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

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.font-features': {
          fontFeatureSettings:
            '"tnum" var(--font-feature-tnum, off), "ss01" var(--font-feature-ss01, off)',
        },
        '.tabular-numbers': {
          '--font-feature-tnum': 'on',
        },
        '.alternate-digits': {
          '--font-feature-ss01': 'on',
        },
      });
    }),
  ],
};
