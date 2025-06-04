/**
 * Make it possible to load the config outside this repo package
 * This way we can reuse the config for post css
 *
 */

module.exports = (envOptions, postCssOptions) => {
  const plugins = postCssOptions?.plugins || []
  return [
    // preset-env processes the most of our old legacy browsers
    require('postcss-preset-env')({
      stage: 2,
      browsers: ['extends @dnb/browserslist-config'].filter((i) => i),
      ...envOptions,
    }),
    ...plugins,
  ].filter((i) => i) // remove the first
}
