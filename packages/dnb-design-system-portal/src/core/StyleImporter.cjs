const { isCI } = require('repo-utils')

function shouldUsePrebuild() {
  return (
    isCI &&
    process.env.PREBUILD_EXISTS &&
    process.env.NODE_ENV === 'production'
  )
}
module.exports.shouldUsePrebuild = shouldUsePrebuild

function importStyles() {
  /**
   * Import Eufemia Styles
   *
   * NB: Themes are imported by "gatsby-plugin-eufemia-theme-handler"
   */
  require(process.env.STYLE_IMPORT_PATH)
}
module.exports.importStyles = importStyles
