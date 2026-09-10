import { describe, it, expect } from 'vitest'
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
      component: 'Button',
      path: '',
      env: 'dev',
      timestamp: NOW,
      createdat: NOW,
    })
  })

  it('accepts a dotted compound component name', () => {
    const [record] = usageRecordsFromRequestBody(
      body(toolCall('component_find', { name: 'Field.Address' })),
      { env: 'dev', now: NOW }
    )

    expect(record?.component).toBe('Field.Address')
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
    expect(list?.path).toBe('/uilib/components/')
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

  it('registers exactly the eleven docs-server tools', () => {
    expect(KNOWN_TOOLS.size).toBe(11)
  })
})
