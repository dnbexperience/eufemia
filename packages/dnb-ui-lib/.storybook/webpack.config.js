/**
 * Storybook Webpack config
 *
 */

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(css|scss)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  })
  config.module.rules.push({
    test: /\/font.*\.(woff|woff2|ttf|eot|otf|svg)/,
    use: 'file-loader'
  })
  config.module.rules.push({ test: /\.(txt|md)$/, use: 'raw-loader' })

  return config
}
