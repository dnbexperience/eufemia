const path = require('path')
const fs = require('fs')
const globby = require('globby')

function createThemesImport(pluginOptions) {
  const limitThemes = Object.keys(pluginOptions.themes || [])
  const packageRoot = path.dirname(require.resolve('@dnb/eufemia'))
  const selector = 'style/themes/**/dnb-theme-*.{scss,css}'
  const themesFiles = globby
    .sync([
      path.join(packageRoot, selector),
      path.join(packageRoot, '**/' + selector),
    ])
    .filter((file) => {
      return !file.includes('/build/style/')
    })
  const themes = themesFiles
    .map((file) => {
      const themeName = (file.match(/\/dnb-theme-([^.]*)\./) || [])?.[1]
      return themeName
    })
    .filter((themeName) => {
      return limitThemes.length === 0 || limitThemes.includes(themeName)
    })
  const srcAddition = globalThis.eufemiaThemeImportAddition
    ? globalThis.eufemiaThemeImportAddition
    : themesFiles.some((file) => file.includes('/src/'))
    ? 'src/'
    : ''

  const imports = themes.map((themeName) => {
    return `import '@dnb/eufemia/${srcAddition}style/themes/${themeName}'`
  })

  fs.writeFileSync(
    path.resolve(__dirname, 'load-eufemia-themes.js'),
    imports.join('\n')
  )

  return themes
}

function defineSrcAddition(srcAddition) {
  globalThis.eufemiaThemeImportAddition = srcAddition
}

exports.defineSrcAddition = defineSrcAddition
exports.createThemesImport = createThemesImport
