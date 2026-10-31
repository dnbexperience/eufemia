/**
 * Pure utility functions for the SSG prerender pipeline.
 *
 * These functions are extracted from the prerender script for
 * independent unit testing. Shared native modules are also imported by
 * the prerender.mjs orchestrator.
 */

import path from 'node:path'
import { modulePreloadTags } from './route-preloads.mts'
import socialImages from '../../static/og/manifest.json'
import {
  socialImageTags,
  socialDetailTags,
} from '../../src/shared/social-image.mjs'
import { getContentScript } from '@dnb/eufemia/src/shared/ColorSchemeScript'
import { getPreHydrationScript } from '@dnb/eufemia/src/extensions/sidebar-menu/SidebarMenuPreHydrationScript'
import { escapeHtml } from './html-escape.mts'
import type { MdxNode as PortalMdxNode } from '../client/plugins/portal-pages.shared'

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
  fields: Pick<PortalMdxNode['fields'], 'slug'>
  frontmatter: PortalMdxNode['frontmatter']
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

  let title =
    ((node.frontmatter.title ||
      node.frontmatter.contentTitle) as string) || ''
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
        const tabKey = slug.split('/').pop()
        const defaultTabs = [
          { title: 'Info', key: '/info' },
          { title: 'Demos', key: '/demos' },
          { title: 'Properties', key: '/properties' },
          { title: 'Events', key: '/events' },
        ]
        const tabs =
          (parent.frontmatter.tabs as typeof defaultTabs) || defaultTabs
        // Keys can be relative (`/demos`) or full paths, like TabBar accepts
        const tab = tabs.find(
          (t) => t.key.split('/').filter(Boolean).pop() === tabKey
        )

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

export { getRoutePreloads } from './route-preloads.mts'

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

  // Inject the prerendered HTML into the root div, followed by a
  // blocking script that swaps color-scheme classes on Theme elements
  // before the browser paints — preventing a dark-mode FOUC.
  const contentScript = getContentScript()

  const persistedSidebarScript =
    /data-(?:inline-collapsed|open-items|scroll-position)-storage-key=/.test(
      appHtml
    )
      ? getPreHydrationScript()
      : ''

  let html = template.replace(
    '<div id="root"></div>',
    () =>
      `<div id="root">${appHtml}</div>\n\t<script>${contentScript};${persistedSidebarScript}</script>`
  )

  // Resolve the active brand before paint without fetching inactive themes.
  // Keep their URLs available for later switches and a default without JS.
  if (themeCssPaths && Object.keys(themeCssPaths).length > 0) {
    const defaultTheme = 'ui'
    const linkTags = Object.entries(themeCssPaths)
      .map(([name, href]) => {
        return `    <link rel="stylesheet" crossorigin data-eufemia-href="${href}" data-eufemia-theme="${name}">`
      })
      .join('\n')

    // Insert the selected stylesheet during parsing so every browser waits for it.
    const headThemeScript = `<script>(function(){var n='${defaultTheme}';try{var t=JSON.parse(localStorage.getItem('eufemia-theme')||'{}');var p=new URLSearchParams(location.search);n=p.get('eufemia-theme')||t.brand||t.name||n}catch(e){}var links=document.querySelectorAll('link[data-eufemia-theme]');var known=[];for(var i=0;i<links.length;i++){known.push(links[i].getAttribute('data-eufemia-theme'))}if(known.indexOf(n)<0){n='${defaultTheme}'}for(var j=0;j<links.length;j++){links[j].disabled=known[j]!==n;if(known[j]===n){document.write(links[j].outerHTML.replace('data-eufemia-href=', 'href='));links[j].remove()}}globalThis.__eufemiaTheme=n})()</script>`

    // Body script: add the brand class to <body> immediately after
    // the opening tag, before any content is rendered.
    const bodyThemeScript = `<script>(function(){var n=globalThis.__eufemiaTheme;if(n){document.body.classList.add('eufemia-theme__'+n)}})()</script>`

    html = html.replace(
      '</head>',
      `${linkTags}\n${headThemeScript}\n<noscript><link rel="stylesheet" href="${themeCssPaths[defaultTheme]}"></noscript>\n  </head>`
    )
    html = html.replace(
      /<body[^>]*>/,
      (match) => `${match}\n     ${bodyThemeScript}`
    )
  }

  // Inject per-page SEO meta tags (title, description, Open Graph)
  if (meta) {
    const siteUrl =
      process.env.PORTAL_PUBLIC_ORIGIN || 'https://eufemia.dnb.no'
    const defaultDescription =
      'Eufemia Design System is the go-to place for all who has to design, develop and make digital WEB applications for DNB.'
    const formattedTitle = meta.title
      ? `${escapeHtml(meta.title)} | Eufemia`
      : 'Eufemia'
    const desc = escapeHtml(meta.description || defaultDescription)
    const fullUrl = escapeHtml(`${siteUrl}${meta.url}`)

    // Replace existing title and meta description from the template
    html = html.replace(
      /<title id="head-title">[^<]*<\/title>/,
      () => `<title id="head-title">${formattedTitle}</title>`
    )
    html = html.replace(
      /<meta id="head-description"[^>]*\/?\s*>/,
      () =>
        `<meta id="head-description" name="description" content="${desc}" />`
    )

    const ogTags = [
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="Eufemia">`,
      `<meta property="og:title" content="${formattedTitle}">`,
      `<meta property="og:description" content="${desc}">`,
      `<meta property="og:url" content="${fullUrl}">`,
      ...socialImageTags(meta.url, socialImages, siteUrl),
      ...socialDetailTags(
        meta.title ? meta.title + ' | Eufemia' : 'Eufemia',
        meta.description || defaultDescription
      ),
    ]

    if (meta.url === '/') {
      ogTags.push(
        `<link rel="alternate" type="text/plain" title="Eufemia LLM discovery manifest" href="/llms.txt">`
      )
    }

    // Add markdown alternate link when the caller provides an mdPath.
    // The prerender loop derives it from the copies present in the output,
    // so a page can only advertise one that exists.
    if (meta.mdPath) {
      const mdPath = escapeHtml(meta.mdPath)

      ogTags.push(
        `<link rel="alternate" type="text/markdown" title="Markdown documentation" href="${mdPath}">`
      )
    }

    html = html.replace(
      '</head>',
      () => `    ${ogTags.join('\n    ')}\n  </head>`
    )
  }

  // Inject Emotion CSS extracted during SSR into <head> so styles
  // are available before the browser paints the prerendered HTML.
  if (emotionCss) {
    html = html.replace('</head>', () => `${emotionCss}\n</head>`)
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
    const preloadTags = modulePreloadTags(html, preloads.js)
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
export function buildRedirectHtml(
  redirectUrl: string,
  fragments: Record<string, string> = {}
): string {
  const url = escapeHtml(redirectUrl)
  const target = JSON.stringify(redirectUrl).replaceAll('<', '\\u003c')
  const fragmentMap = JSON.stringify(fragments).replaceAll('<', '\\u003c')
  const script = `<script>var fragments = ${fragmentMap}; var key = location.hash.slice(1); var target = new URL(Object.prototype.hasOwnProperty.call(fragments, key) ? fragments[key] : ${target}, location.href); target.search = target.search || location.search; target.hash = target.hash || location.hash; location.replace(target.href);</script>`

  return [
    '<!DOCTYPE html>',
    '<html><head>',
    script,
    `<meta http-equiv="refresh" content="0;url=${url}">`,
    `<link rel="canonical" href="${url}">`,
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
