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
            skipSearch
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

const flatten = (arr) =>
  arr
    .filter(
      ({
        node: {
          fields: { slug },
          frontmatter: { skipSearch },
        },
      }) => !slug.includes('not_in_use') && skipSearch !== true
    )
    .map(
      ({ node: { children, fields, frontmatter, headings, ...rest } }) => {
        if (headings && Array.isArray(headings)) {
          headings = headings.map((item) => ({
            ...item,
            slug: makeSlug(item.value),
          }))

          // because we need also pages form Tabs, we use here the h2 to make the title
          // also, h1 is there an object
          const first = headings[0]

          // has an empty, not valid title, then we grab the first heading (h1)
          if (!hasTitle(frontmatter)) {
            if (hasSearch(frontmatter)) {
              frontmatter = {
                ...frontmatter,
                title: frontmatter.search,
                search: null,
              }
            } else if (first && first.depth === 1) {
              headings.shift()
              frontmatter = {
                ...frontmatter,
                title: first.value,
              }
            } else if (Array.isArray(children)) {
              const category = children
                .reverse()
                .find(({ fields: { slug } }) => fields.slug.includes(slug))

              const {
                frontmatter: { title, search },
              } = category

              let newTitle = title || search

              if (first && first.depth === 2) {
                headings.shift()
                newTitle = `${newTitle} > ${first.value}`
              }

              frontmatter = {
                ...frontmatter,
                title: newTitle,
              }
            }
          }
        }

        // bundle our whole request
        const result = {
          ...fields,
          ...frontmatter,
          ...rest,
          headings,
        }

        if (!hasTitle(result) && !hasDescription(result)) {
          return null
        }

        // handle category
        if (children[0]) {
          const { fields, frontmatter, ...rest } = children[0]
          result.category = {
            ...fields,
            ...frontmatter,
            ...rest,
          }
        }

        return result
      }
    )
    .filter(Boolean)

const hasTitle = (r) => String(r.title || '').length > 0
const hasSearch = (r) => String(r.search || '').length > 0
const hasDescription = (r) => String(r.description || '').length > 0

const dev = false
const currentBranch = getCurrentBranchName()
const queries =
  dev || /^(release|beta|portal)$/.test(currentBranch)
    ? [
        {
          query: docsQuery,
          transformer: ({ data }) => flatten(data.pages.edges),
          indexName:
            dev || process.env.NODE_ENV !== 'production'
              ? 'dev_eufemia_docs'
              : /^(beta)$/.test(currentBranch)
              ? 'beta_eufemia_docs'
              : 'prod_eufemia_docs',
        },
      ]
    : null

module.exports = queries
