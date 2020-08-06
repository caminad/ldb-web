const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve('.');

module.exports = {
  stories: [path.resolve(rootDir, 'components/*.stories.tsx')],
  addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  webpackFinal: (config) => {
    // Implicity import react in JSX.
    config.plugins.push(new webpack.ProvidePlugin({ React: 'react' }));

    // Resolve absolute imports from project root.
    config.resolve.modules.push(rootDir);

    return config;
  },
};
