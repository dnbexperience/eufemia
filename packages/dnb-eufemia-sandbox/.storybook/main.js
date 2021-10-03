module.exports = {
  stories: [
    '../stories/styles.js',
    '../stories/components/*.js',
    '../stories/elements/*.js',
    '../stories/extensions/*.js',
    '../stories/helpers/*.js',
    '../stories/helpers/*.tsx',
  ],
  addons: ['@storybook/preset-ie11', '@storybook/preset-scss'],
}
