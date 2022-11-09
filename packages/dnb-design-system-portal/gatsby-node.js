/**
 * Gatsby Node setup
 *
 */

const fs = require('fs-extra')
const path = require('path')
const { isCI } = require('repo-utils')
const getCurrentBranchName = require('current-git-branch')
const { init } = require('./scripts/version.js')

let prebuildExists = false
const currentBranch = getCurrentBranchName()

exports.onPreInit = async () => {
  try {
    prebuildExists = fs.existsSync(require.resolve('@dnb/eufemia/build'))
  } catch (e) {
    //
  }

  if (process.env.NODE_ENV === 'production') {
    await init()
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
          const slug = context?.slug // during dev: source?.__gatsby_resolved?.slug

          if (typeof slug !== 'string') {
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
      site {
        siteMetadata {
          title
          description
        }
      }
      allMdx {
        edges {
          node {
            id
            slug
            frontmatter {
              title
              description
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
          slug,
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

exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  const config = {
    resolve: {
      alias: {
        Docs: path.resolve(__dirname, 'src/docs'),
      },
    },
    plugins: [
      plugins.define({
        'process.env.STYLE_THEME': JSON.stringify(getStyleTheme()),
        'process.env.CURRENT_BRANCH': JSON.stringify(currentBranch),
        'process.env.PREBUILD_EXISTS': JSON.stringify(prebuildExists),
      }),

      // Webpack 4 to 5 migration
      plugins.provide({ process: 'process/browser' }),
    ],
  }

  if (isCI && prebuildExists && stage === 'build-javascript') {
    config.plugins.push(
      plugins.normalModuleReplacement(/@dnb\/eufemia\/src/, (resource) => {
        resource.request = resource.request.replace(
          /@dnb\/eufemia\/src(.*)/,
          '@dnb/eufemia/build$1'
        )
      })
    )
  }

  actions.setWebpackConfig(config)
}

exports.onCreateDevServer = () => {
  // We call the "onPostBuild" because we want it to run during development
  // Source https://github.com/NekR/self-destroying-sw/tree/master/packages/gatsby-plugin-remove-serviceworker
  const {
    onPostBuild,
  } = require('gatsby-plugin-remove-serviceworker/gatsby-node.js')

  onPostBuild()
}

function getStyleTheme() {
  let themeName = 'ui'
  if (typeof process.env.GATSBY_THEME_STYLE_DEV !== 'undefined') {
    themeName = process.env.GATSBY_THEME_STYLE_DEV
  }

  /**
   * Checking for "branch name" could be interesting to have,
   * but this requires that we have a visual testing strategy in place first.
   *
   */
  if (process.env.GATSBY_CLOUD && currentBranch.includes('eiendom')) {
    themeName = 'eiendom'
  }

  return themeName
}
