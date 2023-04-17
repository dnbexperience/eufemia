/**
 * Gatsby Config
 *
 */

const remarkGfm = require('remark-gfm')
const getCurrentBranchName = require('current-git-branch')
const currentBranch = getCurrentBranchName()
const { shouldUsePrebuild } = require('./src/core/StyleImporter.cjs')

const pathPrefix = '/'

const siteMetadata = {
  title: 'DNB Design System',
  name: 'Eufemia',
  description:
    'Eufemia Design System is the go to place for all who has to design, develop and make digital WEB applications for DNB.',
  repoUrl: 'https://github.com/dnbexperience/eufemia/',
}

const pagesPath = './src/docs'
const ignoreAsPage = [
  // '**/*.md',// use when template in createPage is used
  // '**/*.mdx',// use when template in createPage is used
  '**/Examples.*',
  '**/*_not_in_use*',
  '**/demos/layout/Layout.js',
  '**/skip-link-example.tsx',
  '**/CardProductsTable.js',
  '**/assets/*.js',
  '**/__utils__/*.{js,ts,tsx}',
]

const plugins = [
  process.env.GATSBY_CLOUD === 'true' && {
    resolve: 'gatsby-plugin-gatsby-cloud',
    options: {},
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Eufemia - DNB Design System',
      short_name: 'Eufemia',
      start_url: '/',
      icon: './static/dnb/apple-touch-icon.png', // This path is relative to the root of the site.
      icons: [
        {
          src: '/dnb/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/dnb/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#007272',
      background_color: '#007272',
      display: 'standalone',
    },
  },
  'gatsby-plugin-meta-redirect',
  'gatsby-plugin-catch-links',
  process.env.SKIP_IMAGE_PROCESSING !== '1' && 'gatsby-plugin-sharp', // is used by gatsby-remark-images
  process.env.SKIP_IMAGE_PROCESSING !== '1' && 'gatsby-remark-images',
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      mdxOptions: {
        // More info of using plugins: https://github.com/mdx-js/mdx/blob/d4154b8c4a546d0b675826826f85014cc04098c2/docs/plugins.md
        // rehypePlugins: [], // hastPlugins
        remarkPlugins: [
          remarkGfm, // for markdown Table support
        ],
      },
      gatsbyRemarkPlugins: [
        process.env.SKIP_IMAGE_PROCESSING !== '1' && {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1024,
            // showCaptions: true
            // sizeByPixelDensity: true
            // linkImagesToOriginal: true
            // wrapperStyle: {}
          },
        },
      ].filter(Boolean),
      // Imports in here are globally available in *.md files
      // globalScope: `
      //   import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'
      //   export default { Img }
      // `
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: pagesPath, // for .mdx files
      ignore: ignoreAsPage,
    },
  },
  {
    resolve: 'gatsby-plugin-page-creator',
    options: {
      name: 'docs',
      path: pagesPath, // for .js files
      ignore: ignoreAsPage,
    },
  },
  'gatsby-plugin-sass',
  'gatsby-plugin-emotion',
  {
    resolve: 'gatsby-plugin-babel-react-live',
    options: {
      componentName: 'ComponentBox',
      filesToMatch: ['Examples.tsx' /* for MDX we could use MDXLayout */],
      prettierPath: require.resolve('./.prettierrc'),
    },
  },
  {
    resolve: 'gatsby-plugin-scroll-position',
    options: {
      elements: [
        {
          selector: '#portal-sidebar-menu',
          ensureInView: '#portal-sidebar-menu ul li.is-active',
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-eufemia-theme-handler',
    options: {
      themes: {
        ui: { name: 'DNB' }, // universal identity
        eiendom: { name: 'DNB Eiendom' },
        sbanken: { name: 'Sbanken' },
      },
      filesGlob: `**/${
        shouldUsePrebuild() ? 'build' : 'src'
      }/style/themes/**/*-theme-*.{scss,css}`,
      defaultTheme: getDefaultTheme(),
    },
  },
].filter(Boolean)

if (currentBranch === 'release') {
  plugins.push({
    // This (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    resolve: 'gatsby-plugin-offline',
    options: {
      workboxConfig: {
        globPatterns: ['*.html'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    },
  })
}

// Algolia search
if (process.env.IS_VISUAL_TEST !== '1') {
  const queries = require('./src/uilib/search/searchQuery')
  if (queries) {
    plugins.push({
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    })
  }
}

module.exports = {
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,

    /**
     * FAST_DEV=true or DEV_SSR=true can be interesting when we use React v18 and the Hook useId.
     * Because Gatsby then runs a page call as SSR, and warns when the VDOM do not match on the client.
     */
  },
  pathPrefix,
  siteMetadata,
  plugins,
  jsxRuntime: 'automatic',
  trailingSlash: 'always',
}

function getDefaultTheme() {
  const ciTheme = process.env.GATSBY_THEME_STYLE_DEV
  if (ciTheme) {
    return ciTheme
  }

  if (process.env.GATSBY_CLOUD || process.env.NETLIFY) {
    if (currentBranch.includes('eiendom')) {
      return 'eiendom'
    }

    if (currentBranch.includes('sbanken')) {
      return 'sbanken'
    }
  }

  return 'ui'
}
