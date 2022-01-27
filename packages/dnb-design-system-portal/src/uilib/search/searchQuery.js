/**
 * Search queries
 *
 */

const getCurrentBranchName = require('current-git-branch')
const { makeSlug } = require('../utils/slug')
const { getIndexName, runQueriesWhen } = require('./searchHelpers')

require('dotenv').config()

const docsQuery = /* GraphQL */ `
  {
    pages: allMdx {
      edges {
        node {
          objectID: id
          slug
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
          # use the first siblings as the category
          siblings {
            slug
            frontmatter {
              title
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
          slug,
          frontmatter: { skipSearch },
        },
      }) => !slug.includes('not_in_use') && skipSearch !== true
    )
    .map(
      ({ node: { siblings, slug, frontmatter, headings, ...rest } }) => {
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
            } else if (Array.isArray(siblings)) {
              const category = siblings
                .reverse()
                .find(({ slug: _slug }) => slug.includes(_slug))

              if (category) {
                const {
                  frontmatter: { title, search },
                } = category

                let newTitle = title || search

                if (first && first.depth === 2) {
                  headings.shift()
                  // eslint-disable-next-line no-irregular-whitespace
                  newTitle = `${newTitle} → ${first.value}`
                }

                frontmatter = {
                  ...frontmatter,
                  title: newTitle,
                }
              }
            }
          }
        }

        // bundle our whole request
        const result = {
          slug,
          ...frontmatter,
          ...rest,
          headings,
        }

        if (!hasTitle(result) && !hasDescription(result)) {
          return null
        }

        // handle category
        if (siblings[0]) {
          const { slug, frontmatter, ...rest } = siblings[0]
          result.category = {
            slug,
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

const currentBranch = getCurrentBranchName()

// Queries for Algolia search including updated pages
// When queries=null, the Algolia search will not be updated with the newest pages
const queries = runQueriesWhen(currentBranch)
  ? [
      {
        query: docsQuery,
        transformer: ({ data }) => flatten(data.pages.edges),
        indexName: getIndexName(currentBranch),
      },
    ]
  : null

module.exports = queries
