function importStyles() {
  /**
   * Import Eufemia Styles
   *
   * NB: Themes are imported by "gatsby-plugin-eufemia-theme-handler"
   */
  require(global.STYLE_IMPORT_PATH)
}
module.exports.importStyles = importStyles
