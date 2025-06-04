/**
 * Enable or disable the scopeHash on the IsolatedStyleScope
 */
exports.enablePortalStyleScope = () => true
exports.enableBuildStyleScope = () => process.env.NODE_ENV === 'production'
