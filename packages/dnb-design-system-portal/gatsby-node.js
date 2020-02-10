/**
 * Gatsby Node setup
 *
 */

const path = require('path')

exports.onCreateNode = ({
  node,
  getNodesByType,
  getNodeAndSavePathDependency,
  actions
}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNodeAndSavePathDependency(node.parent)
    const slug = parent.relativePath.replace(parent.ext, '')

    createNodeField({
      name: 'slug',
      node,
      value: slug
    })

    linkParentChild({ node, getNodesByType, actions })
  }
}

// find the root child wich has a frontmatter.title
// so the Tabbar can use the mother title
const linkParentChild = ({ node, getNodesByType, actions }) => {
  if (node.internal.type !== 'Mdx') {
    return
  }

  // get all nodes
  const nodes = getNodesByType('Mdx').reverse()
  const { createParentChildLink } = actions

  // collect the category items - used for search
  const categoryDir = (node.fileAbsolutePath
    .replace('.md', '')
    .match(/.*\/docs\/([^/]*)/) || [])[0]

  const categoryMdx = nodes.find(
    ({ fileAbsolutePath }) =>
      categoryDir === fileAbsolutePath.replace('.md', '')
  )

  if (categoryMdx) {
    const { createNodeField } = actions
    createNodeField({
      node: categoryMdx,
      name: 'tag',
      value: 'category'
    })
    createParentChildLink({ parent: node, child: categoryMdx })
  }

  // from here on we only handle the sub tab linking
  const motherDir = node.fileAbsolutePath.replace('.md', '')

  if (!/uilib\/(components|patterns|elements)/.test(motherDir)) {
    return
  }

  const parts = motherDir.split('/')
  parts.shift() // do not search on empty parts

  let find = null
  let motherMdx = null

  // traverse down the mother path parts
  for (let i = 0, l = parts.length; i < l; ++i) {
    find = '/' + parts.join('/')
    motherMdx = nodes.find(({ fileAbsolutePath, frontmatter }) => {
      return (
        find === fileAbsolutePath.replace('.md', '') &&
        frontmatter &&
        frontmatter.title &&
        // || frontmatter.menuTitle
        frontmatter.title.length > 0 // we dont need to crawler nodes witch has a title
      )
    })

    // ohh we got motherMdx, thats fine
    if (motherMdx) {
      break
    }

    parts.pop()

    // and stop if the folder is called "src" or "docs"
    // if we get the parent (node), we can use parent.sourceInstanceName
    if (parts[parts.length - 1] === 'docs') {
      break
    }
  }

  // Add the mother title to the children
  if (
    motherMdx &&
    motherMdx.frontmatter &&
    motherMdx.frontmatter.title &&
    motherMdx.frontmatter.title.length > 0
  ) {
    createParentChildLink({ parent: node, child: motherMdx })
  }
}

exports.createPages = async params => {
  await createPages(params)
  await createRedirects(params)
}

const createPages = async ({ graphql, actions }) => {
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

  // createPages(createPage, edges)
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

const createRedirects = async ({ graphql, actions }) => {
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
    fromItems.forEach(fromPath => {
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
