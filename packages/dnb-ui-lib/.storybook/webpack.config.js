/**
 * Storybook Webpack config
 *
 */

// const babelrc = {
//   babelrc: false,
//   presets: ['env', 'react'],
//   ignore: ['node_modules/**'],
//   plugins: ['transform-object-rest-spread', 'transform-class-properties']
// }

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.(css|scss)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  })
  storybookBaseConfig.module.rules.push({
    test: /\/font.*\.(woff|woff2|ttf|eot|otf|svg)/,
    loader: 'url-loader'
  })
  storybookBaseConfig.module.rules.push({
    test: /\.(txt|md)$/,
    use: 'raw-loader'
  })
  // storybookBaseConfig.module.rules.push({
  //   test: /\.(js)$/,
  //   exclude: /node_modules/,
  //   use: [
  //     {
  //       loader: 'babel-loader',
  //       options: babelrc
  //     }
  //   ]
  // })

  return storybookBaseConfig
}
