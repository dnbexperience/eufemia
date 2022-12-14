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
      browsers: ['last 2 versions', 'not ie > 0', 'not ie_mob > 0'].filter(
        (i) => i
      ),
      ...options,
    }),
  ].filter((i) => i) // remove the first
}
