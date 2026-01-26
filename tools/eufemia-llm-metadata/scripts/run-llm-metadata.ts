#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import { generateDocs } from './generateDocs.ts'

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
  const store: Store = {
    getState: () => ({
      program: { directory: siteDir },
    }),
  }

  await generateDocsWithGatsby({ store })
}

async function generateDocsWithGatsby({ store }: { store: Store }) {
  const previousCwd = process.cwd()
  try {
    const { program } = store.getState()
    process.chdir(program.directory)
    await generateDocs()
  } finally {
    process.chdir(previousCwd)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
