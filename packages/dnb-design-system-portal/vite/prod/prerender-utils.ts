/**
 * Typed helpers for the SSG prerender pipeline.
 *
 * The HTML builders (injectHtml, buildRedirectHtml) live in the plain
 * ESM module ./prerender-html.mjs so the prerender.mjs build entry —
 * which runs under plain Node and cannot import .ts — shares the exact
 * same code instead of re-inlining it. This file adds TypeScript types,
 * keeps the route/manifest helpers, and supplies getContentScript() so
 * callers keep the ergonomic injectHtml signature.
 */

import path from 'node:path'
import { getContentScript } from '@dnb/eufemia/src/shared/ColorSchemeScript'
import {
  injectHtml as injectHtmlImpl,
  buildRedirectHtml,
} from './prerender-html.mjs'

// Re-export the shared redirect builder unchanged (see prerender-html.mjs).
export { buildRedirectHtml }

export type RouteEntry = {
  path?: string
  children?: RouteEntry[]
  [key: string]: unknown
}

export type SSRManifest = Record<string, string[]>

export type ClientManifestEntry = {
  file: string
  name?: string
  src?: string
  isDynamicEntry?: boolean
  imports?: string[]
  css?: string[]
}

export type ClientManifest = Record<string, ClientManifestEntry>

export type MdxNode = {
  fields: { slug: string }
  frontmatter: Record<string, unknown>
}

export type PageMeta = {
  title: string
  description: string
}

/**
 * Collect all URLs to prerender from the route list.
 *
 * Filters out catch-all routes (`*`) and 404 routes.
 * Always includes the root `/`.
 */
export function collectUrls(routes: RouteEntry[]): string[] {
  const urls = ['/']

  const visitRoutes = (entries: RouteEntry[]) => {
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
export function getPageMeta(
  url: string,
  allMdxNodes: MdxNode[]
): PageMeta {
  const slug = url.replace(/^\/|\/$/g, '')
  const node = allMdxNodes.find((n) => n.fields.slug === slug)

  if (!node) {
    return { title: '', description: '' }
  }

  let title = (node.frontmatter.title as string) || ''
  let description = (node.frontmatter.description as string) || ''

  // If no title, check parent page (tab sub-pages inherit from parent)
  if (!title) {
    const parentSlug = slug.split('/').slice(0, -1).join('/')
    const parent = allMdxNodes.find((n) => n.fields.slug === parentSlug)

    if (parent?.frontmatter?.title) {
      title = parent.frontmatter.title as string

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
        const tabs =
          (parent.frontmatter.tabs as typeof defaultTabs) || defaultTabs
        const tab = tabs.find((t) => t.key === tabKey)

        if (tab?.title) {
          title = `${parent.frontmatter.title} → ${tab.title}`
        }
      }
    }

    if (!description && parent?.frontmatter?.description) {
      description = parent.frontmatter.description as string
    }
  }

  return { title, description }
}

/**
 * Resolve the markdown alternate link path for a URL.
 *
 * The LLM metadata generator creates .md files for "entry" MDX files
 * (those with a title in frontmatter), not for tab sub-pages. For tab
 * pages, we walk up the slug path to find the nearest entry parent.
 */
export function getMdPath(
  url: string,
  allMdxNodes: MdxNode[]
): string | null {
  const slug = url.replace(/^\/|\/$/g, '')

  if (!slug) {
    return null
  }

  // Build a set of entry slugs — pages that get their own .md file
  // from the LLM metadata generator. Entry pages have a title in
  // their frontmatter; tab sub-pages only have showTabs.
  const entrySlugs = new Set<string>()
  for (const node of allMdxNodes) {
    const s = node.fields.slug
    if (node.frontmatter.title) {
      entrySlugs.add(s)
    }
  }

  if (entrySlugs.has(slug)) {
    return '/' + slug + '.md'
  }

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
export function getRoutePreloads(
  url: string,
  ssrManifest: SSRManifest,
  clientManifest?: ClientManifest | null
): { js: string[]; css: string[] } {
  const routePath = url.replace(/^\/|\/$/g, '') || 'index'

  const candidates = [
    `../../src/docs/${routePath}.mdx`,
    `../../src/docs/${routePath}.tsx`,
    `../../src/docs/${routePath}/index.mdx`,
    `../../src/docs/${routePath}/index.tsx`,
  ]

  const jsPreloads = new Set<string>()
  const cssPreloads = new Set<string>()

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
    const fileToEntry = new Map<string, ClientManifestEntry>()
    for (const entry of Object.values(clientManifest)) {
      if (entry.file) {
        fileToEntry.set('/' + entry.file, entry)
      }
    }

    const visited = new Set<string>()
    const queue = Array.from(jsPreloads)

    while (queue.length > 0) {
      const chunk = queue.shift()!
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
 * Inject prerendered HTML, styles, meta tags, and preloads into the
 * client template.
 *
 * Thin typed facade over injectHtml in ./prerender-html.mjs: it only
 * supplies the color-scheme content script (which prevents a dark-mode
 * FOUC) so callers keep the ergonomic signature. All HTML-building
 * logic lives in the shared module — do not duplicate it here.
 */
export function injectHtml(
  template: string,
  appHtml: string,
  preloads: { js: string[]; css: string[] },
  emotionCss?: string,
  meta?: {
    url: string
    title: string
    description: string
    mdPath?: string
  },
  themeCssPaths?: Record<string, string>
): string {
  return injectHtmlImpl(
    template,
    appHtml,
    preloads,
    getContentScript(),
    emotionCss,
    meta,
    themeCssPaths
  )
}

/**
 * Resolve a URL to its output file path in the dist directory.
 *
 * Maps clean URLs to directory-style index.html files:
 *   /                → dist/index.html
 *   /foo/bar/        → dist/foo/bar/index.html
 *   /404.html        → dist/404.html
 */
export function getOutputPath(url: string, outDir: string): string {
  if (url === '/404.html') {
    return path.resolve(outDir, '404.html')
  }

  if (url === '/') {
    return path.resolve(outDir, 'index.html')
  }

  const cleanPath = url.replace(/^\/|\/$/g, '')
  return path.resolve(outDir, cleanPath, 'index.html')
}
