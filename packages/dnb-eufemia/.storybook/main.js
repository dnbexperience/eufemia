module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.{js,tsx}'],
  addons: ['@storybook/preset-ie11', '@storybook/preset-scss'],
}
