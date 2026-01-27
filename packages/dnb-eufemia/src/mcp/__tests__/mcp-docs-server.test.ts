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
      'The Input component is used in forms. This is a form components for text input.',
    ].join('\n')
  )

  fs.writeFileSync(
    path.join(componentsDir, 'form.md'),
    [
      '---',
      'title: Form',
      '---',
      '# Form',
      '',
      'Form components help build user interfaces. Use form elements like input fields.',
    ].join('\n')
  )

  fs.writeFileSync(
    path.join(componentsDir, 'textfield.md'),
    [
      '---',
      'title: TextField',
      '---',
      '# TextField',
      '',
      'A text field is an input element for entering text data.',
    ].join('\n')
  )

  // Add Field.Address component in extensions/forms/feature-fields
  const extensionsFormsDir = path.join(
    docsRoot,
    'uilib',
    'extensions',
    'forms'
  )
  const featureFieldsDir = path.join(extensionsFormsDir, 'feature-fields')
  fs.mkdirSync(featureFieldsDir, { recursive: true })

  fs.writeFileSync(
    path.join(featureFieldsDir, 'Address.mdx'),
    [
      '---',
      'title: Field.Address',
      '---',
      '# Field.Address',
      '',
      'Field.Address is a wrapper component for the input of strings.',
    ].join('\n')
  )

  // Add Field.String component in extensions/forms/base-fields
  const baseFieldsDir = path.join(extensionsFormsDir, 'base-fields')
  fs.mkdirSync(baseFieldsDir, { recursive: true })

  fs.writeFileSync(
    path.join(baseFieldsDir, 'String.mdx'),
    [
      '---',
      'title: Field.String',
      '---',
      '# Field.String',
      '',
      'Field.String is the base component for receiving user input.',
    ].join('\n')
  )

  // Add Value.Address component in extensions/forms/Value
  const valueDir = path.join(extensionsFormsDir, 'Value')
  fs.mkdirSync(valueDir, { recursive: true })

  fs.writeFileSync(
    path.join(valueDir, 'Address.mdx'),
    [
      '---',
      'title: Value.Address',
      '---',
      '# Value.Address',
      '',
      'Value.Address is a wrapper component for displaying string values.',
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

function getAllText(result: CallToolResult) {
  return (
    result.content
      ?.filter((item): item is TextContent => item.type === 'text')
      .map((item) => item.text)
      .join('\n') ?? ''
  )
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

  it('returns ranked matches with snippets for single-word queries', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'foobar',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      snippet: string
      score: number
    }>
    expect(hits.length).toBeGreaterThan(0)
    expect(hits[0]?.path).toBe('/uilib/components/button.md')
    expect(hits[0]?.snippet).toContain('foobar')
    expect(hits[0]?.score).toBeGreaterThan(0)
  })

  it('handles multi-word queries with AND logic', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'form components input',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      score: number
      snippet: string
    }>
    // Should find input.md which contains "form", "components", and "input"
    expect(hits.length).toBeGreaterThan(0)
    const inputHit = hits.find(
      (h) => h.path === '/uilib/components/input.md'
    )
    expect(inputHit).toBeDefined()
    expect(inputHit?.snippet.toLowerCase()).toMatch(/form/)
    expect(inputHit?.snippet.toLowerCase()).toMatch(/component/)
    expect(inputHit?.snippet.toLowerCase()).toMatch(/input/)
    expect(inputHit?.score).toBeGreaterThan(0)
  })

  it('finds matches when words appear in different order', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'input form components',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      snippet: string
    }>
    // Should still find input.md even though words are in different order
    const inputHit = hits.find(
      (h) => h.path === '/uilib/components/input.md'
    )
    expect(inputHit).toBeDefined()
  })

  it('finds matches when words are separated by other text', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'form input',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      snippet: string
    }>
    // Should find both input.md and form.md
    const inputHit = hits.find(
      (h) => h.path === '/uilib/components/input.md'
    )
    const formHit = hits.find(
      (h) => h.path === '/uilib/components/form.md'
    )
    expect(inputHit || formHit).toBeDefined()
  })

  it('returns empty results when not all words match', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'form components nonexistent',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
    }>
    // Should not find anything since "nonexistent" doesn't exist
    expect(hits.length).toBe(0)
  })

  it('handles case-insensitive queries', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'FORM COMPONENTS INPUT',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      snippet: string
    }>
    // Should find results regardless of case
    expect(hits.length).toBeGreaterThan(0)
    const inputHit = hits.find(
      (h) => h.path === '/uilib/components/input.md'
    )
    expect(inputHit).toBeDefined()
  })

  it('handles queries with extra whitespace', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: '  form   components   input  ',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      snippet: string
    }>
    // Should handle extra whitespace gracefully
    expect(hits.length).toBeGreaterThan(0)
    const inputHit = hits.find(
      (h) => h.path === '/uilib/components/input.md'
    )
    expect(inputHit).toBeDefined()
  })

  it('returns empty results for queries shorter than 2 characters', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'a',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
    }>
    expect(hits.length).toBe(0)
  })

  it('ranks results by score (higher scores first)', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'form',
      limit: 10,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      score: number
    }>
    // Results should be sorted by score descending
    for (let i = 1; i < hits.length; i++) {
      expect(hits[i - 1]?.score).toBeGreaterThanOrEqual(
        hits[i]?.score ?? 0
      )
    }
  })

  it('respects the limit parameter', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'component',
      limit: 2,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
    }>
    expect(hits.length).toBeLessThanOrEqual(2)
  })

  it('includes occurrence count in results', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.docsSearch({
      query: 'input',
      limit: 5,
    })
    const hits = JSON.parse(getText(result)) as Array<{
      path: string
      occurrences: number
    }>
    expect(hits.length).toBeGreaterThan(0)
    const inputHit = hits.find(
      (h) => h.path === '/uilib/components/input.md'
    )
    expect(inputHit?.occurrences).toBeGreaterThan(0)
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
      docExists?: boolean
    }
    expect(info.doc).toBe('/uilib/components/button.md')
    expect(info.properties).toBe('/uilib/components/button.md')
    expect(info.events).toBe('/uilib/components/button.md')
    expect(info.fromIndex).toBe(false)
    expect(info.docExists).toBe(true)
  })

  it('handles Field.Address dot notation', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentFind({ name: 'Field.Address' })
    const info = JSON.parse(getText(result)) as {
      doc?: string
      docExists?: boolean
    }
    expect(info.doc).toBe(
      '/uilib/extensions/forms/feature-fields/Address.mdx'
    )
    expect(info.docExists).toBe(true)
  })

  it('handles Field.String dot notation', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentFind({ name: 'Field.String' })
    const info = JSON.parse(getText(result)) as {
      doc?: string
      docExists?: boolean
    }
    expect(info.doc).toBe('/uilib/extensions/forms/base-fields/String.mdx')
    expect(info.docExists).toBe(true)
  })

  it('handles Value.Address dot notation', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentFind({ name: 'Value.Address' })
    const info = JSON.parse(getText(result)) as {
      doc?: string
      docExists?: boolean
    }
    expect(info.doc).toBe('/uilib/extensions/forms/Value/Address.mdx')
    expect(info.docExists).toBe(true)
  })

  it('handles case-insensitive dot notation', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentFind({ name: 'field.address' })
    const info = JSON.parse(getText(result)) as {
      doc?: string
      docExists?: boolean
    }
    expect(info.doc).toBe(
      '/uilib/extensions/forms/feature-fields/Address.mdx'
    )
    expect(info.docExists).toBe(true)
  })

  it('returns docExists false for non-existent components', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentFind({ name: 'Field.Nonexistent' })
    const info = JSON.parse(getText(result)) as {
      doc?: string
      docExists?: boolean
    }
    expect(info.doc).toBe(
      '/uilib/extensions/forms/feature-fields/Nonexistent.mdx'
    )
    expect(info.docExists).toBe(false)
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

  it('returns Field.Address component markdown', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentDoc({ name: 'Field.Address' })
    expect(getText(result)).toContain('Field.Address')
    expect(getText(result)).toContain('wrapper component')
  })

  it('returns Field.String component markdown', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentDoc({ name: 'Field.String' })
    expect(getText(result)).toContain('Field.String')
    expect(getText(result)).toContain('base component')
  })

  it('returns Value.Address component markdown', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentDoc({ name: 'Value.Address' })
    expect(getText(result)).toContain('Value.Address')
    expect(getText(result)).toContain('displaying string values')
  })

  it('handles case-insensitive component names', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentDoc({ name: 'field.address' })
    expect(getText(result)).toContain('Field.Address')
    expect(getText(result)).toContain('wrapper component')
  })

  it('returns error message for non-existent components', async () => {
    const tools = createDocsTools({ docsRoot })
    const result = await tools.componentDoc({ name: 'Field.Nonexistent' })
    expect(getText(result)).toContain('Component doc not found')
    expect(getText(result)).toContain('Nonexistent.mdx')
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

describe('initial reminder', () => {
  let docsRoot: string
  let cleanup: () => void

  beforeAll(() => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup
  })

  afterAll(() => cleanup())

  it('returns the reminder only on the first call', async () => {
    const tools = createDocsTools({ docsRoot })
    const reminderText =
      'Before implementing any Eufemia-based features, call mcp_eufemia_docs_entry'

    // First call should have the reminder
    const result1 = await tools.docsEntry({})
    expect(getAllText(result1)).toContain(reminderText)

    // Second call should NOT have the reminder
    const result2 = await tools.docsEntry({})
    expect(getAllText(result2)).not.toContain(reminderText)
  })

  it('returns the reminder only on the first call across different tools', async () => {
    const tools = createDocsTools({ docsRoot })
    const reminderText =
      'Before implementing any Eufemia-based features, call mcp_eufemia_docs_entry'

    // First call (search) should have the reminder
    const result1 = await tools.docsSearch({ query: 'button', limit: 10 })
    expect(getAllText(result1)).toContain(reminderText)

    // Second call (read) should NOT have the reminder
    const result2 = await tools.docsRead({
      path: '/uilib/components/button.md',
    })
    expect(getAllText(result2)).not.toContain(reminderText)
  })
})

describe('MCP dependency configuration', () => {
  it('has @modelcontextprotocol/sdk dependency declared in package.json', () => {
    const packageJsonPath = path.join(__dirname, '../../../package.json')
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf8')
    )

    expect(packageJson.dependencies).toBeDefined()
    expect(
      packageJson.dependencies['@modelcontextprotocol/sdk']
    ).toBeDefined()
    expect(
      packageJson.dependencies['@modelcontextprotocol/sdk']
    ).toBeTruthy()
  })

  it('has .vscode/mcp.json with correct eufemia server configuration', () => {
    const mcpConfigPath = path.join(
      __dirname,
      '../../../../../.vscode/mcp.json'
    )
    expect(fs.existsSync(mcpConfigPath)).toBe(true)

    const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'))

    expect(mcpConfig.servers).toBeDefined()
    expect(mcpConfig.servers.eufemia).toBeDefined()
    expect(mcpConfig.servers.eufemia.command).toBe('bash')
    expect(mcpConfig.servers.eufemia.args).toBeDefined()
    expect(mcpConfig.servers.eufemia.args.length).toBeGreaterThan(0)

    const scriptPath = mcpConfig.servers.eufemia.args[0]
    expect(scriptPath).toContain(
      'packages/dnb-eufemia/src/mcp/run-mcp-server.sh'
    )
  })

  it('has run-mcp-server.sh script file at expected location', () => {
    const scriptPath = path.join(__dirname, '../run-mcp-server.sh')
    expect(fs.existsSync(scriptPath)).toBe(true)
  })
})
