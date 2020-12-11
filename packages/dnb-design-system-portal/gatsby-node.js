/**
 * Gatsby Node setup
 *
 */

const path = require('path')

exports.onCreateNode = ({ node, ...props }) => {
  if (node.internal.type === 'Mdx') {
    createMdxNode({ node, ...props })
  }
}

// find the root child wich has a frontmatter.title
// so the Tabbar can use the mother title
global.nodesCache = global.nodesCache || {}
function createMdxNode({
  node,
  getNodesByType,
  getNode, //getNodeAndSavePathDependency could be an option
  actions
}) {
  const { createNodeField } = actions

  const parent = getNode(node.parent)
  const slug = parent.relativePath.replace(parent.ext, '')

  createNodeField({
    name: 'slug',
    node,
    value: slug
  })

  // to make sure we get nodes which has not been there during the run
  // we count for the length of all nodes

  // get all nodes
  const nodes = getNodesByType('Mdx')
  nodes.forEach(
    (node) =>
      (global.nodesCache[node.fileAbsolutePath.replace('.md', '')] = node)
  )

  const { createParentChildLink } = actions

  // collect the category items - used for search
  const categoryDir = (node.fileAbsolutePath
    .replace('.md', '')
    .match(/.*\/docs\/([^/]*)/) || [])[0]

  const categoryMdx = global.nodesCache[categoryDir]

  if (categoryMdx) {
    createNodeField({
      node: categoryMdx,
      name: 'tag',
      value: 'category'
    })
    createParentChildLink({ parent: node, child: categoryMdx })
  }

  // from here on we only handle the sub tab linking
  const motherDir = node.fileAbsolutePath.replace('.md', '')

  // have this check in place only to skip not needed parts
  if (
    /uilib\/(components|patterns|elements|helpers|typography)/.test(
      motherDir
    )
  ) {
    const parts = motherDir.split('/')
    parts.shift() // do not search on empty parts

    let motherMdx = null

    // traverse down the mother path parts
    for (let i = 0, l = parts.length; i < l; ++i) {
      motherMdx = global.nodesCache['/' + parts.join('/')]

      // ohh we got motherMdx, thats fine
      if (
        motherMdx &&
        motherMdx.frontmatter &&
        motherMdx.frontmatter.title &&
        motherMdx.frontmatter.title.length > 0 // we dont need to crawler nodes which has a title
      ) {
        break
      }

      // then we continue the next round
      parts.pop()

      // and stop if the folder is called "src" or "docs"
      // if we get the parent (node), we can use parent.sourceInstanceName
      if (parts[parts.length - 1] === 'docs') {
        break
      }
    }

    // Add the mother title to the children
    if (motherMdx) {
      createNodeField({
        node: motherMdx,
        name: 'tag',
        value: 'mother'
      })
      createParentChildLink({ parent: node, child: motherMdx })
    }
  }
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
            fields {
              slug
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
    if (node && node.fields && node.fields.slug) {
      const slug = node.fields.slug

      createPage({
        path: slug,
        component: path.resolve('./src/templates/mdx.js'),
        context: {
          id: node.id,
          prev,
          next
        }
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
    // check if the slug is valid, in case we deleted one during build
    if (node && node.fields && node.fields.slug) {
      acc.push({
        fromItems: node.frontmatter.redirect_from,
        toPath: node.fields.slug
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
        redirectInBrowser: true
      }
      createRedirect(config)
      createRedirect({ ...config, fromPath: `${fromPath}/` })
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        Root: path.resolve(__dirname),
        Src: path.resolve(__dirname, 'src'),
        Pages: path.resolve(__dirname, 'src/docs'),
        Docs: path.resolve(__dirname, 'src/docs'),
        Tags: path.resolve(__dirname, 'src/shared/tags'),
        Parts: path.resolve(__dirname, 'src/shared/parts')
      }
    }
  })
}
