import fs from 'node:fs/promises'
import path from 'node:path'

// Resolve the docs root from EUFEMIA_DOCS_ROOT or a set of candidates
// relative to the module location. `moduleDir` is the directory of the
// running module (in Lambda this is the unzipped task root, where the
// handler and `docs/` sit side by side).
export async function resolveDocsRoot(
  moduleDir: string,
  docsRootOverride = process.env.EUFEMIA_DOCS_ROOT
): Promise<string> {
  if (docsRootOverride) {
    return path.resolve(docsRootOverride)
  }

  const candidates = [
    // Lambda bundle: handler and docs are unzipped side by side in the task root.
    path.resolve(moduleDir, 'docs'),
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
