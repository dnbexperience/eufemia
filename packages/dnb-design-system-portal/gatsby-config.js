/**
 * Gatsby Config
 *
 */

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Eufemia - DNB Design System',
    name: 'Eufemia',
    description:
      'Eufemia Design System is the go to place for all who has to design, develop and make digital WEB applications for DNB.',
    repoUrl: 'https://github.com/dnbexperience/eufemia/'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Eufemia - DNB Design System',
        short_name: 'Eufemia',
        start_url: '/',
        icon: './static/apple-touch-icon.png', // This path is relative to the root of the site.
        icons: [
          {
            src: './android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        theme_color: '#007272',
        background_color: '#007272',
        display: 'standalone'
      }
    },
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp', // is used by gatsby-remark-images
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        ignore: ['**/*.md', '**/Examples.js', '**/*_not_in_use*'],
        path: `${__dirname}/src/docs`, // for .js files
        name: 'docs'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/docs`, //for .md (mdx) files
        name: 'docs'
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md'],
        // More info of using plugins: https://github.com/mdx-js/mdx/blob/d4154b8c4a546d0b675826826f85014cc04098c2/docs/plugins.md
        // rehypePlugins: [], // hastPlugins
        // remarkPlugins: [], // mdPlugins
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024
              // showCaptions: true
              // sizeByPixelDensity: true
              // linkImagesToOriginal: true
              // wrapperStyle: {}
            }
          }
        ]
        // Imports in here are globally aviable in *.md files
        // globalScope: `
        //   import Img from 'Tags/Img'
        //   export default { Img }
        // `
        // defaultLayouts: {
        //   // default: require.resolve('./src/templates/mdx.js')
        // }
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: require('../dnb-ui-lib/scripts/prepub/config/postcssConfig')(
          { IE11: true }
        )
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
        }
      }
    }
  ]
}
