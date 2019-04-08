module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          browsers: ['last 1 versions']
        },
        useBuiltIns: 'entry', // add polyfill proposal usage
        corejs: 2 // define the version we use in package.json
      }
    ],
    '@babel/preset-react'
  ],
  sourceType: 'unambiguous', // we need to set this, once we define: "useBuiltIns: 'usage'"
  ignore: ['node_modules/**'],
  plugins: ['@babel/plugin-proposal-class-properties']
}
