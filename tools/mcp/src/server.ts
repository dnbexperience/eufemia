import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createDocsServer, validateDocsRoot } from './docs-server.js'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))

async function resolveDocsRoot(): Promise<string> {
  if (process.env.EUFEMIA_DOCS_ROOT) {
    return path.resolve(process.env.EUFEMIA_DOCS_ROOT)
  }

  const candidates = [
    path.resolve(moduleDir, '../dist/docs'),
    path.resolve(moduleDir, '../../../packages/dnb-eufemia/build/docs'),
  ]

  for (const candidate of candidates) {
    try {
      const stats = await fs.stat(candidate)
      if (stats.isDirectory()) {
        return candidate
      }
    } catch {
      // try the next candidate
    }
  }

  throw new Error(
    `No docs directory found. Searched:\n` +
      candidates.map((c) => `  - ${c}`).join('\n') +
      '\n  Run `yarn workspace @dnb/eufemia build:docs` or set EUFEMIA_DOCS_ROOT.'
  )
}

const docsRoot = await resolveDocsRoot()
await validateDocsRoot(docsRoot)

const { server } = await createDocsServer({ docsRoot })

export default server
