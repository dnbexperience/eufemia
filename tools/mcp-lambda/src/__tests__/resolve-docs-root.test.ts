import { describe, it, expect, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { resolveDocsRoot } from '../resolve-docs-root.js'

async function makeTempDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'mcp-resolve-'))
}

const tempDirs: string[] = []

async function trackTemp(): Promise<string> {
  const dir = await makeTempDir()
  tempDirs.push(dir)
  return dir
}

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await fs.rm(dir, { recursive: true, force: true })
  }
})

describe('resolveDocsRoot', () => {
  it('prefers the explicit override and resolves it absolutely', async () => {
    const dir = await trackTemp()

    const result = await resolveDocsRoot('/some/module/dir', dir)

    expect(result).toBe(path.resolve(dir))
  })

  it('finds docs co-located with the module (Lambda task root)', async () => {
    const moduleDir = await trackTemp()
    const docsDir = path.join(moduleDir, 'docs')
    await fs.mkdir(docsDir)

    const result = await resolveDocsRoot(moduleDir, undefined)

    expect(result).toBe(docsDir)
  })

  it('falls back to ../dist/docs when no co-located docs exist', async () => {
    const base = await trackTemp()
    const moduleDir = path.join(base, 'src')
    await fs.mkdir(moduleDir)
    const distDocs = path.join(base, 'dist', 'docs')
    await fs.mkdir(distDocs, { recursive: true })

    const result = await resolveDocsRoot(moduleDir, undefined)

    expect(result).toBe(distDocs)
  })

  it('throws a helpful error when no docs directory is found', async () => {
    const moduleDir = await trackTemp()

    await expect(resolveDocsRoot(moduleDir, undefined)).rejects.toThrow(
      /No docs directory found/
    )
  })
})
