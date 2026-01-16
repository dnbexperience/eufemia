#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

type Reporter = {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
}

type Store = {
  getState: () => {
    program: { directory: string }
  }
}

function findPortalRoot(startDir: string) {
  let current = startDir
  const root = path.parse(startDir).root

  while (true) {
    const candidate = path.join(current, 'package.json')
    if (fs.existsSync(candidate)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(candidate, 'utf-8'))
        if (pkg?.name === 'dnb-design-system-portal') {
          return current
        }
      } catch {
        // ignore
      }
    }

    const portalCandidate = path.join(
      current,
      'packages',
      'dnb-design-system-portal'
    )
    if (fs.existsSync(portalCandidate)) {
      return portalCandidate
    }

    if (current === root) {
      break
    }
    current = path.dirname(current)
  }

  throw new Error(
    'Could not resolve dnb-design-system-portal root. Run from repo root or packages/dnb-design-system-portal.'
  )
}

async function main() {
  const siteDir = findPortalRoot(process.cwd())
  const reporter: Reporter = {
    info: (msg) => console.log(msg),
    warn: (msg) => console.warn(msg),
    error: (msg) => console.error(msg),
  }
  const store: Store = {
    getState: () => ({
      program: { directory: siteDir },
    }),
  }

  const requireFn = createRequire(import.meta.url)
  const scriptPath = fileURLToPath(import.meta.url)
  const scriptDir = path.dirname(scriptPath)
  const plugin = requireFn(path.join(scriptDir, '..', 'gatsby-node.js'))
  if (!plugin?.onPostBuild) {
    throw new Error('gatsby-node.js does not export onPostBuild')
  }

  await plugin.onPostBuild({ store, reporter })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
