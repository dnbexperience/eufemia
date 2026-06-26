import { describe, it, expect } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { createNodeDocsSource } from '../docs-source.js'

async function createTempDocs(
  files: Record<string, string>
): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-test-'))

  for (const [filePath, content] of Object.entries(files)) {
    const abs = path.join(dir, filePath)
    await fs.mkdir(path.dirname(abs), { recursive: true })
    await fs.writeFile(abs, content)
  }

  return dir
}

describe('createNodeDocsSource', () => {
  it('lists markdown files', async () => {
    const dir = await createTempDocs({
      'llm.md': '# LLM guide',
      'uilib/components/button.md': '# Button',
      'uilib/components/input.mdx': '# Input',
      'readme.txt': 'ignored',
    })

    const source = await createNodeDocsSource(dir)
    const files = await source.listMarkdown()

    expect(files).toContain('llm.md')
    expect(files).toContain('uilib/components/button.md')
    expect(files).toContain('uilib/components/input.mdx')
    expect(files).not.toContain('readme.txt')
  })

  it('reads file contents', async () => {
    const dir = await createTempDocs({
      'uilib/components/button.md': '# Button component',
    })

    const source = await createNodeDocsSource(dir)
    const content = await source.read('uilib/components/button.md')

    expect(content).toBe('# Button component')
  })

  it('returns null for missing files', async () => {
    const dir = await createTempDocs({ 'llm.md': 'x' })
    const source = await createNodeDocsSource(dir)

    expect(await source.read('nonexistent.md')).toBeNull()
  })

  it('rejects path traversal in read', async () => {
    const dir = await createTempDocs({ 'llm.md': 'x' })
    const source = await createNodeDocsSource(dir)

    expect(await source.read('../../../etc/passwd')).toBeNull()
  })

  it('stats files correctly', async () => {
    const dir = await createTempDocs({
      'llm.md': 'x',
      'uilib/components/button.md': 'y',
    })

    const source = await createNodeDocsSource(dir)

    expect(await source.stat('llm.md')).toEqual({ kind: 'file' })
    expect(await source.stat('uilib')).toEqual({ kind: 'dir' })
    expect(await source.stat('missing.md')).toEqual({ kind: 'missing' })
  })

  it('rejects path traversal in stat', async () => {
    const dir = await createTempDocs({ 'llm.md': 'x' })
    const source = await createNodeDocsSource(dir)

    expect(await source.stat('../../etc')).toEqual({ kind: 'missing' })
  })

  it('skips dotfiles in listMarkdown', async () => {
    const dir = await createTempDocs({
      '.hidden.md': 'secret',
      'visible.md': 'public',
    })

    const source = await createNodeDocsSource(dir)
    const files = await source.listMarkdown()

    expect(files).toContain('visible.md')
    expect(files).not.toContain('.hidden.md')
  })

  it('does not read through a symlink that escapes the docs root', async () => {
    const root = await createTempDocs({ 'llm.md': 'x' })
    const outside = await fs.mkdtemp(
      path.join(os.tmpdir(), 'mcp-outside-')
    )
    await fs.writeFile(path.join(outside, 'secret.md'), 'top secret')
    await fs.symlink(
      path.join(outside, 'secret.md'),
      path.join(root, 'leak.md')
    )

    const source = await createNodeDocsSource(root)

    expect(await source.read('leak.md')).toBeNull()
    expect(await source.stat('leak.md')).toEqual({ kind: 'missing' })
  })

  it('does not list through a symlinked directory that escapes the root', async () => {
    const root = await createTempDocs({ 'llm.md': 'x' })
    const outside = await fs.mkdtemp(
      path.join(os.tmpdir(), 'mcp-outside-')
    )
    await fs.writeFile(path.join(outside, 'secret.md'), 'top secret')
    await fs.symlink(outside, path.join(root, 'leak'))

    const source = await createNodeDocsSource(root)

    expect(await source.stat('leak')).toEqual({ kind: 'missing' })
    expect(await source.listDir('leak')).toEqual([])
  })
})
