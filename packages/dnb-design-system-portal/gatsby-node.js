/**
 * Gatsby Node setup
 *
 */

const fs = require('fs').promises
const { readFileSync, readdirSync } = require('fs')
const path = require('path')
const ts = require('typescript')
const { isCI } = require('repo-utils')
const { init } = require('./scripts/version.js')
const { createFilePath } = require('gatsby-source-filesystem')
const { shouldUsePrebuild } = require('./src/core/BuildTools.cjs')
const {
  enableBuildStyleScope,
  enablePortalStyleScope,
} = require('@dnb/eufemia/src/plugins/postcss-isolated-style-scope/config')

const repoRoot = path.resolve(__dirname, '..', '..')
const GENERAL_TEST_PAGES = ['/404', '/500']
const normalizedGeneralTestPages = new Set(
  GENERAL_TEST_PAGES.map((page) => normalizePagePath(page))
)

let visualTestPagesCache = null
let e2eTestPagesCache = null

const visualTestWhitelist =
  process.env.IS_VISUAL_TEST === '1'
    ? mergePageSets(normalizedGeneralTestPages, collectVisualTestPages())
    : null

const e2eTestWhitelist =
  process.env.IS_E2E === '1'
    ? mergePageSets(normalizedGeneralTestPages, collectE2eTestPages())
    : null

const PREBUILD_EXISTS = shouldUsePrebuild()
const isMini = process.env.BUILD_MINI === '1'

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
  if (isMini) {
    return
  }
  await createRedirects(params)
}

exports.onPostBuild = async (params) => {
  if (isMini) {
    return
  }
  await createRedirects(params)

  if (deletedPages.length) {
    params.reporter.warn(
      `❗️ These pages were deleted:\n${deletedPages
        .map((page) => `├ ${page}`)
        .join('\n')}\n\n`
    )
  }

  // Copy the fonts folder
  const { program } = params.store.getState()
  const publicDir = path.join(program.directory, 'public', 'fonts')
  const rootPath = path.dirname(require.resolve('@dnb/eufemia'))
  const src = path.resolve(rootPath, 'assets', 'fonts')
  await copyDirectory(src, publicDir)
}

const deletedPages = []
const createdPages = []

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage } = actions

  const normalizedPagePath = normalizePagePath(page.path) || page.path
  const testPageFilters = [
    {
      isEnabled: Boolean(visualTestWhitelist),
      pages: visualTestWhitelist,
    },
    {
      isEnabled: Boolean(e2eTestWhitelist),
      pages: e2eTestWhitelist,
    },
  ]

  testPageFilters.forEach(({ isEnabled, pages }) => {
    if (!isEnabled || !pages) {
      return
    }

    if (normalizedPagePath !== '/' && !pages.has(normalizedPagePath)) {
      deletedPages.push(page.path)
      deletePage(page)
    }
  })

  const filter = process.env.filter

  if (!(filter?.length > 0)) {
    return // stop here
  }

  const pages = filter.split(/(,|\s)/)

  if (
    !pages.some((p) => {
      return page.path.replace(/[?#].*$/, '').includes(p)
    })
  ) {
    deletePage(page)
  } else {
    createdPages.push(page.path)
  }
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
  getConfig,
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

      // Setup
      plugins.define({
        'process.env.isCI': JSON.stringify(isCI),
      }),

      // Algolia info
      plugins.define({
        'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(
          process.env.ALGOLIA_INDEX_NAME || 'dev_eufemia_docs'
        ),
        'process.env.ALGOLIA_APP_ID': JSON.stringify(
          process.env.ALGOLIA_APP_ID || 'SLD6KEYMQ9'
        ),
        'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(
          process.env.ALGOLIA_SEARCH_KEY ||
            '6cf238b7456ffd9f7a400d8de37318a3'
        ),
        'process.env.ENABLE_BUILD_STYLE_SCOPE': JSON.stringify(
          enableBuildStyleScope()
        ),
        'process.env.ENABLE_PORTAL_STYLE_SCOPE': JSON.stringify(
          enablePortalStyleScope()
        ),
      }),
    ],
  }

  if (PREBUILD_EXISTS && stage === 'build-javascript') {
    if (PREBUILD_EXISTS && !isCI) {
      reporter.warn(
        '😱 There is a "dnb-eufemia/build" in your local repo. It is used during your local Portal build! \nKeep in mind, the code from "dnb-eufemia/build" may be outdated. \n\n👉 You can remove the build with: "yarn build:clean"\n\n'
      )
    }

    config.plugins.push(
      plugins.normalModuleReplacement(/@dnb\/eufemia\/src/, (resource) => {
        resource.request = resource.request.replace(
          /@dnb\/eufemia\/src(.*)/,
          '@dnb/eufemia/build$1'
        )
      })
    )
  }

  // Suppress mini-css-extract-plugin "Conflicting order" warnings
  if (stage === 'build-javascript' || stage === 'develop') {
    const webpackConfig = getConfig()
    const miniCssExtractPlugin = webpackConfig.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
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
        .join('\n')}\n`
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

function collectVisualTestPages() {
  if (visualTestPagesCache) {
    return visualTestPagesCache
  }

  const testDir = path.join(repoRoot, 'packages', 'dnb-eufemia', 'src')
  const screenshotFiles = collectTestFiles(testDir, (name) => {
    return (
      name.endsWith('.screenshot.test.ts') ||
      name.endsWith('.screenshot.test.tsx') ||
      name.endsWith('.screenshot.test.js') ||
      name.endsWith('.screenshot.test.jsx')
    )
  })

  const pages = new Set()
  for (const file of screenshotFiles) {
    const urls = extractSetupPageScreenshotUrls(file)
    urls.forEach((value) => {
      if (value) {
        pages.add(value)
      }
    })
  }

  visualTestPagesCache = pages
  return pages
}

function collectE2eTestPages() {
  if (e2eTestPagesCache) {
    return e2eTestPagesCache
  }

  const portalDir = path.join(__dirname, 'src', 'e2e')
  const portalFiles = collectTestFiles(
    portalDir,
    (name) => name.endsWith('.spec.ts') || name.endsWith('.spec.tsx')
  )

  const componentRoot = path.join(
    repoRoot,
    'packages',
    'dnb-eufemia',
    'src'
  )
  const componentFiles = collectTestFiles(
    componentRoot,
    (name) =>
      name.endsWith('.e2e.spec.ts') || name.endsWith('.e2e.spec.tsx')
  )

  const pages = new Set()
  for (const file of [...portalFiles, ...componentFiles]) {
    const urls = extractPageGotoUrls(file)
    urls.forEach((value) => {
      if (value) {
        pages.add(value)
      }
    })
  }

  e2eTestPagesCache = pages
  return pages
}

function collectTestFiles(baseDir, matcher) {
  const found = []

  function traverse(dir) {
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue
      }

      const entryPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        traverse(entryPath)
        continue
      }

      if (matcher(entry.name)) {
        found.push(entryPath)
      }
    }
  }

  traverse(baseDir)
  return found
}

function extractSetupPageScreenshotUrls(filePath) {
  const pages = new Set()
  const sourceFile = parseSourceFile(filePath)
  const constants = collectStringConstants(sourceFile)

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'setupPageScreenshot'
    ) {
      const [arg] = node.arguments
      if (arg && ts.isObjectLiteralExpression(arg)) {
        for (const prop of arg.properties) {
          if (
            ts.isPropertyAssignment(prop) &&
            getPropertyName(prop.name) === 'url'
          ) {
            const value =
              getLiteralValue(prop.initializer) ??
              (ts.isIdentifier(prop.initializer)
                ? constants.get(prop.initializer.text)
                : null)

            const normalized = normalizePagePath(value)
            if (normalized && isPortalPath(normalized)) {
              pages.add(normalized)
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return pages
}

function extractPageGotoUrls(filePath) {
  const pages = new Set()
  const sourceFile = parseSourceFile(filePath)
  const constants = collectStringConstants(sourceFile)

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'goto'
    ) {
      const [arg] = node.arguments
      const rawValue =
        getLiteralValue(arg) ??
        (ts.isIdentifier(arg) ? constants.get(arg.text) : null)

      const normalized = normalizePagePath(rawValue)
      if (normalized && isPortalPath(normalized)) {
        pages.add(normalized)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return pages
}

function parseSourceFile(filePath) {
  const content = readFileSync(filePath, 'utf8')
  let scriptKind = ts.ScriptKind.TS

  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    scriptKind = ts.ScriptKind.TSX
  } else if (filePath.endsWith('.js')) {
    scriptKind = ts.ScriptKind.JS
  }

  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  )
}

function collectStringConstants(sourceFile) {
  const constants = new Map()

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      const literal = getLiteralValue(node.initializer)
      if (literal) {
        constants.set(node.name.text, literal)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return constants
}

function getLiteralValue(node) {
  if (!node) {
    return null
  }

  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return node.text
  }

  return null
}

function getPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
    return name.text
  }

  return null
}

function normalizePagePath(rawPath) {
  if (typeof rawPath !== 'string') {
    return null
  }

  const trimmed = rawPath.trim()
  if (!trimmed) {
    return null
  }

  const cleaned = trimmed.replace(/[?#].*$/, '').replace(/\/$/, '')
  if (cleaned === '') {
    return '/'
  }

  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

function isPortalPath(value) {
  return typeof value === 'string' && value.startsWith('/')
}

function mergePageSets(baseSet, extraSet) {
  const merged = new Set(baseSet)
  if (extraSet) {
    extraSet.forEach((page) => merged.add(page))
  }

  return merged
}
