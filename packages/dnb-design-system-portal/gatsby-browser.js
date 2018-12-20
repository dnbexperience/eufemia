/**
 * Gatsby Config
 *
 */

// UI Style
require('dnb-ui-lib/src/style/patterns') // import ony patterns
require('dnb-ui-lib/src/style') // import both all components and the default theme

exports.disableCorePrefetching = () => false
