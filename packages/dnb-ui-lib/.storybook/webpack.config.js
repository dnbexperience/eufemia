/**
 * Storybook Webpack config
 *
 */

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

  // We used to define the loaders for *.js here
  // const babelrc = {
  //   babelrc: false,
  //   presets: ['@babel/preset-env', '@babel/preset-react'],
  //   ignore: ['node_modules/**'],
  //   plugins: [
  //     'emotion',
  //     '@babel/plugin-proposal-object-rest-spread',
  //     '@babel/plugin-proposal-class-properties'
  //   ]
  // }
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
