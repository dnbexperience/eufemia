/**
 * Gatsby Node setup
 *
 */

const path = require('path')
const {
  copyContentIntoPublic
} = require('./scripts/copyContentIntoPublic')

copyContentIntoPublic().then(() => {
  console.log('Copied "public folder" successful')
})

exports.createPages = ({ graphql, actions }) =>
  new Promise(async (resolve, reject) => {
    const mdxResult = await graphql(/* GraphQL */ `
      {
        allMdx {
          edges {
            node {
              id
              fields {
                id
                slug
              }
              code {
                scope
              }
            }
          }
        }
      }
    `)

    if (mdxResult.errors) {
      console.log(mdxResult.errors)
      return reject(mdxResult.errors)
    }

    const { createPage } = actions
    const { edges } = mdxResult.data.allMdx

    createPages(createPage, edges)

    resolve()
  })

const createPages = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node

    createPage({
      path: node.fields.slug || '/',
      component: path.resolve('./src/templates/mdx.js'),
      context: {
        id: node.id,
        prev,
        next
      }
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
        Pages: path.resolve(__dirname, 'src/pages'),
        Tags: path.resolve(__dirname, 'src/shared/tags'),
        Parts: path.resolve(__dirname, 'src/shared/parts')
      }
    }
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    let slug = parent.relativePath.replace(parent.ext, '')

    if (slug === 'index') {
      slug = '/'
    }

    createNodeField({
      name: 'slug',
      node,
      value: `/${slug}`
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value:
        node.frontmatter.title ||
        // parent.name.replace(/^[a-z]/, parent.name[0].toUpperCase()) ||
        null
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description
    })

    createNodeField({
      name: 'menuTitle',
      node,
      value: node.frontmatter.menuTitle
    })

    // createNodeField({
    //   name: 'header',
    //   node,
    //   value: node.frontmatter.header
    // })

    createNodeField({
      name: 'order',
      node,
      value: node.frontmatter.order
    })

    createNodeField({
      name: 'draft',
      node,
      value: node.frontmatter.draft
    })

    createNodeField({
      name: 'status',
      node,
      value: node.frontmatter.status
    })

    createNodeField({
      name: 'icon',
      node,
      value: node.frontmatter.icon
    })

    createNodeField({
      name: 'fullscreen',
      node,
      value: node.frontmatter.fullscreen
    })

    // File
  } else if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    // const slug = `/${path.basename(parsedFilePath.dir)}/`
    const slug = `${parsedFilePath.dir.split('/src/pages')[1]}/`

    createNodeField({ node, name: 'slug', value: slug })
  }
}
