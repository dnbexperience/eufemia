/**
 * Portal data query layer.
 *
 * Provides useStaticQuery and graphql for querying MDX page data,
 * plus navigate for imperative routing outside React components.
 */

import { useNavigate } from 'react-router-dom'
import { allMdxNodes } from 'virtual:portal-pages'

// graphql tag — preserves the query string so useStaticQuery can
// extract content path filters from it.
export function graphql(strings: TemplateStringsArray) {
  return strings.join('')
}

// useStaticQuery returns the pre-computed allMdx data.
// Gatsby's GraphQL layer filters (e.g. title != null, draft != true) –
// replicate the most common filters here so portal code that relies on
// them (SidebarMenu, ListComponents) doesn't crash on missing titles.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStaticQuery(query: unknown): any {
  const queryStr = typeof query === 'string' ? query : ''

  const siteData = {
    pathPrefix: '/',
    siteMetadata: {
      title: 'DNB Design System',
      name: 'Eufemia',
      description:
        'Eufemia Design System is the go-to place for all who has to design, develop and make digital WEB applications for DNB.',
      repoUrl: 'https://github.com/dnbexperience/eufemia/',
    },
  }

  // Detect all allMdx queries in the GraphQL string, including aliases
  // e.g. "categories: allMdx(filter: {...})" or plain "allMdx { edges ... }"
  const allMdxPattern =
    /(?:(\w+)\s*:\s*)?allMdx\s*(?:\(([^)]*(?:\([^)]*\))*[^)]*)\))?\s*\{/g
  const allMdxQueries: Array<{ alias: string; filterStr: string }> = []
  let match: RegExpExecArray | null

  while ((match = allMdxPattern.exec(queryStr)) !== null) {
    allMdxQueries.push({
      alias: match[1] || 'allMdx',
      filterStr: match[2] || '',
    })
  }

  const result: Record<string, unknown> = { site: siteData }

  // If no allMdx queries found, still return allMdx for backwards compat
  if (allMdxQueries.length === 0) {
    result.allMdx = { edges: buildFilteredEdges(queryStr) }
  }

  for (const { alias, filterStr } of allMdxQueries) {
    result[alias] = { edges: buildFilteredEdges(queryStr, filterStr) }
  }

  return result
}

function buildFilteredEdges(
  queryStr: string,
  filterStr = ''
): Array<{ node: Record<string, unknown> }> {
  let filtered = (allMdxNodes as Record<string, unknown>[]).slice()

  // Apply title != null and draft != true by default for most queries
  // (unless the query is specifically about slug-based filtering only)
  const slugInMatch = filterStr.match(/slug:\s*\{\s*in:\s*\[([^\]]+)\]/)
  // Only filter by title/draft when the query explicitly asks for it
  // (e.g. SidebarMenu uses "title: { ne: null }" and "draft: { ne: true }").
  // PortalLayout's query has no such filters and needs ALL nodes including
  // sub-pages like demos.mdx that lack a title.
  const hasTitleFilter =
    filterStr.includes('title') || queryStr.includes('title: {')
  const hasDraftFilter =
    filterStr.includes('draft') || queryStr.includes('draft: {')

  if (!slugInMatch && (hasTitleFilter || hasDraftFilter)) {
    filtered = filtered.filter((node) => {
      const fm = node.frontmatter as Record<string, unknown> | undefined
      if (hasTitleFilter && !fm?.title) return false
      if (hasDraftFilter && fm?.draft === true) return false
      return true
    })
  }

  // Handle slug: { in: ["a", "b", ...] } filter
  if (slugInMatch) {
    const slugValues = slugInMatch[1]
      .replace(/"/g, '')
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
    filtered = filtered.filter((node) => {
      const slug = (node.fields as Record<string, unknown>)?.slug as string
      return slug && slugValues.includes(slug)
    })
  }

  // Extract contentFilePath regex/glob filters from the query string
  // and filter nodes by slug path accordingly.
  const regexMatch = queryStr.match(
    /contentFilePath:\s*\{\s*regex:\s*"([^"]+)"/
  )
  const globMatch = queryStr.match(
    /contentFilePath:\s*\{\s*glob:\s*"([^"]+)"/
  )

  if (regexMatch) {
    try {
      // Gatsby wraps regex in slashes: "/pattern/" — strip them
      const rawPattern = regexMatch[1].replace(/^\/|\/$/g, '')
      const re = new RegExp(rawPattern)
      filtered = filtered.filter((node) => {
        const slug = (node.fields as Record<string, unknown>)
          ?.slug as string
        return slug && re.test(slug)
      })
    } catch {
      // ignore invalid regex
    }
  } else if (globMatch) {
    // Convert simple glob like "**/uilib/elements/*" to a slug prefix
    const globPattern = globMatch[1]
    const prefix = globPattern.replace(/^\*\*\//, '').replace(/\/\*$/, '')
    filtered = filtered.filter((node) => {
      const slug = (node.fields as Record<string, unknown>)?.slug as string
      return slug && slug.startsWith(prefix + '/')
    })
  }

  // Apply hideInMenu filter only when the query uses it as a Gatsby filter
  // criterion (e.g. "hideInMenu: { ne: true }"), not when it just reads the field.
  if (
    filterStr.includes('hideInMenu') ||
    queryStr.includes('hideInMenu: {')
  ) {
    filtered = filtered.filter((node) => {
      const fm = node.frontmatter as Record<string, unknown> | undefined
      return fm?.hideInMenu !== true
    })
  }

  // Sort by order ASC then title ASC if query requests sorting
  if (queryStr.includes('order: ASC')) {
    filtered = [...filtered].sort((a, b) => {
      const aFm = a.frontmatter as Record<string, unknown>
      const bFm = b.frontmatter as Record<string, unknown>
      const aOrder = (aFm?.order as number) ?? 999
      const bOrder = (bFm?.order as number) ?? 999
      if (aOrder !== bOrder) return aOrder - bOrder
      const aTitle = ((aFm?.title as string) ?? '').toLowerCase()
      const bTitle = ((bFm?.title as string) ?? '').toLowerCase()
      return aTitle.localeCompare(bTitle)
    })
  }

  // Compute siblings (parent pages) for each node, replicating Gatsby's
  // createResolvers siblings resolver that traverses up the slug path.
  const allNodes = allMdxNodes as Record<string, unknown>[]
  if (queryStr.includes('siblings')) {
    for (const node of filtered) {
      const slug = (node.fields as Record<string, unknown>)?.slug as string
      if (typeof slug === 'string') {
        const parts = slug.split('/')
        const parents: Record<string, unknown>[] = []

        for (let i = 0; i < parts.length; i++) {
          const parentSlug = parts.slice(0, -(i + 1)).join('/')
          if (!parentSlug) {
            continue
          }

          const parent = allNodes.find(
            (n) =>
              (n.fields as Record<string, unknown>)?.slug === parentSlug
          )
          if (parent) {
            parents.push(parent)
          }
        }

        node.siblings = parents
      }
    }
  }

  return filtered.map((node) => ({ node }))
}

// navigate shim using react-router
let _navigate: ReturnType<typeof useNavigate> | null = null

export function navigate(to: string, options?: { replace?: boolean }) {
  if (_navigate) {
    _navigate(to, options)
  } else {
    window.location.href = to
  }
}

/**
 * Hook to capture navigate function from react-router context.
 * Must be called once inside the Router.
 */
export function useNavigateSetup() {
  _navigate = useNavigate()
}
