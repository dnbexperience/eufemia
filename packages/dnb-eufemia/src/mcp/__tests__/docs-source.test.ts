// @vitest-environment node

import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  createNodeDocsSource,
  normalizeDocsPath,
  type DocsSource,
} from '../docs-source'
import { createDocsTools } from '../mcp-docs-server'

type CallToolResult = {
  content: Array<{ type: string; text?: string }>
}

function getText(result: CallToolResult): string {
  const first = result.content?.[0]
  return first?.type === 'text' ? (first.text ?? '') : ''
}

type DocsFixture = {
  docsRoot: string
  cleanup: () => void
}

function createDocsFixture(): DocsFixture {
  const docsRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-mcp-'))

  const componentsDir = path.join(docsRoot, 'uilib', 'components')
  const multiSelectionDir = path.join(
    docsRoot,
    'uilib',
    'extensions',
    'forms',
    'base-fields'
  )

  fs.mkdirSync(componentsDir, { recursive: true })
  fs.mkdirSync(multiSelectionDir, { recursive: true })

  fs.writeFileSync(
    path.join(docsRoot, 'llm.md'),
    '# Eufemia Docs\n\nWelcome to the docs.'
  )

  fs.writeFileSync(
    path.join(componentsDir, 'button.md'),
    [
      '---',
      'title: Button',
      '---',
      '# Button',
      '',
      'Button content with foobar.',
      '',
      '```json',
      JSON.stringify([{ name: 'text', type: 'string' }], null, 2),
      '```',
    ].join('\n')
  )

  fs.writeFileSync(
    path.join(multiSelectionDir, 'MultiSelection.md'),
    [
      '---',
      "title: 'Field.MultiSelection'",
      '---',
      '# Field.MultiSelection',
      '',
      'Multi selection field for forms (multi select).',
    ].join('\n')
  )

  return {
    docsRoot,
    cleanup: () => fs.rmSync(docsRoot, { recursive: true, force: true }),
  }
}

describe('normalizeDocsPath', () => {
  it('strips leading slashes and back-slashes', () => {
    expect(normalizeDocsPath('/uilib/components/button.md')).toBe(
      'uilib/components/button.md'
    )
    expect(normalizeDocsPath('uilib\\components\\button.md')).toBe(
      'uilib/components/button.md'
    )
  })

  it('rejects parent directory traversal', () => {
    expect(() => normalizeDocsPath('uilib/../../etc/passwd')).toThrow(
      /escapes docs root/
    )
  })

  it('treats undefined / null as empty path', () => {
    expect(normalizeDocsPath(undefined)).toBe('')
    expect(normalizeDocsPath(null)).toBe('')
  })
})

describe('createNodeDocsSource', () => {
  let fixture: DocsFixture
  let source: DocsSource

  beforeAll(async () => {
    fixture = createDocsFixture()
    source = await createNodeDocsSource(fixture.docsRoot)
  })

  afterAll(() => fixture.cleanup())

  it('lists only markdown files', async () => {
    const md = await source.listMarkdown()
    expect(md).toEqual(
      expect.arrayContaining([
        'llm.md',
        'uilib/components/button.md',
        'uilib/extensions/forms/base-fields/MultiSelection.md',
      ])
    )
  })

  it('reads a known file and returns null for missing ones', async () => {
    expect(await source.read('llm.md')).toContain('Eufemia')
    expect(await source.read('does/not/exist.md')).toBeNull()
  })

  it('reports stat for files, directories, and missing paths', async () => {
    expect((await source.stat('llm.md')).kind).toBe('file')
    expect((await source.stat('uilib/components')).kind).toBe('dir')
    expect((await source.stat('uilib/components/button.md')).kind).toBe(
      'file'
    )
    expect((await source.stat('does/not/exist')).kind).toBe('missing')
  })

  it('lists the direct children of a directory', async () => {
    const root = await source.listDir('')
    expect(root).toEqual(expect.arrayContaining(['llm.md', 'uilib']))

    const components = await source.listDir('uilib/components')
    expect(components).toEqual(['button.md'])
  })
})

describe('createDocsTools with a node source', () => {
  let fixture: DocsFixture

  beforeAll(() => {
    fixture = createDocsFixture()
  })

  afterAll(() => fixture.cleanup())

  it('serves docs_entry, docs_index and docs_search from the docs root', async () => {
    const tools = createDocsTools({ docsRoot: fixture.docsRoot })

    const entry = getText((await tools.docsEntry({})) as CallToolResult)
    expect(entry).toContain('Eufemia Docs')

    const index = JSON.parse(
      getText((await tools.docsIndex({})) as CallToolResult)
    ) as string[]
    expect(index).toEqual(
      expect.arrayContaining([
        '/llm.md',
        '/uilib/components/button.md',
        '/uilib/extensions/forms/base-fields/MultiSelection.md',
      ])
    )

    const search = JSON.parse(
      getText(
        (await tools.docsSearch({
          query: 'multi selection',
          limit: 5,
        })) as CallToolResult
      )
    ) as Array<{ path: string }>
    expect(search.map((h) => h.path)).toContain(
      '/uilib/extensions/forms/base-fields/MultiSelection.md'
    )
  })

  it('resolves Field.MultiSelection via component_find', async () => {
    const tools = createDocsTools({ docsRoot: fixture.docsRoot })

    const result = JSON.parse(
      getText(
        (await tools.componentFind({
          name: 'Field.MultiSelection',
        })) as CallToolResult
      )
    ) as { doc: string; docExists: boolean }

    expect(result.docExists).toBe(true)
    expect(result.doc).toBe(
      '/uilib/extensions/forms/base-fields/MultiSelection.md'
    )
  })

  it('returns component_doc text for Field.MultiSelection', async () => {
    const tools = createDocsTools({ docsRoot: fixture.docsRoot })

    const text = getText(
      (await tools.componentDoc({
        name: 'Field.MultiSelection',
      })) as CallToolResult
    )

    expect(text).toContain('Field.MultiSelection')
    expect(text).toContain('Multi selection field')
  })
})
