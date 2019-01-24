/**
 * Gatsby Config
 *
 */

// UI Style
if (process.env.NODE_ENV === 'development') {
  require('dnb-ui-lib/src/style/patterns') // import ony patterns
  require('dnb-ui-lib/src/style/components') // import ony components
  // require('dnb-ui-lib/src/style/themes/open-banking') // import the "open-banking" theme
  require('dnb-ui-lib/src/style/themes/ui') // import the default theme
} else {
  // As the gatsby-plugin-postcss plugin dont processes the scss file in the package "dnb-ui-lib" - we have to use the preprocessed version
  // import both all components, patterns and the default theme
  require('dnb-ui-lib/style/patterns') // import ony patterns
  require('dnb-ui-lib/style') // import both all components and the default ui theme
}

exports.disableCorePrefetching = () => false

// makes Safari scroll to the top on route changes
exports.onRouteUpdate = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
}
exports.shouldUpdateScroll = () => {
  return false
}
