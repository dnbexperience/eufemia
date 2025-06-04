const {
  enablePortalStyleScope,
} = require('./src/style/postcss-plugin/style-scope/config')
const postcssIsolatePlugin = require('./src/style/postcss-plugin/style-scope')
const { getStyleScopeHash } = postcssIsolatePlugin

module.exports = {
  plugins: [
    /**
     * Use this to test the plugin in runtime locally when starting the portal.
     * You also need to ensure the scopeHash="eufemia-portal-scope" in the portal provider is set.
     */
    enablePortalStyleScope()
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
