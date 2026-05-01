/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Vite configuration for the Eufemia documentation portal.
 *
 * See vite/README.md for architecture details and plugin documentation.
 */

import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import fs from 'node:fs'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
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

// PostCSS plugins used by the portal
const postcssIsolatePlugin = require('@dnb/eufemia/src/plugins/postcss-isolated-style-scope')
const {
  getStyleScopeHash,
} = require('@dnb/eufemia/src/plugins/postcss-isolated-style-scope/plugin-scope-hash.cjs')
const postcssThemeScopePlugin = require('./postcss-eufemia-theme-scope.cjs')

export default defineConfig({
  root: path.resolve(__dirname, 'vite/client'),

  // Serve static files from the portal's static/ directory (favicons, images, etc.)
  publicDir: path.resolve(__dirname, 'static'),

  // Output to public/ — same directory Gatsby uses, so deployment
  // pipelines work unchanged.
  build: {
    outDir: path.resolve(__dirname, 'public'),
    emptyOutDir: true,
  },

  plugins: [
    // Redirect /path/index.html → /path/ to match Gatsby's clean-URL behavior
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
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
      }),
    },

    // Handle webpack raw-loader! imports by rewriting to Vite's ?raw suffix
    {
      name: 'raw-loader-compat',
      enforce: 'pre',
      resolveId(source) {
        if (source.startsWith('raw-loader!')) {
          const raw = source.slice('raw-loader!'.length)
          // Resolve package-relative paths like 'dnb-design-system-portal/../../LICENSE'
          if (raw.startsWith('dnb-design-system-portal/')) {
            const relative = raw.slice('dnb-design-system-portal/'.length)
            return path.resolve(__dirname, relative) + '?raw'
          }
          return raw + '?raw'
        }
      },
    },

    // Strip named imports from Examples files that don't exist as exports.
    // Webpack silently treats these as undefined; Vite's native ESM throws.
    {
      name: 'strip-missing-example-imports',
      enforce: 'pre',
      transform(code, id) {
        const [filepath] = id.split('?')
        if (!filepath.endsWith('.mdx') && !filepath.endsWith('.tsx')) {
          return null
        }

        // Only process files importing from an Examples module
        const importRe =
          /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]*Examples)['"]/g
        let match = importRe.exec(code)
        if (!match) {
          return null
        }

        let transformed = code
        while (match) {
          const [fullImport, specifiers, source] = match

          // Resolve the Examples file on disk
          const dir = path.dirname(filepath)
          let examplesPath: string | null = null
          for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
            // Handle both relative and aliased paths (e.g. 'Docs/...')
            let candidate: string
            if (source.startsWith('.')) {
              candidate = path.resolve(dir, source + ext)
            } else if (source.startsWith('Docs/')) {
              candidate = path.resolve(
                __dirname,
                'src/docs',
                source.slice(5) + ext
              )
            } else {
              break
            }
            if (fs.existsSync(candidate)) {
              examplesPath = candidate
              break
            }
          }

          if (examplesPath) {
            const exContent = fs.readFileSync(examplesPath, 'utf-8')
            const names = specifiers
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
            const valid = names.filter((n) => exContent.includes(n))

            if (valid.length < names.length) {
              if (valid.length === 0) {
                // Remove the entire import statement
                transformed = transformed.replace(
                  fullImport,
                  '// [vite] removed stale import'
                )
              } else {
                // Replace with only the valid specifiers
                const newImport = `import { ${valid.join(', ')} } from '${source}'`
                transformed = transformed.replace(fullImport, newImport)
              }
            }
          }

          match = importRe.exec(code)
        }

        if (transformed !== code) {
          return { code: transformed, map: null }
        }
        return null
      },
    },

    // babel-plugin-react-live transform for Examples.tsx files
    // Must run before OXC/Rolldown JSX transform to see JSX AST nodes
    {
      name: 'react-live-babel',
      enforce: 'pre',
      async transform(code, id) {
        const [filepath] = id.split('?')
        if (!filepath.endsWith('Examples.tsx')) {
          return null
        }
        const babel = await import('@babel/core')
        const result = await babel.transformAsync(code, {
          filename: filepath,
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
          plugins: [
            [
              require.resolve('babel-plugin-react-live'),
              {
                componentName: 'ComponentBox',
                filesToMatch: ['Examples.tsx'],
                prettierPath: path.resolve(__dirname, '.prettierrc'),
              },
            ],
          ],
          sourceMaps: true,
        })
        if (result?.code) {
          return { code: result.code, map: result.map }
        }
      },
    },

    // React plugin for JSX transform and Fast Refresh
    react({
      include: /\.(jsx|tsx|ts|js|mdx)$/,
    }),

    // File-system routing and virtual page registry
    portalPagesPlugin(),

    // Eufemia theme style loading (replaces gatsby-plugin-eufemia-theme-handler)
    eufemiaThemePlugin(),

    // Portal build information (release version, build timestamp, changelog)
    buildInfoPlugin(),

    // Treat .js files in src/ as JSX and handle CJS→ESM conversion
    {
      name: 'load-js-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        const [filepath] = id.split('?')
        // Only process .js files in the portal's src/ directory, not @dnb/eufemia/src/ or node_modules
        const portalSrcDir = path.resolve(__dirname, 'src')
        if (
          !filepath.endsWith('.js') ||
          !filepath.startsWith(portalSrcDir)
        ) {
          return null
        }

        let transformedCode = code

        // Convert CJS patterns to ESM before esbuild processes the file.
        // esbuild's format:'esm' wraps CJS as a default export, which breaks
        // named imports like `import { makeSlug } from './slug'`.
        const isCjs =
          /\brequire\s*\(/.test(code) || /\bexports\./.test(code)

        if (isCjs) {
          // require('x') → import x from 'x'
          transformedCode = transformedCode.replace(
            /(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*(['"][^'"]+['"])\s*\)/g,
            'import $1 from $2'
          )

          // exports.name = function name(...) { → export function name(...) {
          transformedCode = transformedCode.replace(
            /exports\.(\w+)\s*=\s*function\s+\1/g,
            'export function $1'
          )

          // exports.name = expr → export const name = expr
          transformedCode = transformedCode.replace(
            /exports\.(\w+)\s*=\s*/g,
            'export const $1 = '
          )
        }

        return transformWithOxc(transformedCode, filepath, {
          lang: 'jsx',
          jsx: { runtime: 'automatic' },
        })
      },
    },
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
      // Gatsby import shims
      gatsby: path.resolve(__dirname, 'vite/client/shims/gatsby.tsx'),
      'gatsby-plugin-eufemia-theme-handler': path.resolve(
        __dirname,
        'vite/client/shims/theme-handler.ts'
      ),
      '@gatsbyjs/reach-router': path.resolve(
        __dirname,
        'vite/client/shims/reach-router.tsx'
      ),

      // Match Gatsby's Docs alias
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
