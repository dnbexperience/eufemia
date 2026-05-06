const {
  requireConfigTimeEufemiaModule,
} = require('./vite/shared/eufemia-prebuild-paths.cjs')

const { enablePortalStyleScope, enableBuildStyleScope } =
  requireConfigTimeEufemiaModule(
    '@dnb/eufemia/src/plugins/postcss-isolated-style-scope/config'
  )
const postcssIsolatePlugin = requireConfigTimeEufemiaModule(
  '@dnb/eufemia/src/plugins/postcss-isolated-style-scope'
)
const { getStyleScopeHash } = requireConfigTimeEufemiaModule(
  '@dnb/eufemia/src/plugins/postcss-isolated-style-scope/plugin-scope-hash.cjs'
)
const postcssFontUrlRewritePlugin = requireConfigTimeEufemiaModule(
  '@dnb/eufemia/src/plugins/postcss-font-url-rewrite'
)
const postcssThemeScopePlugin = require('./postcss-eufemia-theme-scope.cjs')

module.exports = {
  plugins:
    /**
     * We also need to process the SASS modules from the portal.
     * The portal imports isolated style files: *--isolated.min.css
     */
    enableBuildStyleScope() || enablePortalStyleScope()
      ? [
          postcssIsolatePlugin({
            scopeHash: 'eufemia-scope--portal',
            skipClassNames: ['eufemia-scope--default'],
            replaceClassNames: {
              [getStyleScopeHash()]: 'eufemia-scope--portal',
            },
            verbose: false,
          }),
          postcssThemeScopePlugin(),
          postcssFontUrlRewritePlugin({
            basePath: 'https://eufemia.dnb.no/fonts/',
            verbose: false,
          }),
        ]
      : [],
}
