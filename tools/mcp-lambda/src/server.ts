import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createNodeDocsSource } from '@dnb/eufemia/src/mcp/docs-source.js'
import {
  createDocsServer,
  createUsageResolver,
  validateDocsRoot,
} from '@dnb/eufemia/src/mcp/mcp-docs-server.js'
import { resolveDocsRoot } from './resolve-docs-root.js'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))

const docsRoot = await resolveDocsRoot(moduleDir)
await validateDocsRoot(docsRoot)

export const usageResolver = createUsageResolver(
  await createNodeDocsSource(docsRoot)
)

export async function createServer() {
  return (await createDocsServer({ docsRoot })).server
}
