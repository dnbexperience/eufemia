const path = require('path')
const fs = require('fs')
const globby = require('globby')

/**
 * We want to run this in sync,
 * because we need to create a import file,
 * before Gatsby does import our app source.
 *
 * @param {object} param0 Options
 * @property {object} reporter Gatsby Reporter
 * @property {object} pluginOptions Gatsby pluginOptions
 */
function createThemesImport({ reporter, pluginOptions }) {
  const limitThemes = Object.keys(pluginOptions.themes || [])
  const packageRoot = path.dirname(require.resolve('@dnb/eufemia'))
  const selector = 'style/themes/**/dnb-theme-*.{scss,css}'
  const globbyPaths = [
    path.join(packageRoot, selector),
    path.join(packageRoot, '**', selector),
  ]

  const rawThemesFiles = globby.sync(globbyPaths)
  const hasSRC = rawThemesFiles.some((file) =>
    file.includes('/src/style/themes')
  )
  const themesFiles = rawThemesFiles.filter((file) => {
    /** Never source minified files */
    if (file.endsWith('.min.css')) {
      return false
    }

    /**
     * If a src folder with our styles exists locally/or on CI,
     * then only use e.g. this file: dnb-theme-ui.scss
     * With that, we ensure that /build can exists locally as well.
     */
    if (hasSRC) {
      return file.includes('/src/style/themes') && file.endsWith('.scss')
    }

    return file.endsWith('.css')
  })

  const themes = themesFiles
    .map((file) => {
      const themeName = (file.match(/\/dnb-theme-([^.]*)\./) || [])?.[1]
      return { file, themeName }
    })
    .filter(({ themeName }) => {
      return limitThemes.length === 0 || limitThemes.includes(themeName)
    })

  const writeThemesImports = () => {
    const imports = themes.map(({ file }) => {
      return `import '${file}'`
    })

    fs.writeFileSync(
      path.resolve(__dirname, 'load-eufemia-themes.js'),
      imports.join('\n')
    )
  }

  writeThemesImports()

  const showReports = () => {
    const themeNames = themes.reduce((acc, { themeName }) => {
      acc.push(themeName)
      return acc
    }, [])

    if (themeNames.length > 0) {
      reporter.success(`✨ Eufemia themes: ${themeNames.join(', ')}`)
    } else {
      reporter.warn('Could not find any Eufemia themes!')
    }
  }

  showReports()
}

exports.createThemesImport = createThemesImport
