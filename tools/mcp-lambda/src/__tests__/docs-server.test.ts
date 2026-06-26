import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { createDocsServer } from '../docs-server.js'

async function createTempDocs(
  files: Record<string, string>
): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-server-test-'))

  for (const [filePath, content] of Object.entries(files)) {
    const abs = path.join(dir, filePath)
    await fs.mkdir(path.dirname(abs), { recursive: true })
    await fs.writeFile(abs, content)
  }

  return dir
}

function parseResult(result: Awaited<ReturnType<Client['callTool']>>) {
  const text = (result.content as Array<{ type: string; text: string }>)[0]
    ?.text
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

describe('docs-server tools', () => {
  let client: Client
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs({
      'llm.md': '# Eufemia LLM Guide\nUse these tools to explore docs.',
      '_meta.json': JSON.stringify({
        eufemiaVersion: '11.0.0',
        generatedAt: '2025-01-01',
        commit: 'abc123',
      }),
      'uilib/components/button.md':
        '# Button\nA button component.\n\n```json\n{"name": "Button", "props": {"variant": "primary"}}\n```',
      'uilib/components/input.md':
        '---\nproperties: /uilib/components/input-properties.md\nevents: /uilib/components/input-events.md\n---\n# Input\nAn input field.',
      'uilib/components/input-properties.md':
        '# Input Properties\n\n```json\n{"name": "Input", "props": {"type": "text"}}\n```',
      'uilib/components/input-events.md':
        '# Input Events\n\n```json\n{"name": "Input", "events": ["onChange", "onFocus"]}\n```',
      'uilib/components/nested-frontmatter.md':
        '---\nmeta:\n  properties: /uilib/components/wrong-properties.md\nproperties: /uilib/components/input-properties.md\nevents: /uilib/components/input-events.md\n---\n# Nested Frontmatter\nA component with a nested frontmatter key.',
      'uilib/extensions/forms/feature-fields/Address.mdx':
        '# Field.Address\nAddress field component.',
      'uilib/extensions/forms/Value/Name.md':
        '# Value.Name\nDisplays a name value.',
      'uilib/extensions/forms/Form/Section.md':
        '# Form.Section\nGroups form fields.',
      'uilib/getting-started.md':
        '# Getting Started\nWelcome to Eufemia. This guide helps you get started quickly.',
      'uilib/components/dropdown/README.md':
        '# Dropdown\nA dropdown component.',
      'uilib/components/dropdown/demos.md': '# Dropdown Demos\nExamples.',
    })

    const { server } = await createDocsServer({ docsRoot })

    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair()

    await server.connect(serverTransport)

    client = new Client({ name: 'test-client', version: '1.0.0' })
    await client.connect(clientTransport)
  })

  afterAll(async () => {
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  describe('docs_entry', () => {
    it('returns llm.md content', async () => {
      const result = parseResult(
        await client.callTool({ name: 'docs_entry', arguments: {} })
      )

      expect(result).toContain('Eufemia LLM Guide')
    })
  })

  describe('docs_index', () => {
    it('returns all markdown files', async () => {
      const result = parseResult(
        await client.callTool({ name: 'docs_index', arguments: {} })
      )

      expect(result).toBeInstanceOf(Array)
      expect(result).toContain('/llm.md')
      expect(result).toContain('/uilib/components/button.md')
      expect(result).toContain(
        '/uilib/extensions/forms/feature-fields/Address.mdx'
      )
    })
  })

  describe('docs_list', () => {
    it('filters by prefix', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_list',
          arguments: { prefix: '/uilib/components/' },
        })
      )

      expect(result).toBeInstanceOf(Array)
      expect(
        result.every((p: string) => p.startsWith('/uilib/components/'))
      ).toBe(true)
      expect(result).toContain('/uilib/components/button.md')
    })

    it('respects limit', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_list',
          arguments: { limit: 2 },
        })
      )

      expect(result).toHaveLength(2)
    })

    it('returns an empty list for a path-escaping prefix', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_list',
          arguments: { prefix: '../etc' },
        })
      )

      expect(result).toBeInstanceOf(Array)
      expect(result).toHaveLength(0)
    })
  })

  describe('docs_read', () => {
    it('reads a file by path', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_read',
          arguments: { path: '/uilib/components/button.md' },
        })
      )

      expect(result).toContain('# Button')
    })

    it('returns ENOENT for missing files with suggestions', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_read',
          arguments: { path: '/uilib/components/button' },
        })
      )

      expect(result.error).toBe('ENOENT')
      expect(result.suggestions).toContain('/uilib/components/button.md')
    })

    it('returns EISDIR for directories with suggestions', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_read',
          arguments: { path: '/uilib/components/dropdown' },
        })
      )

      expect(result.error).toBe('EISDIR')
      expect(result.children).toContain('README.md')
      expect(result.suggestions).toContain(
        '/uilib/components/dropdown/README.md'
      )
    })

    it('rejects path traversal', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_read',
          arguments: { path: '/../../../etc/passwd' },
        })
      )

      expect(result).toContain('Path escapes docs root')
    })
  })

  describe('docs_search', () => {
    it('finds files matching a single-word query', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_search',
          arguments: { query: 'button' },
        })
      )

      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0].path).toBe('/uilib/components/button.md')
    })

    it('finds files matching multi-word query', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_search',
          arguments: { query: 'getting started' },
        })
      )

      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0].path).toBe('/uilib/getting-started.md')
    })

    it('returns empty for no matches', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_search',
          arguments: { query: 'xyznonexistent' },
        })
      )

      expect(result).toEqual([])
    })

    it('filters by prefix', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'docs_search',
          arguments: {
            query: 'component',
            prefix: '/uilib/extensions/',
          },
        })
      )

      expect(result).toBeInstanceOf(Array)
      for (const hit of result) {
        expect(hit.path).toMatch(/^\/uilib\/extensions\//)
      }
    })
  })

  describe('component_find', () => {
    it('resolves a regular component', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Button' },
        })
      )

      expect(result.name).toBe('Button')
      expect(result.doc).toBe('/uilib/components/button.md')
      expect(result.docExists).toBe(true)
      expect(result.slug).toBeNull()
      expect(result.fromIndex).toBe(false)
    })

    it('resolves Field dot-notation', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Field.Address' },
        })
      )

      expect(result.doc).toBe(
        '/uilib/extensions/forms/feature-fields/Address.mdx'
      )
      expect(result.docExists).toBe(true)
    })

    it('resolves Value dot-notation', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Value.Name' },
        })
      )

      expect(result.doc).toBe('/uilib/extensions/forms/Value/Name.md')
      expect(result.docExists).toBe(true)
    })

    it('resolves Form dot-notation', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Form.Section' },
        })
      )

      expect(result.doc).toBe('/uilib/extensions/forms/Form/Section.md')
      expect(result.docExists).toBe(true)
    })

    it('extracts properties and events from frontmatter', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Input' },
        })
      )

      expect(result.doc).toBe('/uilib/components/input.md')
      expect(result.properties).toBe(
        '/uilib/components/input-properties.md'
      )
      expect(result.propertiesExists).toBe(true)
      expect(result.events).toBe('/uilib/components/input-events.md')
      expect(result.eventsExists).toBe(true)
    })

    it('ignores nested frontmatter keys and uses top-level links', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Nested-frontmatter' },
        })
      )

      expect(result.properties).toBe(
        '/uilib/components/input-properties.md'
      )
      expect(result.events).toBe('/uilib/components/input-events.md')
    })

    it('reports docExists false for missing component', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_find',
          arguments: { name: 'Nonexistent' },
        })
      )

      expect(result.docExists).toBe(false)
    })
  })

  describe('component_doc', () => {
    it('returns full markdown for a component', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_doc',
          arguments: { name: 'Button' },
        })
      )

      expect(result).toContain('# Button')
      expect(result).toContain('A button component.')
    })

    it('returns error for missing component', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_doc',
          arguments: { name: 'Nonexistent' },
        })
      )

      expect(result).toContain('Component doc not found')
    })
  })

  describe('component_api', () => {
    it('extracts JSON blocks from component doc', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_api',
          arguments: { name: 'Button' },
        })
      )

      expect(result.doc).toBe('/uilib/components/button.md')
      expect(result.jsonBlocks).toHaveLength(1)
      expect(result.jsonBlocks[0]).toEqual({
        name: 'Button',
        props: { variant: 'primary' },
      })
    })

    it('returns ENOENT for missing component', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_api',
          arguments: { name: 'Nonexistent' },
        })
      )

      expect(result.error).toBe('ENOENT')
    })
  })

  describe('component_props', () => {
    it('returns the bare JSON blocks array from the component doc', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_props',
          arguments: { name: 'Button' },
        })
      )

      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual([
        {
          name: 'Button',
          props: { variant: 'primary' },
        },
      ])
    })

    it('returns ENOENT for missing component', async () => {
      const result = parseResult(
        await client.callTool({
          name: 'component_props',
          arguments: { name: 'Nonexistent' },
        })
      )

      expect(result.error).toBe('ENOENT')
    })
  })
})
