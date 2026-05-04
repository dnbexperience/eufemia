/**
 * Worker thread for parallel prerendering.
 *
 * Each worker loads the SSR bundle independently and renders
 * pages to HTML strings. The main thread handles HTML injection
 * and file writing.
 */

import { parentPort, workerData } from 'node:worker_threads'

// prismjs/components/* expect globalThis.Prism at load time
const { Prism } = await import('prism-react-renderer')
globalThis.Prism = Prism

const { render, prepareRoutes } = await import(workerData.serverEntry)
await prepareRoutes()

parentPort.postMessage({ type: 'ready' })

parentPort.on('message', async ({ id, url }) => {
  try {
    const result = await render(url)
    parentPort.postMessage({ id, result })
  } catch (err) {
    parentPort.postMessage({ id, error: err.message || String(err) })
  }
})
