/**
 * Gatsby Node setup
 *
 */

const path = require('path')
const micromatch = require('micromatch')
const { slash } = require('gatsby-core-utils')
const { createThemesImport } = require('./collectThemes')

global.themeNames = []

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    themes: Joi.object().required(),
    defaultTheme: Joi.string().required(),
    filesGlob: Joi.string()
      .optional()
      .default('**/style/themes/**/*-theme-{basis,components}.min.css'),
    filesOrder: Joi.array().optional().default([
      // The file order does matter!
      '**/*-theme-extensions.*',
      '**/*-theme-components.*',
      '**/*-theme-basis.*',
    ]),
    inlineDefaultTheme: Joi.boolean().optional().default(true),
  })
}

exports.onPreBootstrap = ({ reporter, store }, pluginOptions) => {
  const state = store.getState()
  const programDirectory = state.program.directory

  // ensure to run this after the main app has run onPreInit
  createThemesImport({ reporter, programDirectory, pluginOptions })
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
      'globalThis.EUFEMIA_THEME_defaultTheme': JSON.stringify(
        pluginOptions.defaultTheme
      ),
      'globalThis.EUFEMIA_THEME_themes': JSON.stringify(
        pluginOptions.themes
      ),
    })
  )

  if (stage === 'develop' || stage === 'build-javascript') {
    const glob = path.dirname(pluginOptions.filesGlob)
    config.optimization.splitChunks.cacheGroups.styles = {
      ...config.optimization.splitChunks.cacheGroups.styles,
      name(module) {
        const context = slash(module.context)
        if (micromatch.isMatch(context, glob)) {
          const moduleName = context.match(/\/.*theme-([^/]*)$/)[1]

          if (!global.themeNames.includes(moduleName)) {
            global.themeNames.push(moduleName)
          }

          return moduleName
        }

        return 'commons'
      },
    }
  }

  actions.replaceWebpackConfig(config)
}
