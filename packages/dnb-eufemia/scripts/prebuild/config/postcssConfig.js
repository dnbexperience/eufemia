/**
 * Make it possible to load the config outside this repo package
 * This way we can reuse the config for post css
 *
 */

module.exports = (options) => {
  return [
    // preset-env processes the most of our old legacy browsers
    require('postcss-preset-env')({
      stage: 2,
      browsers: ['last 2 versions, > 0.2%, not dead'].filter((i) => i),
      ...options,
    }),
  ].filter((i) => i) // remove the first
}
