/**
 * Shared route/manifest helpers for the SSG prerender pipeline.
 *
 * Plain ESM so BOTH the prerender.mjs build entry (plain Node) and the
 * typed prerender-utils.ts facade import one implementation instead of
 * keeping hand-synced copies. TypeScript types for these helpers live in
 * the prerender-utils.ts facade, which re-exports them with annotations.
 */

import path from 'node:path'

/**
 * Collect all URLs to prerender from the route list.
 *
 * Filters out catch-all routes (`*`) and 404 routes.
 * Always includes the root `/`.
 */
export function collectUrls(routes) {
  const urls = ['/']

  const visitRoutes = (entries) => {
    for (const route of entries) {
      if (
        route.path &&
        route.path !== '*' &&
        !route.path.startsWith('/404')
      ) {
        const routePath = route.path.endsWith('/')
          ? route.path
          : route.path + '/'

        if (!urls.includes(routePath)) {
          urls.push(routePath)
        }
      }

      if (Array.isArray(route.children) && route.children.length > 0) {
        visitRoutes(route.children)
      }
    }
  }

  visitRoutes(routes)

  return urls
}

/**
 * Resolve per-page SEO metadata (title + description) from allMdxNodes.
 *
 * For tab sub-pages without their own title, looks up the parent
 * page's title and constructs "Parent → Tab" format.
 */
export function getPageMeta(url, allMdxNodes) {
  const slug = url.replace(/^\/|\/$/g, '')
  const node = allMdxNodes.find((n) => n.fields.slug === slug)

  if (!node) {
    return { title: '', description: '' }
  }

  let title = node.frontmatter.title || ''
  let description = node.frontmatter.description || ''

  // If no title, check parent page (tab sub-pages inherit from parent)
  if (!title) {
    const parentSlug = slug.split('/').slice(0, -1).join('/')
    const parent = allMdxNodes.find((n) => n.fields.slug === parentSlug)

    if (parent?.frontmatter?.title) {
      title = parent.frontmatter.title

      // For tab pages (showTabs but no own title), construct
      // "ParentTitle → TabTitle" to match the client-side title.
      if (node.frontmatter.showTabs) {
        const tabKey = '/' + slug.split('/').pop()
        const defaultTabs = [
          { title: 'Info', key: '/info' },
          { title: 'Demos', key: '/demos' },
          { title: 'Properties', key: '/properties' },
          { title: 'Events', key: '/events' },
        ]
        const tabs = parent.frontmatter.tabs || defaultTabs
        const tab = tabs.find((t) => t.key === tabKey)

        if (tab?.title) {
          title = `${parent.frontmatter.title} → ${tab.title}`
        }
      }
    }

    if (!description && parent?.frontmatter?.description) {
      description = parent.frontmatter.description
    }
  }

  return { title, description }
}

/**
 * Resolve the markdown alternate link path for a URL.
 *
 * Only /uilib/ pages get markdown links. The LLM metadata generator
 * creates .md files for "entry" MDX files (those with a title in
 * frontmatter), not for tab sub-pages. For tab pages, we walk up
 * the slug path to find the nearest entry parent.
 *
 * Returns the .md path, or null if no link should be emitted.
 */
export function getMdPath(url, allMdxNodes) {
  // Must match LLM_DOCS_SLUG_PREFIX from eufemia-llm-metadata
  const prefix = 'uilib'

  if (!url.startsWith(`/${prefix}/`)) {
    return null
  }

  const slug = url.replace(/^\/|\/$/g, '')

  // Build a set of entry slugs — pages that get their own .md file
  // from the LLM metadata generator. Entry pages have a title in
  // their frontmatter; tab sub-pages only have showTabs.
  const entrySlugs = new Set()
  for (const node of allMdxNodes) {
    const s = node.fields.slug
    if (s.startsWith(`${prefix}/`) && node.frontmatter.title) {
      entrySlugs.add(s)
    }
  }

  // If this slug is an entry, use it directly
  if (entrySlugs.has(slug)) {
    return '/' + slug + '.md'
  }

  // Walk up the path to find the nearest entry parent
  const parts = slug.split('/')
  for (let i = parts.length - 1; i >= 1; i--) {
    const parentSlug = parts.slice(0, i).join('/')
    if (entrySlugs.has(parentSlug)) {
      return '/' + parentSlug + '.md'
    }
  }

  return null
}

/**
 * Map a URL to its per-route preload assets from the SSR manifest.
 * Returns JS files for modulepreload and CSS files for stylesheet links.
 *
 * When a client manifest is provided, performs a BFS through chunk
 * imports to discover transitive CSS dependencies. Without this,
 * CSS modules imported by non-route source files (e.g. shared menu
 * components) would only load after JS executes, causing a layout
 * flicker on prerendered pages.
 */
export function getRoutePreloads(url, ssrManifest, clientManifest) {
  const routePath = url.replace(/^\/|\/$/g, '') || 'index'

  const candidates = [
    `../../src/docs/${routePath}.mdx`,
    `../../src/docs/${routePath}.tsx`,
    `../../src/docs/${routePath}/index.mdx`,
    `../../src/docs/${routePath}/index.tsx`,
  ]

  const jsPreloads = new Set()
  const cssPreloads = new Set()

  for (const candidate of candidates) {
    const assets = ssrManifest[candidate]
    if (assets) {
      for (const asset of assets) {
        if (asset.endsWith('.js')) {
          jsPreloads.add(asset)
        } else if (asset.endsWith('.css')) {
          cssPreloads.add(asset)
        }
      }
    }
  }

  if (clientManifest && jsPreloads.size > 0) {
    const fileToEntry = new Map()
    for (const entry of Object.values(clientManifest)) {
      if (entry.file) {
        fileToEntry.set('/' + entry.file, entry)
      }
    }

    const visited = new Set()
    const queue = Array.from(jsPreloads)

    while (queue.length > 0) {
      const chunk = queue.shift()
      if (visited.has(chunk)) {
        continue
      }
      visited.add(chunk)

      const entry = fileToEntry.get(chunk)
      if (!entry) {
        continue
      }

      if (entry.css) {
        for (const css of entry.css) {
          cssPreloads.add('/' + css)
        }
      }

      if (entry.imports) {
        for (const imp of entry.imports) {
          if (imp === 'index.html') {
            continue
          }
          const impEntry = clientManifest[imp]
          if (impEntry?.file) {
            const impPath = '/' + impEntry.file
            if (!visited.has(impPath)) {
              queue.push(impPath)
            }
          }
        }
      }
    }
  }

  return { js: Array.from(jsPreloads), css: Array.from(cssPreloads) }
}

/**
 * Resolve a URL to its output file path in the dist directory.
 *
 * Maps clean URLs to directory-style index.html files:
 *   /                → dist/index.html
 *   /foo/bar/        → dist/foo/bar/index.html
 *   /404.html        → dist/404.html
 */
export function getOutputPath(url, outDir) {
  if (url === '/404.html') {
    return path.resolve(outDir, '404.html')
  }

  if (url === '/') {
    return path.resolve(outDir, 'index.html')
  }

  const cleanPath = url.replace(/^\/|\/$/g, '')
  return path.resolve(outDir, cleanPath, 'index.html')
}
