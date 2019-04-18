/**
 * Storybook Webpack config
 *
 */

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(scss)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  })
  config.module.rules.push({ test: /\.(txt|md)$/, use: 'raw-loader' })

  return config
}
