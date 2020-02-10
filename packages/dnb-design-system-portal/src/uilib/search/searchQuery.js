/**
 * Search queries
 *
 */

const { getCurrentBranchName } = require('../utils/gitUtils')

const docsQuery = /* GraphQL */ `
  {
    pages: allMdx {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          frontmatter {
            title
            description
            status
          }
          children {
            ... on Mdx {
              fields {
                slug
                tag
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
      }
    }
  }
`

const flatten = arr =>
  arr.map(({ node: { children, fields, frontmatter, ...rest } }) => {
    const category =
      children[0] && children[0].tag === 'category' ? children[0] : null

    const result = {
      url: `/${fields.slug}`,
      category,
      ...fields,
      ...frontmatter,
      ...rest
    }

    return result
  })

const transformer = () => {
  return ({ data }) => flatten(data.pages.edges)
}

const queries =
  getCurrentBranchName() === 'release'
    ? [
        {
          query: docsQuery,
          transformer,
          indexName:
            process.env.NODE_ENV === 'production'
              ? 'prod_eufemia_docs'
              : 'dev_eufemia_docs'
        }
      ]
    : []

module.exports = queries
