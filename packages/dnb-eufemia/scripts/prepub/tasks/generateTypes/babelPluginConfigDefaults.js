export const babelPluginConfigDefaults = {
  configFile: false,
  sourceMaps: false,
  comments: true,
  compact: false,
  ignore: ['node_modules/**'],
  presets: ['@babel/preset-react'],
}

export const babylonConfigDefaults = {
  sourceType: 'module',
  allowReturnOutsideFunction: true,
  allowImportExportEverywhere: true,
  allowSuperOutsideMethod: true,
  plugins: [
    'jsx',
    'asyncFunctions',
    'objectRestSpread',
    'classProperties',
  ],
}

export const babelPluginDefaultPlugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-optional-chaining',
]
