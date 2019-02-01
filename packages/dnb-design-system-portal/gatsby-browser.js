/**
 * Gatsby Config
 *
 */

// Load dev styles (to use hot reloading, we do have to import the styles in here)
if (process.env.NODE_ENV === 'development') {
  require('dnb-ui-lib/src/style/patterns') // import ony patterns
  require('dnb-ui-lib/src/style/components') // import ony components
  // // require('dnb-ui-lib/src/style/themes/open-banking') // import the "open-banking" theme
  require('dnb-ui-lib/src/style/themes/ui') // import the default theme
}

// UI Style production styles here to prevent loading flickering
if (process.env.NODE_ENV !== 'development') {
  require('dnb-ui-lib/style/patterns') // import ony patterns
  require('dnb-ui-lib/style') // import both all components and the default ui theme
}

const { applyPageFocus } = require('dnb-ui-lib/src/shared/tools')

exports.disableCorePrefetching = () => false

exports.onRouteUpdate = ({ prevLocation }) => {
  // if previous location is not null
  // witch means that this was an page change/switch
  //  then we apply the page content focus for accissibility
  if (prevLocation) {
    applyPageFocus('content')
  }
}
