export const babelPluginConfigDefaults = {
  configFile: false,
  sourceMaps: false,
  comments: true,
  compact: false,
  ignore: ['node_modules/**'],
  presets: [
    '@babel/preset-react',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
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
  // Note: Class properties, optional chaining, and nullish coalescing
  // are now handled by @babel/preset-env and don't need separate plugins
]
