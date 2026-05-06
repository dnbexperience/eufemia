/**
 * Vite configuration for the Eufemia documentation portal.
 *
 * See vite/README.md for architecture details and plugin documentation.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'
import rawLoaderCompatPlugin from './vite/client/plugins/raw-loader-compat'
import stripMissingExampleImportsPlugin from './vite/client/plugins/strip-missing-example-imports'
import reactLiveBabelPlugin from './vite/client/plugins/react-live-babel'
import loadJsAsJsxPlugin from './vite/client/plugins/load-js-as-jsx'
import portalMdxPlugin from './vite/client/plugins/portal-mdx'
import portalPagesPlugin from './vite/client/plugins/portal-pages'
import eufemiaThemePlugin from './vite/client/plugins/eufemia-theme'
import redirectIndexHtmlPlugin from './vite/client/plugins/redirect-index-html'
import prefetchOnHoverPlugin from './vite/client/plugins/prefetch-on-hover'
import catchLinksPlugin from './vite/client/plugins/catch-links'
import scrollPositionPlugin from './vite/client/plugins/scroll-position'
import testPageFilterPlugin from './vite/client/plugins/test-page-filter'
import buildInfoPlugin from './vite/client/plugins/build-info'
import eufemiaPrebuildPlugin from './vite/client/plugins/eufemia-prebuild'
import path from 'node:path'

const nodeRequire = createRequire(import.meta.url)
const { requireConfigTimeEufemiaModule } = nodeRequire(
  './vite/shared/eufemia-prebuild-paths.cjs'
)

// PostCSS plugins used by the portal
const postcssIsolatePlugin = requireConfigTimeEufemiaModule(
  '@dnb/eufemia/src/plugins/postcss-isolated-style-scope',
  nodeRequire
)
const { getStyleScopeHash } = requireConfigTimeEufemiaModule(
  '@dnb/eufemia/src/plugins/postcss-isolated-style-scope/plugin-scope-hash.cjs',
  nodeRequire
)
const postcssThemeScopePlugin = nodeRequire(
  './postcss-eufemia-theme-scope.cjs'
)

export default defineConfig({
  root: path.resolve(__dirname, 'vite/client'),

  // Serve static files from the portal's static/ directory (favicons, images, etc.)
  publicDir: path.resolve(__dirname, 'static'),

  // pipelines work unchanged.
  build: {
    outDir: path.resolve(__dirname, 'public'),
    emptyOutDir: true,
  },

  plugins: [
    // Redirect /path/index.html → /path/ for SPA navigation and cleaner URLs
    redirectIndexHtmlPlugin(),

    // Prefetch route chunks when internal links are hovered or focused
    prefetchOnHoverPlugin(),

    // Intercept internal link clicks for SPA navigation
    catchLinksPlugin(),

    // Persist sidebar scroll position across route changes
    scrollPositionPlugin(),

    // Filter pages for test builds (IS_VISUAL_TEST, IS_E2E)
    testPageFilterPlugin(),

    // Use pre-built @dnb/eufemia package when available in production builds
    eufemiaPrebuildPlugin(),

    // MDX support — must come before React plugin so .mdx files
    // are transformed to JSX before React processes them
    portalMdxPlugin(),

    rawLoaderCompatPlugin(),

    stripMissingExampleImportsPlugin(),

    reactLiveBabelPlugin(),

    // React plugin for JSX transform and Fast Refresh
    react({
      include: /\.(jsx|tsx|ts|js|mdx)$/,
    }),

    // File-system routing and virtual page registry
    portalPagesPlugin(),

    // Eufemia theme style loading for the portal runtime
    eufemiaThemePlugin(),

    // Portal build information (release version, build timestamp, changelog)
    buildInfoPlugin(),

    loadJsAsJsxPlugin(),
  ],

  resolve: {
    // Allow importing .mdx and .tsx files without extensions
    extensions: [
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.mdx',
    ],

    alias: {
      // Portal data query layer (useStaticQuery, graphql, navigate)
      'portal-query': path.resolve(
        __dirname,
        'vite/client/shims/portal-query.tsx'
      ),

      // Match Docs alias
      Docs: path.resolve(__dirname, 'src/docs'),
    },
  },

  css: {
    // Override postcss.config.js to exclude the font-url-rewrite plugin
    // which rewrites font URLs to https://eufemia.dnb.no/fonts/ (production only).
    // In dev, fonts load from relative paths resolved by Vite.
    postcss: {
      plugins: [
        postcssIsolatePlugin({
          scopeHash: 'eufemia-scope--portal',
          skipClassNames: ['eufemia-scope--default'],
          replaceClassNames: {
            [getStyleScopeHash()]: 'eufemia-scope--portal',
          },
          verbose: false,
        }),
        postcssThemeScopePlugin(),
      ],
    },
    preprocessorOptions: {
      scss: {
        // Suppress sass deprecation warnings from dependencies
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@emotion/react',
      '@emotion/cache',
      '@mdx-js/react',
      'react/jsx-runtime',
      'react-markdown',
    ],
  },

  server: {
    port: 8000,
  },

  define: {
    // Some dependencies (e.g. react-live-ssr) reference Node's `global`
    global: 'globalThis',

    // Algolia search
    'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(
      process.env.ALGOLIA_INDEX_NAME || 'dev_eufemia_docs'
    ),
    'process.env.ALGOLIA_APP_ID': JSON.stringify(
      process.env.ALGOLIA_APP_ID || 'SLD6KEYMQ9'
    ),
    'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(
      process.env.ALGOLIA_SEARCH_KEY || '6cf238b7456ffd9f7a400d8de37318a3'
    ),

    // Style scope flags
    'process.env.ENABLE_BUILD_STYLE_SCOPE': JSON.stringify(false),
    'process.env.ENABLE_PORTAL_STYLE_SCOPE': JSON.stringify(true),
    'process.env.isCI': JSON.stringify(false),
  },
})
