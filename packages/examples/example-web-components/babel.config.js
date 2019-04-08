module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          browsers: ['last 2 versions', 'explorer >= 11']
        }
      }
    ],
    '@babel/preset-react'
  ],
  ignore: ['node_modules/**'],
  plugins: ['@babel/plugin-proposal-class-properties']
}
