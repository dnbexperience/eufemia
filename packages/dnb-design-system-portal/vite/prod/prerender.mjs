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
 * All pure helpers — HTML builders and route/manifest helpers — are
 * imported from the shared plain-ESM modules ./prerender-html.mjs and
 * ./prerender-helpers.mjs, the single implementations also used by the
 * typed, unit-tested prerender-utils.ts facade.
 */

import { build } from 'vite'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'
import { injectHtml, buildRedirectHtml } from './prerender-html.mjs'
import {
  collectUrls,
  getPageMeta,
  getMdPath,
  getRoutePreloads,
  getOutputPath,
} from './prerender-helpers.mjs'

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
      manifest: true,
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

  // Read the client build manifest for chunk dependency tracking.
  // The client manifest has `imports` and `css` fields per chunk,
  // letting us follow transitive CSS dependencies that the SSR
  // manifest alone cannot resolve.
  const clientManifestPath = path.resolve(outDir, '.vite', 'manifest.json')
  const clientManifest = fs.existsSync(clientManifestPath)
    ? JSON.parse(fs.readFileSync(clientManifestPath, 'utf-8'))
    : null

  const contentScript = getContentScript()
  let urls = collectUrls(routes)
  console.log(`  ${urls.length} pages to prerender`)

  // Find CSS chunks for ALL themes so we can inject <link> tags.
  // The default theme (ui) is injected enabled (render-blocking); the
  // other brand themes are injected disabled, so the browser skips them
  // until the user switches themes. An early inline script enables a
  // stored non-default theme when needed.
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
      const preloads = getRoutePreloads(url, ssrManifest, clientManifest)
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

// All pure route/manifest and HTML helpers live in shared plain-ESM
// modules imported at the top of this file (./prerender-helpers.mjs and
// ./prerender-html.mjs), so the production build and the unit tests run
// the exact same implementation instead of hand-synced copies.

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
