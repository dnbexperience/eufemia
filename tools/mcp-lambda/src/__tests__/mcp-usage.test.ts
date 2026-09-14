import { describe, it, expect } from 'vitest'
import { normalizeDocsPath } from '@dnb/eufemia/src/mcp/docs-source.js'
import {
  usageRecordsFromRequestBody,
  KNOWN_TOOLS,
} from '../records/mcp-usage.js'

const NOW = '2026-09-10T12:00:00.000Z'

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
  it('captures the component for a component tool', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'Button' })),
      { env: 'dev', now: NOW }
    )

    expect(record).toEqual({
      tool: 'component_props',
      component: 'button',
      path: '',
      env: 'dev',
      timestamp: NOW,
      createdat: NOW,
    })
  })

  it('captures a hyphenated multi-word component name', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('component_doc', { name: 'date-picker' })),
      { env: 'dev', now: NOW }
    )

    expect(record?.component).toBe('date-picker')
  })

  it('normalises component casing so variants aggregate together', () => {
    const upper = usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'Button' })),
      { env: 'dev', now: NOW }
    )[0]
    const lower = usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'button' })),
      { env: 'dev', now: NOW }
    )[0]

    expect(upper?.component).toBe('button')
    expect(lower?.component).toBe('button')
  })

  it('accepts a dotted compound component name', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('component_find', { name: 'Field.Address' })),
      { env: 'dev', now: NOW }
    )

    expect(record?.component).toBe('field.address')
  })

  it('captures the path for docs_read and the prefix for docs_list', () => {
    const read = usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path: '/uilib/components/button.md' })),
      { env: 'dev', now: NOW }
    )[0]
    const list = usageRecordsFromRequestBody(
      body(toolCall('docs_list', { prefix: '/uilib/components/' })),
      { env: 'dev', now: NOW }
    )[0]

    expect(read?.path).toBe('/uilib/components/button.md')
    expect(read?.component).toBe('')
    expect(list?.path).toBe('/uilib/components')
  })

  // The docs server accepts a path with or without a leading slash and collapses
  // empty and `.` segments before reading the file, so all of these name the same
  // document. Storing them verbatim would drop the relative form entirely and
  // split the rest across separate rows.
  it.each([
    ['/uilib/components/button.md', '/uilib/components/button.md'],
    ['uilib/components/button.md', '/uilib/components/button.md'],
    ['/uilib//components/./button.md', '/uilib/components/button.md'],
    ['/uilib/components/button.md/', '/uilib/components/button.md'],
    ['//uilib/components/button.md', '/uilib/components/button.md'],
  ])('stores the path %s as %s', (path, expected) => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path })),
      { env: 'dev', now: NOW }
    )

    expect(record?.path).toBe(expected)
  })

  it.each([
    ['a prefix without a leading slash', 'uilib/components'],
    ['a prefix with a trailing slash', '/uilib/components/'],
  ])('stores %s under one key', (_label, prefix) => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('docs_list', { prefix })),
      { env: 'dev', now: NOW }
    )

    expect(record?.path).toBe('/uilib/components')
  })

  it('stores an empty path when there is nothing to record', () => {
    const paths = ['', '/', '///', '/./'].map(
      (path) =>
        usageRecordsFromRequestBody(
          body(toolCall('docs_read', { path })),
          { env: 'dev', now: NOW }
        )[0]?.path
    )

    expect(paths).toEqual(['', '', '', ''])
  })

  it('records docs_search as the tool only, never the query', () => {
    const [record] = usageRecordsFromRequestBody(
      body(
        toolCall('docs_search', { query: 'how do I set the DatePicker' })
      ),
      { env: 'dev', now: NOW }
    )

    expect(record?.tool).toBe('docs_search')
    expect(record?.component).toBe('')
    expect(record?.path).toBe('')
    expect(JSON.stringify(record)).not.toContain('DatePicker')
  })

  it('captures the Portal content workflow tool', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('portal_content_workflow')),
      { env: 'dev', now: NOW }
    )

    expect(record?.tool).toBe('portal_content_workflow')
  })

  it('drops a component argument that is not a well-formed name', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('component_props', { name: 'Button; DROP TABLE' })),
      { env: 'dev', now: NOW }
    )

    expect(record?.component).toBe('')
  })

  it('drops a path with parent-directory traversal', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path: '/uilib/../../etc/passwd' })),
      { env: 'dev', now: NOW }
    )

    expect(record?.path).toBe('')
  })

  it('strips a query string and fragment from a path', () => {
    const [record] = usageRecordsFromRequestBody(
      body(
        toolCall('docs_read', { path: '/uilib/button.md?token=secret#x' })
      ),
      { env: 'dev', now: NOW }
    )

    expect(record?.path).toBe('/uilib/button.md')
  })

  it('ignores an unknown tool name', () => {
    expect(
      usageRecordsFromRequestBody(body(toolCall('drop_database')), {
        env: 'dev',
        now: NOW,
      })
    ).toEqual([])
  })

  it('ignores non-tools/call methods', () => {
    expect(
      usageRecordsFromRequestBody(
        body({ jsonrpc: '2.0', id: 1, method: 'initialize' }),
        { env: 'dev', now: NOW }
      )
    ).toEqual([])
  })

  it('returns nothing for malformed JSON', () => {
    expect(
      usageRecordsFromRequestBody('not json', { env: 'dev', now: NOW })
    ).toEqual([])
  })

  it('captures each tools/call in a batch request', () => {
    const records = usageRecordsFromRequestBody(
      body([
        toolCall('component_doc', { name: 'Button' }),
        { jsonrpc: '2.0', id: 2, method: 'initialize' },
        toolCall('docs_search', { query: 'x' }),
      ]),
      { env: 'dev', now: NOW }
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
  // one document across several stored keys.
  it.each([
    '/uilib/components/button.md',
    'uilib/components/button.md',
    '/uilib//components/./button.md',
    '/uilib/components/button.md/',
    '//uilib/components/./button.md//',
  ])('stores %s exactly as the docs server normalises it', (path) => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('docs_read', { path })),
      { env: 'dev', now: NOW }
    )

    expect(record?.path).toBe(`/${normalizeDocsPath(path)}`)
  })
})
