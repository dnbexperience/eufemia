module.exports = {
  ignore: ['node_modules/**'],
  babelrcRoots: ['.', 'packages/*'],
  presets: [['@babel/preset-env'], ['@babel/preset-react']],
  plugins: [['@babel/plugin-proposal-class-properties']]
}
