import type {
  CallToolResult,
  TextContent,
} from '@modelcontextprotocol/sdk/types'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { createDocsTools } from '../mcp-docs-server'

type DocsFixture = {
  docsRoot: string
  cleanup: () => void
}

function createDocsFixture(): DocsFixture {
  const docsRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-mcp-'))

  const componentsDir = path.join(docsRoot, 'uilib', 'components')
  const buttonDir = path.join(componentsDir, 'button')

  fs.mkdirSync(buttonDir, { recursive: true })

  fs.writeFileSync(
    path.join(docsRoot, 'llm.md'),
    '# Eufemia Docs\n\nWelcome.'
  )

  fs.writeFileSync(
    path.join(componentsDir, 'button.md'),
    [
      '---',
      'title: Button',
      '---',
      '# Button',
      '',
      'Search term: foobar.',
      '',
      '## Properties',
      '',
      '```json',
      JSON.stringify([{ name: 'text', type: 'string' }], null, 2),
      '```',
      '',
      '## Events',
      '',
      '```json',
      JSON.stringify([{ name: 'onClick' }], null, 2),
      '```',
    ].join('\n')
  )

  fs.writeFileSync(
    path.join(componentsDir, 'input.md'),
    [
      '---',
      'title: Input',
      '---',
      '# Input',
      '',
      'Another component.',
    ].join('\n')
  )

  return {
    docsRoot,
    cleanup: () => {
      fs.rmSync(docsRoot, { recursive: true, force: true })
    },
  }
}

function getText(result: CallToolResult) {
  const block = result.content?.find(
    (item): item is TextContent => item.type === 'text'
  )
  return block?.text ?? ''
}

describe('docs_entry', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns llm.md content', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsEntry({})
    expect(getText(result)).toContain('Eufemia Docs')
  })
})

describe('docs_index', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns markdown file list', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsIndex({})
    const files = JSON.parse(getText(result)) as string[]
    expect(files).toContain('/uilib/components/button.md')
  })
})

describe('docs_list', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns markdown file list', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsList({ limit: 10 })
    const files = JSON.parse(getText(result)) as string[]
    expect(files).toContain('/uilib/components/button.md')
  })
})

describe('docs_read', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('reads a markdown file', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsRead({
      path: '/uilib/components/button.md',
    })
    expect(getText(result)).toContain('Search term: foobar')
  })

  it('lists directory suggestions when given a directory', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsRead({
      path: '/uilib/components/button',
    })
    const payload = JSON.parse(getText(result)) as {
      error?: string
      suggestions?: string[]
      children?: string[]
    }
    expect(payload.error).toBe('EISDIR')
    expect(payload.suggestions).toContain('/uilib/components/button.md')
  })
})

describe('docs_search', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns ranked matches with snippets', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'foobar',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      snippet: string
    }>
    expect(hits[0]?.path).toBe('/uilib/components/button.md')
    expect(hits[0]?.snippet).toContain('foobar')
  })
})

describe('component_find', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns component paths from the index', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentFind({ name: 'Button' })
    const info = JSON.parse(getText(result)) as {
      doc?: string
      properties?: string
      events?: string
      fromIndex?: boolean
    }
    expect(info.doc).toBe('/uilib/components/button.md')
    expect(info.properties).toBe('/uilib/components/button.md')
    expect(info.events).toBe('/uilib/components/button.md')
    expect(info.fromIndex).toBe(false)
  })
})

describe('component_doc', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns the component markdown', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentDoc({ name: 'Button' })
    expect(getText(result)).toContain('# Button')
  })
})

describe('component_api', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns json blocks from component markdown', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentApi({ name: 'Button' })
    const meta = JSON.parse(getText(result)) as {
      jsonBlocks?: unknown[]
    }
    expect(Array.isArray(meta.jsonBlocks)).toBe(true)
    expect(meta.jsonBlocks?.length).toBeGreaterThan(0)
  })
})

describe('component_props', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns the json blocks', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentProps({ name: 'Button' })
    const blocks = JSON.parse(getText(result)) as unknown[]
    expect(Array.isArray(blocks)).toBe(true)
    expect(blocks[0]).toEqual([{ name: 'text', type: 'string' }])
  })
})
