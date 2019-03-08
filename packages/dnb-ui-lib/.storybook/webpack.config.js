/**
 * Storybook Webpack config
 *
 */

module.exports = {
  output: {
    publicPath: '/x'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.(txt|md)$/, use: 'raw-loader' }
    ]
  }
}
