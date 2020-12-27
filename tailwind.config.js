// Used for editor autocompletion and twind configuration in _document.tsx.
module.exports = {
  purge: false,

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
};
