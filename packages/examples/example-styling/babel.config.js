module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          browsers: ['last 2 versions', 'explorer >= 11']
        },
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-react'
  ],
  sourceMaps: true,
  ignore: ['node_modules/**'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
