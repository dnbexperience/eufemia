/**
 * Make it possible to load the config outside this repo package
 * This way we can reuse the config for post css
 *
 */

const getPostcssPresetEnv = async () => {
  // In Jest, use require() so jest.mock can intercept the module.
  // At runtime (babel-node), use a hidden import() so Babel's CJS
  // transform does not convert it back to require(), which would
  // fail with ERR_REQUIRE_ESM for the ESM-only v11 package.
  if (process.env.JEST_WORKER_ID) {
    const mod = require('postcss-preset-env')
    return mod.default || mod
  }

  const dynamicImport = new Function(
    'specifier',
    'return import(specifier)'
  )
  const importedModule = await dynamicImport('postcss-preset-env')

  return (
    importedModule.default?.default ||
    importedModule.default ||
    importedModule
  )
}

module.exports = async (envOptions, postCssOptions) => {
  const plugins = postCssOptions?.plugins || []
  const postcssPresetEnv = await getPostcssPresetEnv()

  return [
    // preset-env processes the most of our old legacy browsers
    postcssPresetEnv({
      stage: 2,
      browsers: ['extends @dnb/browserslist-config'].filter((i) => i),
      ...envOptions,
    }),
    ...plugins,
  ].filter((i) => i) // remove the first
}
