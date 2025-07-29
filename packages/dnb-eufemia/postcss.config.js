const {
  enablePortalStyleScope,
} = require('./src/plugins/postcss-isolated-style-scope/config')
const postcssIsolatePlugin = require('./src/plugins/postcss-isolated-style-scope')
const {
  getStyleScopeHash,
} = require('./src/plugins/postcss-isolated-style-scope/plugin-scope-hash.cjs')
const postcssFontUrlRewritePlugin = require('./src/plugins/postcss-font-url-rewrite')

module.exports = {
  plugins:
    /**
     * Use this to test the plugin in runtime locally when starting the portal.
     * You also need to ensure the scopeHash="eufemia-scope--portal" in the portal provider is set.
     */
    enablePortalStyleScope()
      ? [
          postcssIsolatePlugin({
            scopeHash: 'eufemia-scope--portal',
            skipClassNames: ['eufemia-scope--default'],
            replaceClassNames: {
              [getStyleScopeHash()]: 'eufemia-scope--portal',
            },
            verbose: false,
          }),
          postcssFontUrlRewritePlugin({
            basePath: 'https://eufemia.dnb.no/fonts/',
            verbose: false,
          }),
        ]
      : [],
}
