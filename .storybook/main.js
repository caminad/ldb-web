module.exports = {
  stories: ['../components/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
  typescript: {
    reactDocgen: 'react-docgen',
  },
};
