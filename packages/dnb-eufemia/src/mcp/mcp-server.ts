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
  // Only auto-start when Node ran this file directly (published as
  // mcp-server.js); stay a no-op when the module is merely imported.
  const allowed = new Set([
    'mcp-server.js',
    'mcp-server.mjs',
    'mcp-server.cjs',
    'mcp-server.ts',
    'mcp-server.mts',
  ])
  return entryName ? allowed.has(entryName) : false
})()

if (shouldRun) {
  main().catch((e) => {
    logErr('[eufemia] fatal:', e)
    process.exit(1)
  })
}
