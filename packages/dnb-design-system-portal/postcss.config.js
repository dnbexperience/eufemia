const {
  enablePortalStyleScope,
  enableBuildStyleScope,
} = require('@dnb/eufemia/src/style/postcss-plugin/style-scope/config')
const postcssIsolatePlugin = require('@dnb/eufemia/src/style/postcss-plugin/style-scope')
const { getStyleScopeHash } = postcssIsolatePlugin

module.exports = {
  plugins: [
    /**
     * We also need to process the SASS modules from the portal.
     * Because in "gatsby-config" we import the isolated files: *--isolated.min.css
     */
    enableBuildStyleScope() || enablePortalStyleScope()
      ? postcssIsolatePlugin({
          scopeHash: 'eufemia-portal-scope',
          skipClassNames: ['eufemia-default-scope'],
          replaceClassNames: {
            [getStyleScopeHash()]: 'eufemia-portal-scope',
          },
          verbose: false,
        })
      : undefined,
  ],
}
