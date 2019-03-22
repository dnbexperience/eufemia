/**
 * Storybook Webpack config
 *
 */

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\/font.*\.(woff|woff2|ttf|eot|otf|svg)/,
        use: 'file-loader'
      },
      { test: /\.(txt|md)$/, use: 'raw-loader' }
    ]
  }
}
