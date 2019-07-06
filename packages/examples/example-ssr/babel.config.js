module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          browsers: ['last 1 versions']
        },
        useBuiltIns: 'usage',
        corejs: 2
      }
    ],
    '@babel/preset-react'
  ],
  sourceType: 'unambiguous', // we need to set this, once we define: "useBuiltIns: 'usage'"
  ignore: ['node_modules/**'],
  plugins: ['@babel/plugin-proposal-class-properties']
}
