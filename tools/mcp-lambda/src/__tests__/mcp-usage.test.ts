import { describe, it, expect } from 'vitest'
import {
  normalizeDocsPath,
  type DocsSource,
} from '@dnb/eufemia/src/mcp/docs-source.js'
import { createUsageResolver } from '@dnb/eufemia/src/mcp/mcp-docs-server.js'
import {
  usageRecordsFromRequestBody,
  KNOWN_TOOLS,
} from '../records/mcp-usage.js'

const NOW = '2026-09-10T12:00:00.000Z'

const DOC_FILES = [
  'uilib/button.md',
  'uilib/components/button.md',
  'uilib/components/date-picker.md',
  'uilib/extensions/forms/feature-fields/Address.mdx',
]

// A real docs lookup over a small in-memory tree, so the resolver under test
// is the one the docs tools use rather than a stub.
const source: DocsSource = {
  label: 'memory',
  listMarkdown: async () => DOC_FILES,
  read: async () => null,
  listDir: async () => [],
  stat: async (relPath) => {
    const path = normalizeDocsPath(relPath)

    if (DOC_FILES.includes(path)) {
      return { kind: 'file' }
    }

    return DOC_FILES.some((file) => file.startsWith(`${path}/`))
      ? { kind: 'dir' }
      : { kind: 'missing' }
  },
}

const resolver = createUsageResolver(source)

function body(message: unknown): string {
  return JSON.stringify(message)
}

function toolCall(name: string, args?: Record<string, unknown>) {
  return {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: { name, arguments: args ?? {} },
  }
}

describe('usageRecordsFromRequestBody', () => {
  it('captures the component for a component tool', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'Button' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record).toEqual({
      tool: 'component_props',
      component: 'button',
      path: '',
      env: 'dev',
      transport: 'web',
      timestamp: NOW,
      createdat: NOW,
    })
  })

  it('captures a hyphenated multi-word component name', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('component_doc', { name: 'date-picker' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.component).toBe('date-picker')
  })

  it('normalises component casing so variants aggregate together', async () => {
    const [upper] = await usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'Button' })),
      { env: 'dev', now: NOW, resolver }
    )
    const [lower] = await usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'button' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(upper?.component).toBe('button')
    expect(lower?.component).toBe('button')
  })

  it('accepts a dotted compound component name', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('component_find', { name: 'Field.Address' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.component).toBe('field.address')
  })

  it('captures the path for docs_read and the prefix for docs_list', async () => {
    const [read] = await usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path: '/uilib/components/button.md' })),
      { env: 'dev', now: NOW, resolver }
    )
    const [list] = await usageRecordsFromRequestBody(
      body(toolCall('docs_list', { prefix: '/uilib/components/' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(read?.path).toBe('/uilib/components/button.md')
    expect(read?.component).toBe('')
    expect(list?.path).toBe('/uilib/components')
  })

  // The docs server accepts a path with or without a leading slash, converts
  // back-slashes, and collapses empty and `.` segments before reading the file,
  // so all of these name the same document. Storing them verbatim would drop the
  // relative and back-slashed forms entirely and split the rest across separate
  // rows.
  it.each([
    ['/uilib/components/button.md', '/uilib/components/button.md'],
    ['uilib/components/button.md', '/uilib/components/button.md'],
    ['/uilib//components/./button.md', '/uilib/components/button.md'],
    ['/uilib/components/button.md/', '/uilib/components/button.md'],
    ['//uilib/components/button.md', '/uilib/components/button.md'],
    ['\\uilib\\components\\button.md', '/uilib/components/button.md'],
    ['/uilib\\components/button.md', '/uilib/components/button.md'],
  ])('stores the path %s as %s', async (path, expected) => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.path).toBe(expected)
  })

  it.each([
    ['a prefix without a leading slash', 'uilib/components'],
    ['a prefix with a trailing slash', '/uilib/components/'],
    ['a back-slashed prefix', '\\uilib\\components'],
  ])('stores %s under one key', async (_label, prefix) => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('docs_list', { prefix })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.path).toBe('/uilib/components')
  })

  it('stores an empty path when there is nothing to record', async () => {
    const paths = await Promise.all(
      ['', '/', '///', '/./'].map(
        async (path) =>
          (
            await usageRecordsFromRequestBody(
              body(toolCall('docs_read', { path })),
              { env: 'dev', now: NOW, resolver }
            )
          )[0]?.path
      )
    )

    expect(paths).toEqual(['', '', '', ''])
  })

  it('records docs_search as the tool only, never the query', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(
        toolCall('docs_search', { query: 'how do I set the DatePicker' })
      ),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.tool).toBe('docs_search')
    expect(record?.component).toBe('')
    expect(record?.path).toBe('')
    expect(JSON.stringify(record)).not.toContain('DatePicker')
  })

  it('captures the Portal content workflow tool', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('portal_content_workflow')),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.tool).toBe('portal_content_workflow')
  })

  it('drops a component argument with invalid characters', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'Button; DROP TABLE' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.component).toBe('')
  })

  it.each([
    'component_find',
    'component_doc',
    'component_api',
    'component_props',
  ])(
    'drops a valid-looking component that does not exist for %s',
    async (tool) => {
      const [record] = await usageRecordsFromRequestBody(
        body(toolCall(tool, { name: 'NotAComponent' })),
        { env: 'dev', now: NOW, resolver }
      )

      expect(record?.tool).toBe(tool)
      expect(record?.component).toBe('')
    }
  )

  it('drops a compound component name that does not exist', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('component_find', { name: 'Field.Bogus' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.component).toBe('')
  })

  it('drops a docs_read path that is not a file', async () => {
    const missing = await usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path: '/uilib/components/nope.md' })),
      { env: 'dev', now: NOW, resolver }
    )
    const directory = await usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path: '/uilib/components' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(missing[0]?.tool).toBe('docs_read')
    expect(missing[0]?.path).toBe('')
    expect(directory[0]?.path).toBe('')
  })

  it('drops a docs_list prefix that is not a directory', async () => {
    const missing = await usageRecordsFromRequestBody(
      body(toolCall('docs_list', { prefix: '/nope/at/all' })),
      { env: 'dev', now: NOW, resolver }
    )
    const file = await usageRecordsFromRequestBody(
      body(toolCall('docs_list', { prefix: '/uilib/button.md' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(missing[0]?.path).toBe('')
    expect(file[0]?.path).toBe('')
  })

  it('drops a path with parent-directory traversal', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path: '/uilib/../../etc/passwd' })),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.path).toBe('')
  })

  it('strips a query string and fragment from a path', async () => {
    const [record] = await usageRecordsFromRequestBody(
      body(
        toolCall('docs_read', { path: '/uilib/button.md?token=secret#x' })
      ),
      { env: 'dev', now: NOW, resolver }
    )

    expect(record?.path).toBe('/uilib/button.md')
  })

  it('ignores an unknown tool name', async () => {
    expect(
      await usageRecordsFromRequestBody(body(toolCall('drop_database')), {
        env: 'dev',
        now: NOW,
        resolver,
      })
    ).toEqual([])
  })

  it('ignores non-tools/call methods', async () => {
    expect(
      await usageRecordsFromRequestBody(
        body({ jsonrpc: '2.0', id: 1, method: 'initialize' }),
        { env: 'dev', now: NOW, resolver }
      )
    ).toEqual([])
  })

  it('returns nothing for malformed JSON', async () => {
    expect(
      await usageRecordsFromRequestBody('not json', {
        env: 'dev',
        now: NOW,
        resolver,
      })
    ).toEqual([])
  })

  it('captures each tools/call in a batch request', async () => {
    const records = await usageRecordsFromRequestBody(
      body([
        toolCall('component_doc', { name: 'Button' }),
        { jsonrpc: '2.0', id: 2, method: 'initialize' },
        toolCall('docs_search', { query: 'x' }),
      ]),
      { env: 'dev', now: NOW, resolver }
    )

    expect(records.map((r) => r.tool)).toEqual([
      'component_doc',
      'docs_search',
    ])
  })

  it('registers exactly the twelve docs-server tools', () => {
    expect(KNOWN_TOOLS.size).toBe(12)
  })

  // `canonicalDocsPath` reimplements the server's own path normalisation rather
  // than importing it, so this pins the two together: if `normalizeDocsPath`
  // changes how it collapses a path, this fails instead of silently splitting
  // one document across several stored keys. Cover every shape the normaliser
  // treats as significant — leading slash, repeated and `.` segments, trailing
  // slash and back-slashes — since a list of forward-slash examples would let a
  // divergence like the back-slashed form through.
  it.each([
    '/uilib/components/button.md',
    'uilib/components/button.md',
    '/uilib//components/./button.md',
    '/uilib/components/button.md/',
    '//uilib/components/./button.md//',
    '\\uilib\\components\\button.md',
    'uilib\\components\\button.md',
    '/uilib\\components/./button.md\\',
  ])(
    'stores %s exactly as the docs server normalises it',
    async (path) => {
      const [record] = await usageRecordsFromRequestBody(
        body(toolCall('docs_read', { path })),
        { env: 'dev', now: NOW, resolver }
      )

      expect(record?.path).toBe(`/${normalizeDocsPath(path)}`)
    }
  )
})
