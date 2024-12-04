/**
 * Gatsby Node setup
 *
 */

const fs = require('fs').promises
const path = require('path')
const { isCI } = require('repo-utils')
const { init } = require('./scripts/version.js')
const { createFilePath } = require('gatsby-source-filesystem')
const { shouldUsePrebuild } = require('./src/core/BuildTools.cjs')

const PREBUILD_EXISTS = shouldUsePrebuild()

// Used for heading
const {
  makeHeadingsResolver,
} = require('./src/uilib/search/remark-headings-plugin.js')

exports.onPreInit = async () => {
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
exports.createSchemaCustomization = ({
  getNode,
  getNodesByType,
  pathPrefix,
  reporter,
  cache,
  schema,
  store,
  actions,
}) => {
  actions.createTypes([
    `
      type Mdx implements Node {
        siblings: [Mdx]
      }
    `,
    `
      type MdxHeading {
        value: String
        depth: Int
      }
    `,
    makeHeadingsResolver({
      getNode,
      getNodesByType,
      pathPrefix,
      reporter,
      cache,
      schema,
      store,
    }),
  ])
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'slug',
      value: createFilePath({ node, getNode }).replace(/^\/|\/$/g, ''),
    })
  }
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      siblings: {
        type: ['Mdx'],
        resolve: (source, args, context) => {
          const slug = source.fields.slug

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
                    filter: { fields: { slug: { eq } } },
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
  await createRedirects(params)
}

exports.onPreBootstrap = async (params) => {
  // Copy the fonts folder
  const { program } = params.store.getState()
  const publicDir = path.join(program.directory, 'public', 'fonts')
  const rootPath = path.dirname(require.resolve('@dnb/eufemia'))
  const src = path.resolve(rootPath, 'assets', 'fonts')
  await copyDirectory(src, publicDir)
}

exports.onPostBuild = async (params) => {
  await createRedirects(params)

  if (deletedPages.length) {
    params.reporter.warn(
      `❗️ These pages were deleted:\n${deletedPages
        .map((page) => `├ ${page}`)
        .join('\n')}\n\n`,
    )
  }
}

const deletedPages = []
const createdPages = []

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage } = actions

  // Only build pages without "'/uilib'" when building for visual tests
  if (process.env.IS_VISUAL_TEST === '1') {
    if (
      page.path !== '/' &&
      !existsInPages(page.path, [
        // General pages
        '/404',
        '/500',

        // Playwright e2e tests
        '/uilib',
        '/uilib/components/button',
        '/uilib/components',
        '/uilib/extensions',
        '/uilib/elements',
        '/quickguide-designer/colors',
        '/quickguide-designer/fonts',
        '/contribute/getting-started',
      ]) &&
      !existsInPages(page.componentPath, [
        // Visual e2e tests
        'visual-tests',
        'demos.mdx',
      ])
    ) {
      deletedPages.push(page.path)
      deletePage(page)
    }
  }

  const filter = process.env.filter

  if (!(filter?.length > 0)) {
    return // stop here
  }

  const pages = filter.split(/(,|\s)/)

  if (!existsInPages(page.path, pages)) {
    deletePage(page)
  } else {
    createdPages.push(page.path)
  }
}

function existsInPages(path, pages) {
  return pages.some((p) => {
    return path.includes(p)
  })
}

async function createRedirects({ graphql, actions }) {
  const mdxResult = await graphql(/* GraphQL */ `
    {
      allMdx(filter: { frontmatter: { redirect_from: { ne: null } } }) {
        edges {
          node {
            fields {
              slug
            }
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
    const slug = node.fields.slug

    // check if the slug is valid, in case we deleted one during build
    if (slug) {
      acc.push({
        fromItems: node.frontmatter.redirect_from,
        toPath: slug,
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

exports.onCreateWebpackConfig = ({
  reporter,
  stage,
  actions,
  plugins,
}) => {
  const config = {
    resolve: {
      alias: {
        Docs: path.resolve(global.pagesPath),
      },
    },
    plugins: [
      // Webpack 4 to 5 migration
      plugins.provide({ process: 'process/browser' }),

      // Algolia info
      plugins.define({
        'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(
          process.env.ALGOLIA_INDEX_NAME || 'dev_eufemia_docs',
        ),
        'process.env.ALGOLIA_APP_ID': JSON.stringify(
          process.env.ALGOLIA_APP_ID || 'SLD6KEYMQ9',
        ),
        'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(
          process.env.ALGOLIA_SEARCH_KEY ||
            '6cf238b7456ffd9f7a400d8de37318a3',
        ),
      }),
    ],
  }

  if (PREBUILD_EXISTS && stage === 'build-javascript') {
    if (PREBUILD_EXISTS && !isCI) {
      reporter.warn(
        '😱 There is a "dnb-eufemia/build" in your local repo. It is used during your local Portal build! \nKeep in mind, the code from "dnb-eufemia/build" may be outdated. \n\n👉 You can remove the build with: "yarn build:clean"\n\n',
      )
    }

    config.plugins.push(
      plugins.normalModuleReplacement(/@dnb\/eufemia\/src/, (resource) => {
        resource.request = resource.request.replace(
          /@dnb\/eufemia\/src(.*)/,
          '@dnb/eufemia/build$1',
        )
      }),
    )
  }

  actions.setWebpackConfig(config)
}

exports.onCreateDevServer = (params) => {
  // We call the "onPostBuild" because we want it to run during development
  // Source https://github.com/NekR/self-destroying-sw/tree/master/packages/gatsby-plugin-remove-serviceworker
  const {
    onPostBuild,
  } = require('gatsby-plugin-remove-serviceworker/gatsby-node.js')

  onPostBuild()

  if (createdPages.length) {
    params.reporter.info(
      `🚀 You can only visit these pages:\n\n${createdPages
        .map((page) => `├ http://localhost:8000${page}`)
        .join('\n')}\n`,
    )
  }
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true })

  const entries = await fs.readdir(src, { withFileTypes: true })

  for await (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}
