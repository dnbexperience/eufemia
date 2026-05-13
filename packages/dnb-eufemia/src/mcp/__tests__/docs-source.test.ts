import { createBundledDocsSource, normalizeDocsPath } from '../docs-source'
import { createDocsTools } from '../mcp-docs-server'

type CallToolResult = {
  content: Array<{ type: string; text?: string }>
}

function getText(result: CallToolResult): string {
  const first = result.content?.[0]
  return first?.type === 'text' ? (first.text ?? '') : ''
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

describe('createBundledDocsSource', () => {
  const bundle: Record<string, string> = {
    'llm.md': '# Eufemia\n\nWelcome to the docs.',
    'uilib/components/button.md': [
      '---',
      'title: Button',
      '---',
      '# Button',
      '',
      '```json',
      JSON.stringify([{ name: 'text', type: 'string' }], null, 2),
      '```',
    ].join('\n'),
    'uilib/extensions/forms/base-fields/MultiSelection.md': [
      '---',
      "title: 'Field.MultiSelection'",
      '---',
      '# Field.MultiSelection',
      '',
      'Multi selection field for forms.',
    ].join('\n'),
  }

  it('lists only markdown files', async () => {
    const source = createBundledDocsSource(bundle)
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
    const source = createBundledDocsSource(bundle)
    expect(await source.read('llm.md')).toContain('Eufemia')
    expect(await source.read('does/not/exist.md')).toBeNull()
  })

  it('reports stat for files, directories, and missing paths', async () => {
    const source = createBundledDocsSource(bundle)
    expect((await source.stat('llm.md')).kind).toBe('file')
    expect((await source.stat('uilib/components')).kind).toBe('dir')
    expect((await source.stat('uilib/components/button.md')).kind).toBe(
      'file'
    )
    expect((await source.stat('does/not/exist')).kind).toBe('missing')
  })

  it('lists a directory and de-duplicates child entries', async () => {
    const source = createBundledDocsSource(bundle)
    const root = await source.listDir('')
    expect(root).toEqual(expect.arrayContaining(['llm.md', 'uilib']))

    const components = await source.listDir('uilib/components')
    expect(components).toEqual(['button.md'])
  })
})

describe('createDocsTools with a bundled source', () => {
  const bundle: Record<string, string> = {
    'llm.md': '# Eufemia Docs\n\nWelcome.',
    'uilib/components/button.md': [
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
    ].join('\n'),
    'uilib/extensions/forms/base-fields/MultiSelection.md': [
      '---',
      "title: 'Field.MultiSelection'",
      '---',
      '# Field.MultiSelection',
      '',
      'Multi selection field for forms (multi select).',
    ].join('\n'),
  }

  it('serves docs_entry, docs_index and docs_search from the bundle', async () => {
    const source = createBundledDocsSource(bundle)
    const tools = createDocsTools({ source })

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
    const source = createBundledDocsSource(bundle)
    const tools = createDocsTools({ source })

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

  it('returns docs/component_doc text for Field.MultiSelection', async () => {
    const source = createBundledDocsSource(bundle)
    const tools = createDocsTools({ source })

    const text = getText(
      (await tools.componentDoc({
        name: 'Field.MultiSelection',
      })) as CallToolResult
    )

    expect(text).toContain('Field.MultiSelection')
    expect(text).toContain('Multi selection field')
  })
})
