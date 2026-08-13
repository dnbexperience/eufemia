#!/usr/bin/env node

/**
 * Eufemia Docs MCP Server — stdio entry point.
 *
 * Used by editor integrations (Cursor, Claude Code, the VSCode MCP config,
 * etc.). The HTTP entry lives in `./mcp-http-server.ts`, and the runtime-
 * agnostic core lives in `./mcp-docs-server.ts`.
 */

import path from 'node:path'
import process from 'node:process'

import { serveStdio } from '@modelcontextprotocol/server/stdio'

import { createDocsServer, validateDocsRoot } from './mcp-docs-server'

function logErr(...args: unknown[]) {
  // eslint-disable-next-line no-console -- MCP stdio reserves stdout
  console.error(...args)
}

async function main() {
  const { tools } = await createDocsServer()
  logErr(`[eufemia] docsRoot: ${tools.docsRoot}`)

  await validateDocsRoot(tools.docsRoot)

  serveStdio(async () => (await createDocsServer()).server)
  logErr('[eufemia] connected (stdio)')
}

const shouldRun = (() => {
  const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
  const entryName = entryPath ? path.basename(entryPath) : ''
  const allowed = new Set([
    'mcp-stdio.js',
    'mcp-stdio.mjs',
    'mcp-stdio.cjs',
    'mcp-stdio.ts',
    'mcp-stdio.mts',
    // Backwards-compat for the historical filename used by the wrapper script
    // `run-mcp-server.sh` which still points at `mcp-docs-server.ts`.
    'mcp-docs-server.js',
    'mcp-docs-server.mjs',
    'mcp-docs-server.cjs',
    'mcp-docs-server.ts',
    'mcp-docs-server.mts',
  ])
  return entryName ? allowed.has(entryName) : false
})()

if (shouldRun) {
  main().catch((e) => {
    logErr('[eufemia] fatal:', e)
    process.exit(1)
  })
}
