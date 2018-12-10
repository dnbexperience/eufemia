/**
 * Gatsby Config
 *
 */

module.exports = {
  pathPrefix: '/eufemia',
  siteMetadata: {
    title: 'DNB Design System - Eufemia',
    description:
      'The DNB Style Guide is the go to place for all who has to design, develop or create visuals with the DNB design.',
    // homepage: 'https://www.dnb.no',
    // siteUrl: 'https://www.dnb.no',
    repoUrl: 'https://github.com/dnbexperience/eufemia/tree/master/'
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    // 'gatsby-plugin-remove-serviceworker',// we may have useage for this later
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'DNB Design System - Eufemia',
        short_name: 'Eufemia',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#007272',
        display: 'minimal-ui',
        icon: '../dnb-ui-lib/assets/images/dnb-logo.png' // This path is relative to the root of the site.
        // icons: [
        //   {
        //     src: '/assets/....png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        // ],
      }
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        // More info of using plugins: https://github.com/mdx-js/mdx/blob/d4154b8c4a546d0b675826826f85014cc04098c2/docs/plugins.md
        mdPlugins: [],
        hastPlugins: [],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
              showCaptions: true,
              sizeByPixelDensity: true
              // linkImagesToOriginal: true
              // wrapperStyle: {}
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-calc'),
          require('postcss-custom-properties'),
          require('postcss-preset-env')({ stage: 0 }),
          require('autoprefixer')({
            browsers: ['last 1 versions', 'explorer >= 11']
          })
        ]
      }
    }
  ]
}
