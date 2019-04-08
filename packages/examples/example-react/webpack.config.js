const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/], // intention: exclude dependencies from transpilation
        use: [
          {
            loader: 'babel-loader'
            // ,options: {
            //   rootMode: 'upward'
            // }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    sideEffects: false
  }
}
