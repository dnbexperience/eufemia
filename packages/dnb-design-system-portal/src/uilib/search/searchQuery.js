/**
 * Search queries
 *
 */

const { getCurrentBranchName } = require('../utils/git')
const { makeSlug } = require('../utils/slug')

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
            search
          }
          headings {
            value
            depth
          }
          # use the first children as the category
          children {
            ... on Mdx {
              fields {
                slug
                tag
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  }
`

const flatten = arr =>
  arr
    .filter(
      ({
        node: {
          fields: { slug },
          frontmatter: { search }
        }
      }) => !slug.includes('not_in_use') && search !== false
    )
    .map(
      ({ node: { children, fields, frontmatter, headings, ...rest } }) => {
        if (headings && Array.isArray(headings)) {
          headings = headings.map(item => ({
            ...item,
            slug: makeSlug(item.value)
          }))
        }

        const result = {
          ...fields,
          ...frontmatter,
          ...rest,
          headings
        }

        if (children[0]) {
          const { fields, frontmatter, ...rest } = children[0]
          result.category = {
            ...fields,
            ...frontmatter,
            ...rest
          }
        }

        return result
      }
    )

const queries =
  getCurrentBranchName() === 'release'
    ? [
        {
          query: docsQuery,
          transformer: ({ data }) => flatten(data.pages.edges),
          indexName:
            process.env.NODE_ENV === 'production'
              ? 'prod_eufemia_docs'
              : 'dev_eufemia_docs'
        }
      ]
    : null

module.exports = queries
