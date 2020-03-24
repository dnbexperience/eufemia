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

        // bundle our whole request
        const result = {
          ...fields,
          ...frontmatter,
          ...rest,
          headings
        }

        // has an empty, not valid title, then we grap the first heading (h1)
        if (!result.title && headings && headings[0]) {
          result.title = headings[0].value
        }

        // handle category
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

const currentBranch = getCurrentBranchName()
const queries = /^(release|beta)$/.test(currentBranch)
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
