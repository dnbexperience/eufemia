/**
 * Search queries
 *
 */

const docsQuery = /* GraphQL */ `
  {
    pages: allMarkdownRemark(
      filter: {
        # fileAbsolutePath: { regex: "/components/" },
        frontmatter: {}
      }
    ) {
      edges {
        node {
          objectID: id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest
  }))

const queries = [
  {
    query: docsQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName:
      process.env.NODE_ENV === 'production'
        ? 'prod_eufemia_docs'
        : 'dev_eufemia_docs'
  }
]

module.exports = queries
