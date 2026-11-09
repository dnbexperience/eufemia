import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createNodeDocsSource } from '@dnb/eufemia/src/mcp/docs-source.js'
import {
  createDocsServer,
  createUsageResolver,
  readDocsMeta,
  validateDocsRoot,
} from '@dnb/eufemia/src/mcp/mcp-docs-server.js'
import { resolveDocsRoot } from './resolve-docs-root.js'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))

const docsRoot = await resolveDocsRoot(moduleDir)
await validateDocsRoot(docsRoot)

const docsSource = await createNodeDocsSource(docsRoot)

export const usageCaptureOptions = {
  resolver: createUsageResolver(docsSource),
  eufemiaVersion: (await readDocsMeta(docsSource)).eufemiaVersion,
}

export async function createServer() {
  const { server } = await createDocsServer({ docsRoot })

  // Lambda can't keep listen streams open; this makes the SDK end them.
  server.server.registerCapabilities({ tools: { listChanged: false } })

  return server
}
