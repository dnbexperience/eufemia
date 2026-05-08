/**
 * Algolia record helpers for the portal search index.
 *
 * Shared between push-algolia.mjs and the existing portal search
 * code. Kept as plain JS so Node can import it directly without
 * a TypeScript build step.
 */

import GHSlugger from 'github-slugger'

const slugger = new GHSlugger()

export function makeSlug(value) {
  slugger.reset()
  return slugger.slug(String(value))
}

export const excludedSlugPartials = [
  'uilib/about-the-lib/releases/',
  'EUFEMIA_CHANGELOG',
]

const hasTitle = (record) => String(record.title || '').length > 0
const hasSearch = (record) => String(record.search || '').length > 0
const hasDescription = (record) =>
  String(record.description || '').length > 0

export function shouldIncludeInAlgolia({ slug, draft = undefined }) {
  return (
    !slug.includes('not_in_use') &&
    !excludedSlugPartials.some((partial) => slug.includes(partial)) &&
    draft !== true
  )
}

function normalizeHeadings(headings = []) {
  if (!Array.isArray(headings)) {
    return []
  }

  return headings.map((item) => ({
    ...item,
    slug: item.slug || makeSlug(item.value),
  }))
}

export function buildAlgoliaRecord({
  siblings = [],
  fields: { slug },
  frontmatter,
  headings,
  ...rest
}) {
  let nextFrontmatter = { ...frontmatter }
  let nextHeadings = normalizeHeadings(headings)

  if (!hasTitle(nextFrontmatter)) {
    if (hasSearch(nextFrontmatter)) {
      nextFrontmatter = {
        ...nextFrontmatter,
        title: nextFrontmatter.search,
        search: null,
      }
    } else {
      const first = nextHeadings[0]

      if (first && first.depth === 1) {
        nextHeadings = nextHeadings.slice(1)
        nextFrontmatter = {
          ...nextFrontmatter,
          title: first.value,
        }
      } else if (Array.isArray(siblings)) {
        const category = siblings.find(
          (sibling) =>
            sibling &&
            sibling.fields &&
            sibling.frontmatter &&
            slug.includes(sibling.fields.slug) &&
            sibling.frontmatter.title
        )

        let nextTitle = null

        if (category) {
          const {
            frontmatter: { title, search },
          } = category

          nextTitle = title || search
        }

        if (first && first.depth === 2) {
          nextHeadings = nextHeadings.slice(1)
          nextTitle = nextTitle
            ? `${nextTitle} \u2192 ${first.value}`
            : first.value
        }

        if (nextTitle) {
          nextFrontmatter = {
            ...nextFrontmatter,
            title: nextTitle,
          }
        }
      }
    }
  }

  const result = {
    slug,
    ...nextFrontmatter,
    ...rest,
    headings: nextHeadings,
  }

  if (!hasTitle(result) && !hasDescription(result)) {
    return null
  }

  if (siblings[0]) {
    const {
      fields: { slug: categorySlug },
      frontmatter: categoryFrontmatter,
      ...categoryRest
    } = siblings[0]

    result.category = {
      slug: categorySlug,
      ...categoryFrontmatter,
      ...categoryRest,
    }
  }

  return result
}

export function findAncestorPages(slug, nodes = []) {
  return nodes
    .filter(({ fields, frontmatter }) => {
      const candidateSlug = fields?.slug
      const candidateTitle = frontmatter?.title || frontmatter?.search

      if (!candidateSlug || !candidateTitle) {
        return false
      }

      return slug !== candidateSlug && slug.startsWith(`${candidateSlug}/`)
    })
    .sort((a, b) => b.fields.slug.length - a.fields.slug.length)
}
