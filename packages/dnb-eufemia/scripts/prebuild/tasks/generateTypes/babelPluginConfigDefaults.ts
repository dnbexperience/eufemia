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
    'nullishCoalescingOperator',
  ],
}

export const babelPluginDefaultPlugins = [
  ['@babel/plugin-transform-class-properties', { loose: true }],
  '@babel/plugin-transform-optional-chaining',
  '@babel/plugin-transform-nullish-coalescing-operator',
]
