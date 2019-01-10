/**
 * Make it possible to load the config outside this repo package
 * This way we can reuse the config for post css
 *
 */

module.exports = function({ IE11 = false } = {}) {
  const config = [
    require('postcss-preset-env')({ stage: 0 }),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'explorer >= 11']
    })
  ]

  if (IE11) {
    config.unshift(
      require('postcss-calc')(),
      require('postcss-custom-properties')()
    )
  }

  return config
}
