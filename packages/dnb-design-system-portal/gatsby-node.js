/**
 * Gatsby Node setup
 *
 */

const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    const slug = parent.relativePath.replace(parent.ext, '')

    createNodeField({
      name: 'slug',
      node,
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  await createPages({ graphql, actions })
  await createRedirects({ graphql, actions })
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
    console.log(mdxResult.errors)
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
    console.log(mdxResult.errors)
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
