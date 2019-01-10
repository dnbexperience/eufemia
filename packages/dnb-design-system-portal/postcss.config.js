/**
 * PostCSS Plugin config
 *
 */

const postCssPlugins = require('../dnb-ui-lib/scripts/prepub/config/postcssConfig')

module.exports = () => ({
  plugins: postCssPlugins({ IE11: true })
})
