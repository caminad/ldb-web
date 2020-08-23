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
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        '*, ::before, ::after': {
          fontFeatureSettings:
            '"tnum" var(--font-feature-tnum, off), "salt" var(--font-feature-salt, off)',
        },
      });

      addUtilities({
        '.tabular-numbers': {
          '--font-feature-tnum': 'on',
        },
        '.stylistic-alternates': {
          '--font-feature-salt': 'on',
        },
      });
    }),
  ],
};
