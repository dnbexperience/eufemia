/**
 * Pure utility functions for the SSG prerender pipeline.
 *
 * These functions are extracted from the prerender script for
 * independent unit testing. The prerender.mjs orchestrator
 * uses the same logic inline (since it's a plain .mjs script
 * that can't import .ts directly).
 */

import path from 'node:path'
import { getContentScript } from '@dnb/eufemia/src/shared/ColorSchemeScript'

export type RouteEntry = {
  path?: string
  [key: string]: unknown
}

export type SSRManifest = Record<string, string[]>

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

  for (const route of routes) {
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
  }

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
 */
export function getRoutePreloads(
  url: string,
  ssrManifest: SSRManifest
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

  return { js: Array.from(jsPreloads), css: Array.from(cssPreloads) }
}

/**
 * Inject prerendered HTML, styles, meta tags, and preloads into the
 * client template.
 *
 * - Replaces the empty `<div id="root"></div>` with the rendered content
 * - Injects SEO meta tags (title, description, Open Graph) into `<head>`
 * - Injects Emotion CSS extracted during SSR into `<head>`
 * - Adds `<link rel="stylesheet">` tags for route-specific CSS chunks
 * - Adds `<link rel="modulepreload">` tags for route-specific JS chunks
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
  // React 19 injects <link rel="preload"> elements inline during
  // renderToString for resources like images. Strip them from the app
  // HTML and move them to <head> so they don't break client-side
  // hydration (React can't match the DOM when unexpected <link>
  // elements appear before the root component's first element).
  const reactPreloadLinks: string[] = []
  appHtml = appHtml.replace(/<link rel="preload"[^>]*\/>/g, (match) => {
    reactPreloadLinks.push(match)
    return ''
  })

  // StaticRouterProvider injects a <script> with hydration data that
  // is not needed for our hydration approach. Strip it so it doesn't
  // appear inside the root container as unexpected DOM content.
  appHtml = appHtml.replace(
    /<script>window\.__staticRouterHydrationData\s*=[^<]*<\/script>/,
    ''
  )

  // React's renderToString serializes CSS custom properties in inline
  // styles without spaces (e.g. "--var:value") while the browser
  // normalizes them with spaces ("--var: value;"). This causes
  // hydration mismatches. Normalize the format to match the browser.
  appHtml = appHtml.replace(
    /style="([^"]*)"/g,
    (_match: string, styleContent: string) => {
      const normalized = styleContent
        .split(';')
        .filter(Boolean)
        .map((decl: string) => {
          const colonIdx = decl.indexOf(':')
          if (colonIdx === -1) return decl
          const prop = decl.slice(0, colonIdx).trim()
          const value = decl.slice(colonIdx + 1).trim()
          return `${prop}: ${value}`
        })
        .join('; ')
      return normalized ? `style="${normalized};"` : 'style=""'
    }
  )

  // Inject the prerendered HTML into the root div, followed by a
  // blocking script that swaps color-scheme classes on Theme elements
  // before the browser paints — preventing a dark-mode FOUC.
  const contentScript = getContentScript()

  // Restore sidebar scroll position before first paint so the menu
  // doesn't flash at the top before jumping to the saved position.
  const scrollRestoreScript = `(function(){try{var el=document.getElementById('portal-sidebar-menu');if(el){var s=parseFloat(localStorage.getItem('scroll-#portal-sidebar-menu')||'0');if(s){el.style.scrollBehavior='auto';el.scrollTop=s;el.style.scrollBehavior=''}}}catch(e){}})()`

  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>\n\t<script>${contentScript};${scrollRestoreScript}</script>`
  )

  // Inject <link> tags for ALL brand theme CSS chunks.
  // The default theme (ui) is enabled; others are disabled.
  // An early inline script reads localStorage and swaps them
  // before the browser paints — preventing a flash of the wrong brand.
  if (themeCssPaths && Object.keys(themeCssPaths).length > 0) {
    const defaultTheme = 'ui'
    const linkTags = Object.entries(themeCssPaths)
      .map(([name, href]) => {
        const disabled = name !== defaultTheme ? ' disabled' : ''
        return `    <link rel="stylesheet" crossorigin href="${href}" data-eufemia-theme="${name}"${disabled}>`
      })
      .join('\n')

    const themeScript = `<script>(function(){try{var t=JSON.parse(localStorage.getItem('eufemia-theme')||'{}');var p=new URLSearchParams(location.search);var n=p.get('eufemia-theme')||t.name||'${defaultTheme}';var links=document.querySelectorAll('link[data-eufemia-theme]');for(var i=0;i<links.length;i++){links[i].disabled=links[i].getAttribute('data-eufemia-theme')!==n}document.body.classList.add('eufemia-theme__'+n)}catch(e){}})()</script>`

    html = html.replace('</head>', `${linkTags}\n  </head>`)
    html = html.replace('</body>', `${themeScript}\n</body>`)
  }

  // Inject per-page SEO meta tags (title, description, Open Graph)
  if (meta) {
    const siteUrl = 'https://eufemia.dnb.no'
    const defaultDescription =
      'Eufemia Design System is the go-to place for all who has to design, develop and make digital WEB applications for DNB.'
    const formattedTitle = meta.title
      ? `${meta.title} | Eufemia`
      : 'Eufemia'
    const desc = meta.description || defaultDescription
    const fullUrl = `${siteUrl}${meta.url}`
    const ogImage = `${siteUrl}/dnb/og-image.png`

    // Replace existing title and meta description from the template
    html = html.replace(
      /<title id="head-title">[^<]*<\/title>/,
      `<title id="head-title">${formattedTitle}</title>`
    )
    html = html.replace(
      /<meta id="head-description"[^>]*\/?\s*>/,
      `<meta id="head-description" name="description" content="${desc}" />`
    )

    const ogTags = [
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="Eufemia">`,
      `<meta property="og:title" content="${formattedTitle}">`,
      `<meta property="og:description" content="${desc}">`,
      `<meta property="og:url" content="${fullUrl}">`,
      `<meta property="og:image" content="${ogImage}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="Eufemia Design System">`,
    ]

    if (meta.url === '/') {
      ogTags.push(
        `<link rel="alternate" type="text/plain" title="Eufemia LLM discovery manifest" href="/llms.txt">`
      )
    }

    // Add markdown alternate link when the caller provides an mdPath.
    // This is computed by the prerender loop using allMdxNodes to
    // resolve tab pages to their parent entry's .md file.
    if (meta.mdPath) {
      ogTags.push(
        `<link rel="alternate" type="text/markdown" title="Markdown documentation" href="${meta.mdPath}">`
      )
    }

    html = html.replace(
      '</head>',
      `    ${ogTags.join('\n    ')}\n  </head>`
    )
  }

  // Inject Emotion CSS extracted during SSR into <head> so styles
  // are available before the browser paints the prerendered HTML.
  if (emotionCss) {
    html = html.replace('</head>', `${emotionCss}\n</head>`)
  }

  // Inject route-specific CSS as render-blocking stylesheets so the
  // prerendered HTML has all styles before first paint.
  if (preloads.css.length > 0) {
    const cssTags = preloads.css
      .map((p) => `<link rel="stylesheet" crossorigin href="${p}">`)
      .join('\n    ')
    html = html.replace('</head>', `    ${cssTags}\n  </head>`)
  }

  if (preloads.js.length > 0) {
    const preloadTags = preloads.js
      .map((p) => `<link rel="modulepreload" crossorigin href="${p}">`)
      .join('\n    ')
    html = html.replace('</head>', `    ${preloadTags}\n  </head>`)
  }

  // Inject React-generated preload links that were stripped from the
  // app HTML to avoid hydration mismatches.
  if (reactPreloadLinks.length > 0) {
    const linkTags = reactPreloadLinks.join('\n    ')
    html = html.replace('</head>', `    ${linkTags}\n  </head>`)
  }

  return html
}

/**
 * Build a minimal redirect HTML page.
 *
 * Uses both `<meta http-equiv="refresh">` and a canonical link
 * so search engines follow the redirect correctly.
 */
export function buildRedirectHtml(redirectUrl: string): string {
  return [
    '<!DOCTYPE html>',
    '<html><head>',
    `<meta http-equiv="refresh" content="0;url=${redirectUrl}">`,
    `<link rel="canonical" href="${redirectUrl}">`,
    '</head><body></body></html>',
  ].join('')
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
