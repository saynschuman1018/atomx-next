const path = require('path')

module.exports = {
  addons: [
    '@storybook/addon-a11y',
    'storybook-formik/register',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    'storybook-addon-next-router',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
           modules: true,
        }
      }
    },
  ],
  stories: [
    "../src/**/*.stories.tsx",
    "../src/**/*.stories.ts",
  ],
  babel: async (options) => ({
    ...options,
    // TODO: Workaround for Storybook issue https://github.com/storybookjs/storybook/issues/12019
    plugins: options.plugins.filter(path => path !== require.resolve('@babel/plugin-transform-classes')),
  }),
  typescript: {
    reactDocgen: 'react-docgen',
  },
}
