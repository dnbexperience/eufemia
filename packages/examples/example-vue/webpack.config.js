const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'development',
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader'
                  }
                ],
                js: [
                  {
                    loader: 'babel-loader',
                    options: {
                      rootMode: 'upward'
                    }
                  }
                ]
              },
              cacheBusting: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: file => !/\.vue\.js/.test(file),
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward'
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
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
