module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },

    warnOnUnsupportedTypeScriptVersion: false,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'react/react-in-jsx-scope': 'off',
  },

  overrides: [
    {
      files: '*.js',

      env: {
        node: true,
      },

      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
