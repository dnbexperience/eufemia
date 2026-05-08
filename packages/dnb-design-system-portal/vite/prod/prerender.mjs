/**
 * Prerender script for static site generation.
 *
 * 1. Builds the client bundle (JS/CSS with code splitting)
 * 2. Builds the SSR bundle (build/entry-server.tsx)
 * 3. For each route, renders HTML and writes it to dist/
 *
 * Each page gets its own directory with an index.html containing:
 * - Prerendered HTML in #root
 * - Only the JS chunks needed for that specific page
 * - The shared CSS bundle
 *
 * Pure utility functions used by this script are extracted into
 * prerender-utils.ts so they can be unit-tested independently.
 */

import { build } from 'vite'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const viteRoot = path.resolve(__dirname, '..')
const portalRoot = path.resolve(viteRoot, '..')
const outDir = path.resolve(portalRoot, 'public')

async function prerender() {
  const startTime = Date.now()

  // Step 1: Build client bundle with SSR manifest for chunk tracking
  console.log('Step 1/3: Building client bundle...')
  await build({
    configFile: path.resolve(portalRoot, 'vite.config.ts'),
    build: {
      outDir,
      ssrManifest: true,
    },
  })

  // Step 2: Build SSR bundle
  console.log('Step 2/3: Building SSR bundle...')
  await build({
    configFile: path.resolve(portalRoot, 'vite.config.ts'),
    build: {
      outDir: path.resolve(outDir, 'server'),
      ssr: path.resolve(__dirname, 'entry-server.tsx'),
    },
  })

  // Step 3: Prerender each route
  console.log('Step 3/3: Prerendering pages...')

  // Prism languages (prismjs/components/*) expect globalThis.Prism to
  // exist at load time. Set it up before importing the SSR module.
  const { Prism } = await import('prism-react-renderer')
  globalThis.Prism = Prism

  // Load the SSR module for metadata only (routes, allMdxNodes, etc.).
  // Actual rendering is done in worker threads for parallelism.
  const serverEntry = path.resolve(outDir, 'server', 'entry-server.mjs')
  const { routes, getContentScript, allMdxNodes } = await import(
    serverEntry
  )

  // Read the client HTML template
  const templatePath = path.resolve(outDir, 'index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')

  // Read the SSR manifest for per-page module preloading
  const manifestPath = path.resolve(outDir, '.vite', 'ssr-manifest.json')
  const ssrManifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    : {}

  const contentScript = getContentScript()
  let urls = collectUrls(routes)
  console.log(`  ${urls.length} pages to prerender`)

  // Find CSS chunks for ALL themes so we can inject render-blocking
  // <link> tags. The default theme (ui) is enabled; others are disabled
  // but present so an early inline script can swap them before first
  // paint — avoiding a flash of the wrong brand theme.
  const assetsDir = path.resolve(outDir, 'assets')
  const themeNames = ['ui', 'sbanken', 'eiendom', 'carnegie']
  const themeCssPaths = {}
  for (const name of themeNames) {
    const file = fs
      .readdirSync(assetsDir)
      .find(
        (f) => f.includes(`eufemia-theme-${name}`) && f.endsWith('.css')
      )
    if (file) {
      themeCssPaths[name] = `/assets/${file}`
    }
  }
  console.log(
    `  Theme CSS chunks: ${Object.keys(themeCssPaths).join(', ')}`
  )

  let rendered = 0
  let errors = 0

  // Render pages in parallel using worker threads.
  // renderToString is synchronous/CPU-bound, so worker threads
  // are needed to utilize multiple CPU cores.
  const workerCount = Math.min(
    os.availableParallelism?.() ?? os.cpus().length,
    8
  )

  // Include 404 in the render batch (handled specially below)
  const renderUrls = [...urls, '/404/']
  const renderResults = await renderWithWorkerPool(
    renderUrls,
    serverEntry,
    workerCount
  )

  // Process page results
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const { status, value: result, reason } = renderResults[i]

    if (status === 'rejected') {
      errors++
      console.error(`  ✗ ${url}`, reason?.message || reason)
      continue
    }

    if (result.redirect) {
      writeHtml(url, buildRedirectHtml(result.redirect))
    } else {
      const preloads = getRoutePreloads(url, ssrManifest)
      const meta = getPageMeta(url, allMdxNodes)
      const mdPath = getMdPath(url, allMdxNodes)
      const html = injectHtml(
        template,
        result.html,
        preloads,
        contentScript,
        result.emotionCss,
        { url, title: meta.title, description: meta.description, mdPath },
        themeCssPaths
      )
      writeHtml(url, html)
    }

    rendered++
  }

  // Write 404 page from the last render result
  const result404 = renderResults[urls.length]
  if (result404?.status === 'fulfilled' && result404.value?.html) {
    writeHtml(
      '/404.html',
      injectHtml(
        template,
        result404.value.html,
        { js: [], css: [] },
        contentScript,
        result404.value.emotionCss
      )
    )
  }

  // Clean up server build (not needed in production output)
  fs.rmSync(path.resolve(outDir, 'server'), {
    recursive: true,
    force: true,
  })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(
    `\n✓ Prerendered ${rendered} pages in ${elapsed}s` +
      (errors ? ` (${errors} errors)` : '')
  )
  console.log(`  Output: ${outDir}`)

  // Step: Generate LLM metadata (llms.txt + markdown copies)
  // Skip for visual-test builds — they only need rendered pages for screenshots.
  if (process.env.IS_VISUAL_TEST !== '1') {
    try {
      console.log('\nGenerating LLM metadata...')
      execSync('node vite/prod/generate-llm-metadata.mts', {
        cwd: portalRoot,
        stdio: 'inherit',
      })
    } catch {
      console.warn('Warning: LLM metadata generation failed (non-fatal)')
    }
  }

  // Step: Copy fonts to dist/fonts/ (serves as CDN for all Eufemia consumers)
  const require = createRequire(import.meta.url)
  const eufemiaRoot = path.dirname(
    require.resolve('@dnb/eufemia/package.json')
  )
  const fontsSource = path.resolve(eufemiaRoot, 'assets', 'fonts')
  const fontsDest = path.resolve(outDir, 'fonts')
  fs.cpSync(fontsSource, fontsDest, { recursive: true })
  console.log(`\n✓ Copied fonts to ${fontsDest}`)

  /**
   * Write HTML to the correct path in the output directory.
   */
  function writeHtml(url, html) {
    const filePath = getOutputPath(url, outDir)
    const dir = path.dirname(filePath)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(filePath, html)
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})

// ---------------------------------------------------------------------------
// Inline utility functions (mirrored from prerender-utils.ts for testing).
// Keep these in sync — the .ts versions are the source of truth.
// ---------------------------------------------------------------------------

function collectUrls(routes) {
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

function getPageMeta(url, allMdxNodes) {
  const slug = url.replace(/^\/|\/$/g, '')
  const node = allMdxNodes.find((n) => n.fields.slug === slug)

  if (!node) {
    return { title: '', description: '' }
  }

  let title = node.frontmatter.title || ''
  let description = node.frontmatter.description || ''

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
function getMdPath(url, allMdxNodes) {
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

function getRoutePreloads(url, ssrManifest) {
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

  return { js: [...jsPreloads], css: [...cssPreloads] }
}

function injectHtml(
  template,
  appHtml,
  preloads,
  contentScript,
  emotionCss,
  meta,
  themeCssPaths
) {
  // React 19 injects <link rel="preload"> elements inline during
  // renderToString for resources like images. Strip them from the app
  // HTML and move them to <head> so they don't break client-side
  // hydration (React can't match the DOM when unexpected <link>
  // elements appear before the root component's first element).
  const reactPreloadLinks = []
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
  appHtml = appHtml.replace(/style="([^"]*)"/g, (_match, styleContent) => {
    const normalized = styleContent
      .split(';')
      .filter(Boolean)
      .map((decl) => {
        const colonIdx = decl.indexOf(':')
        if (colonIdx === -1) return decl
        const prop = decl.slice(0, colonIdx).trim()
        const value = decl.slice(colonIdx + 1).trim()
        return `${prop}: ${value}`
      })
      .join('; ')
    return normalized ? `style="${normalized};"` : 'style=""'
  })

  // Restore sidebar scroll position before first paint.
  const scrollRestoreScript = `(function(){try{var el=document.getElementById('portal-sidebar-menu');if(el){var s=parseFloat(sessionStorage.getItem('scroll-#portal-sidebar-menu')||'0');if(s){el.style.scrollBehavior='auto';el.scrollTop=s;el.style.scrollBehavior=''}}}catch(e){}})()`

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

    // Early blocking script: read localStorage and enable the stored
    // theme's <link> before first paint. This mirrors the existing
    // color-scheme FOUC-prevention pattern.
    const themeScript = `<script>(function(){try{var t=JSON.parse(localStorage.getItem('eufemia-theme')||'{}');var p=new URLSearchParams(location.search);var n=p.get('eufemia-theme')||t.name||'${defaultTheme}';var links=document.querySelectorAll('link[data-eufemia-theme]');for(var i=0;i<links.length;i++){links[i].disabled=links[i].getAttribute('data-eufemia-theme')!==n}document.body.classList.add('eufemia-theme__'+n)}catch(e){}})()</script>`

    html = html.replace('</head>', `${linkTags}\n  </head>`)

    // Inject theme script right after the body opening tag (after the
    // existing color-scheme body script)
    html = html.replace('</body>', `${themeScript}\n</body>`)
  }

  // Inject per-page SEO meta tags
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

  // Inject route-specific CSS as render-blocking stylesheets
  if (preloads.css && preloads.css.length > 0) {
    const cssTags = preloads.css
      .map((p) => `<link rel="stylesheet" crossorigin href="${p}">`)
      .join('\n    ')
    html = html.replace('</head>', `    ${cssTags}\n  </head>`)
  }

  if (preloads.js && preloads.js.length > 0) {
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

function buildRedirectHtml(redirectUrl) {
  return [
    '<!DOCTYPE html>',
    '<html><head>',
    `<meta http-equiv="refresh" content="0;url=${redirectUrl}">`,
    `<link rel="canonical" href="${redirectUrl}">`,
    '</head><body></body></html>',
  ].join('')
}

function getOutputPath(url, outDir) {
  if (url === '/404.html') {
    return path.resolve(outDir, '404.html')
  }

  if (url === '/') {
    return path.resolve(outDir, 'index.html')
  }

  const cleanPath = url.replace(/^\/|\/$/g, '')
  return path.resolve(outDir, cleanPath, 'index.html')
}

/**
 * Render URLs in parallel using a pool of worker threads.
 *
 * Each worker loads the SSR bundle independently, so renderToString
 * runs across multiple CPU cores. URLs are distributed via a task
 * queue for natural load balancing.
 */
async function renderWithWorkerPool(urls, serverEntry, workerCount) {
  const workerUrl = new URL('./prerender-worker.mjs', import.meta.url)
  const initStart = Date.now()

  console.log(`  Starting ${workerCount} worker threads...`)

  // Create workers and wait for all to finish loading the SSR bundle
  const workers = await Promise.all(
    Array.from({ length: workerCount }, () => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(workerUrl, {
          workerData: { serverEntry },
        })

        const pending = new Map()
        let nextId = 0

        const api = {
          render(url) {
            return new Promise((resolve, reject) => {
              const id = nextId++
              pending.set(id, { resolve, reject })
              worker.postMessage({ id, url })
            })
          },
          terminate: () => worker.terminate(),
        }

        worker.on('message', (msg) => {
          if (msg.type === 'ready') {
            resolve(api)
            return
          }

          const handler = pending.get(msg.id)
          if (!handler) {
            return
          }

          pending.delete(msg.id)

          if (msg.error) {
            handler.reject(new Error(msg.error))
          } else {
            handler.resolve(msg.result)
          }
        })

        worker.on('error', (err) => {
          reject(err)
          for (const [, handler] of pending) {
            handler.reject(err)
          }
          pending.clear()
        })
      })
    })
  )

  console.log(
    `  Workers ready in ${((Date.now() - initStart) / 1000).toFixed(1)}s`
  )

  // Distribute URLs across workers using a task queue.
  // Each worker picks the next URL as soon as it finishes,
  // providing natural load balancing.
  const results = new Array(urls.length)
  let nextIdx = 0

  async function drain(worker) {
    while (nextIdx < urls.length) {
      const i = nextIdx++

      try {
        results[i] = {
          status: 'fulfilled',
          value: await worker.render(urls[i]),
        }
      } catch (err) {
        results[i] = { status: 'rejected', reason: err }
      }
    }
  }

  await Promise.all(workers.map(drain))
  workers.forEach((w) => w.terminate())

  return results
}
