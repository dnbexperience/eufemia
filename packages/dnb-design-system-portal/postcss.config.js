const {
  enablePortalStyleScope,
  enableBuildStyleScope,
} = require('@dnb/eufemia/src/plugins/postcss-isolated-style-scope/config')
const postcssIsolatePlugin = require('@dnb/eufemia/src/plugins/postcss-isolated-style-scope')
const {
  getStyleScopeHash,
} = require('@dnb/eufemia/src/plugins/postcss-isolated-style-scope/plugin-scope-hash.cjs')

module.exports = {
  plugins: [
    /**
     * We also need to process the SASS modules from the portal.
     * Because in "gatsby-config" we import the isolated files: *--isolated.min.css
     */
    enableBuildStyleScope() || enablePortalStyleScope()
      ? postcssIsolatePlugin({
          scopeHash: 'eufemia-scope--portal',
          skipClassNames: ['eufemia-scope--default'],
          replaceClassNames: {
            [getStyleScopeHash()]: 'eufemia-scope--portal',
          },
          verbose: false,
        })
      : undefined,
  ],
}
