module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },
  optimization: {
    usedExports: true,
    minimize: true,
    sideEffects: false
  }
}
