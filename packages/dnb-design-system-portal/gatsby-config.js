/**
 * Gatsby Config
 *
 */

module.exports = {
  pathPrefix: '/dnb-design-system',
  siteMetadata: {
    title: 'DNB Eufemia Design System',
    description:
      'The DNB Style Guide is the go to place for all who has to design, develop or create visuals with the DNB design.',
    // homepage: 'https://www.dnb.no',
    // siteUrl: 'https://www.dnb.no',
    repoUrl: 'https://github.com/eggsdesign/dnb-design-system/tree/master/'
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sass',
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
              maxWidth: 1035,
              sizeByPixelDensity: true
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
    }
  ]
}
