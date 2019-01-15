/**
 * Gatsby Config
 *
 */

// UI Style
if (process.env.NODE_ENV === 'development') {
  require('dnb-ui-lib/src/style/patterns') // import ony patterns
  require('dnb-ui-lib/src/style') // import both all components and the default theme
} else {
  // As the gatsby-plugin-postcss plugin dont processes the scss file in the package "dnb-ui-lib" - we have to use the preprocessed version
  // import both all components, patterns and the default theme
  // require('dnb-ui-lib/style/lib-IE11')
  require('dnb-ui-lib/style/patterns') // import ony patterns
  require('dnb-ui-lib/style') // import both all components and the default theme
}

exports.disableCorePrefetching = () => false
