/**
 * Gatsby Node setup
 *
 */

const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const { isCI } = require('ci-info')
const {
  createNewVersion,
  createNewChangelogVersion,
} = require('./scripts/version.js')

exports.onPreInit = async () => {
  if (process.env.NODE_ENV === 'production') {
    await createNewVersion()
    await createNewChangelogVersion()
  }
}

/**
 * Extend every mdx type with a siblings array,
 * based on the slug.
 *
 * Every:
 * mdx.slug = uilib/components/button/demos node
 * will include:
 * mother.slug = uilib/components/button
 * mother.frontmatter.title = Button
 *
 */
exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
    type Mdx implements Node {
      siblings: [Mdx]
    }
  `

  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      siblings: {
        resolve: (source, args, context) => {
          const slug = source.__gatsby_resolved?.slug

          if (!slug) {
            return []
          }

          return slug
            .split('/')
            .map((_, i, arr) => {
              const eq = arr.slice(0, -(i + 1)).join('/')
              return (
                eq &&
                context.nodeModel.findOne({
                  type: 'Mdx',
                  query: {
                    filter: { slug: { eq } },
                  },
                })
              )
            })
            .filter(Boolean)
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createPages = async (params) => {
  await createPages(params)
  await createRedirects(params)
}

async function createPages({ graphql, actions }) {
  const mdxResult = await graphql(/* GraphQL */ `
    {
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (mdxResult.errors) {
    console.error(mdxResult.errors)
    return mdxResult.errors
  }

  const { createPage } = actions
  const { edges } = mdxResult.data.allMdx

  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node

    // check if the slug is valid, in case we deleted one during build
    if (node?.slug) {
      const slug = node.slug

      createPage({
        path: slug,
        component: path.resolve(__dirname, 'src/templates/mdx.js'),
        context: {
          id: node.id,
          prev,
          next,
        },
      })
    }
  })
}

async function createRedirects({ graphql, actions }) {
  const mdxResult = await graphql(/* GraphQL */ `
    {
      allMdx(filter: { frontmatter: { redirect_from: { ne: null } } }) {
        edges {
          node {
            slug
            frontmatter {
              redirect_from
            }
          }
        }
      }
    }
  `)

  if (mdxResult.errors) {
    console.error(mdxResult.errors)
    return mdxResult.errors
  }

  const { createRedirect } = actions
  const { edges } = mdxResult.data.allMdx

  // For all posts with redirect_from frontmatter,
  // extract all values and push to redirects array
  const redirects = edges.reduce((acc, { node }) => {
    // check if the slug is valid, in case we deleted one during build
    if (node?.slug) {
      acc.push({
        fromItems: node.frontmatter.redirect_from,
        toPath: node.slug,
      })
    }
    return acc
  }, [])

  // Create redirects from the constructed array
  redirects.forEach(({ fromItems, toPath }) => {
    fromItems.forEach((fromPath) => {
      const config = {
        fromPath,
        toPath: `/${toPath}`,
        isPermanent: true,
        redirectInBrowser: true,
      }
      createRedirect(config)
      createRedirect({ ...config, fromPath: `${fromPath}/` })
    })
  })
}

let prebuildExists = false
try {
  prebuildExists = fs.existsSync(require.resolve('@dnb/eufemia/build'))
} catch (e) {
  //
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        Root: path.resolve(__dirname),
        Src: path.resolve(__dirname, 'src'),
        Pages: path.resolve(__dirname, 'src/docs'),
        Docs: path.resolve(__dirname, 'src/docs'),
        Tags: path.resolve(__dirname, 'src/shared/tags'),
        Parts: path.resolve(__dirname, 'src/shared/parts'),
      },
    },
  })

  if (isCI && prebuildExists) {
    // Get Webpack config
    const config = getConfig()

    // Consume the prod bundle from Eufemia (during prod build of the Portal)
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /@dnb\/eufemia\/src/,
        (resource) => {
          resource.request = resource.request.replace(
            /@dnb\/eufemia\/src(.*)/,
            '@dnb/eufemia/build$1'
          )
        }
      )
    )

    actions.replaceWebpackConfig(config)
  }
}

exports.onCreateDevServer = () => {
  // We call the "onPostBuild" because we want it to run during development
  // Source https://github.com/NekR/self-destroying-sw/tree/master/packages/gatsby-plugin-remove-serviceworker
  const {
    onPostBuild,
  } = require('gatsby-plugin-remove-serviceworker/gatsby-node.js')

  onPostBuild()
}
