/**
 * Gatsby Node setup
 *
 */

const { createThemesImport } = require('./collectThemes')

global.themeNames = []

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    themes: Joi.object().required(),
    defaultTheme: Joi.string().required(),
  })
}

exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  // ensure to run this after the main app has run onPreInit
  createThemesImport({ reporter, pluginOptions })
}

exports.onPostBuild = ({ reporter }) => {
  if (global.themeNames.length > 0) {
    reporter.success(
      `Eufemia themes successfully extracted: ${global.themeNames.join(
        ', '
      )}`
    )
  } else {
    reporter.warn('No Eufemia themes found!')
  }
}

exports.onCreateWebpackConfig = (
  { stage, actions, plugins, getConfig },
  pluginOptions
) => {
  const config = getConfig()

  config.plugins.push(
    plugins.define({
      'process.env.EUFEMIA_THEME_defaultTheme': JSON.stringify(
        pluginOptions.defaultTheme
      ),
      'process.env.EUFEMIA_THEME_themes': JSON.stringify(
        pluginOptions.themes
      ),
    })
  )

  if (stage === 'develop' || stage === 'build-javascript') {
    config.optimization.splitChunks.cacheGroups.styles = {
      ...config.optimization.splitChunks.cacheGroups.styles,
      name(module) {
        if (module.context.includes('/style/themes')) {
          const match = module.context.match(/\/([^/]*)$/)
          const moduleName = match[1].replace('theme-', '')

          global.themeNames.push(moduleName)

          return moduleName
        }

        return 'commons'
      },
    }
  }

  actions.replaceWebpackConfig(config)
}
