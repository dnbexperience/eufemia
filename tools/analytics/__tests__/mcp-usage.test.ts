import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import {
  validateMcpUsage,
  buildMcpUsageRecord,
  KNOWN_TOOLS,
} from '../src/records/mcp-usage.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('validateMcpUsage', () => {
  it('accepts a single event object', () => {
    const result = validateMcpUsage({ tool: 'docs_entry' })

    expect(result).toEqual({ ok: true, value: [{ tool: 'docs_entry' }] })
  })

  it('accepts an array of events', () => {
    const result = validateMcpUsage([
      { tool: 'docs_entry' },
      { tool: 'component_find', component: 'Button' },
    ])

    expect(result).toEqual({
      ok: true,
      value: [
        { tool: 'docs_entry' },
        { tool: 'component_find', component: 'button' },
      ],
    })
  })

  it('rejects an empty batch', () => {
    const result = validateMcpUsage([])

    expect(result.ok).toBe(false)
  })

  it('rejects a batch larger than the limit', () => {
    const events = Array.from({ length: 51 }, () => ({
      tool: 'docs_entry',
    }))
    const result = validateMcpUsage(events)

    expect(result.ok).toBe(false)
  })

  it('requires a known tool', () => {
    for (const tool of ['', 'not_a_tool', 42, null, undefined]) {
      const result = validateMcpUsage({ tool })

      expect(result.ok).toBe(false)
    }
  })

  it('accepts every registered tool', () => {
    for (const tool of KNOWN_TOOLS) {
      const result = validateMcpUsage({ tool })

      expect(result.ok).toBe(true)
    }
  })

  // The library gates which tools emit a beacon; anything it sends that is
  // missing here fails validation and the whole batch is rejected. This
  // workspace cannot import the library, so read its list from source.
  it('accepts the same tools the library emits beacons for', () => {
    const source = readFileSync(
      path.resolve(
        dir,
        '../../../packages/dnb-eufemia/src/mcp/usage-telemetry.ts'
      ),
      'utf8'
    )
    const list = source.match(
      /export const KNOWN_TOOLS[^[]*\[([^\]]*)\]/
    )?.[1]
    const libraryTools = [...(list ?? '').matchAll(/'([a-z0-9_]+)'/g)]
      .map((match) => match[1])
      .sort()

    expect(libraryTools.length).toBeGreaterThan(0)
    expect([...KNOWN_TOOLS].sort()).toEqual(libraryTools)
  })

  it('rejects the whole batch when any event is invalid', () => {
    const result = validateMcpUsage([
      { tool: 'docs_entry' },
      { tool: 'nope' },
    ])

    expect(result.ok).toBe(false)
  })

  it('accepts a valid component and normalises it to the form the docs server resolves against', () => {
    for (const [component, expected] of [
      ['Button', 'button'],
      ['DatePicker', 'datepicker'],
      ['date-picker', 'date-picker'],
      ['Field.Address', 'field.address'],
      [' Button ', 'button'],
    ] as const) {
      const result = validateMcpUsage({
        tool: 'component_doc',
        component,
      })

      expect(result).toEqual({
        ok: true,
        value: [{ tool: 'component_doc', component: expected }],
      })
    }
  })

  it('drops an unrecognised component instead of rejecting', () => {
    for (const component of [
      '<script>',
      '.leading-dot',
      'trailing-dot.',
      'a'.repeat(65),
      42,
    ]) {
      const result = validateMcpUsage({
        tool: 'component_doc',
        component,
      })

      expect(result).toEqual({
        ok: true,
        value: [{ tool: 'component_doc' }],
      })
    }
  })

  it('accepts a valid path', () => {
    const result = validateMcpUsage({
      tool: 'docs_read',
      path: '/uilib/components/button.md',
    })

    expect(result).toEqual({
      ok: true,
      value: [{ tool: 'docs_read', path: '/uilib/components/button.md' }],
    })
  })

  it('canonicalises a path the way the docs server resolves it', () => {
    for (const [path, expected] of [
      ['uilib/button.md', '/uilib/button.md'],
      ['/uilib/./button.md', '/uilib/button.md'],
      ['\\uilib\\button.md', '/uilib/button.md'],
    ] as const) {
      const result = validateMcpUsage({ tool: 'docs_read', path })

      expect(result).toEqual({
        ok: true,
        value: [{ tool: 'docs_read', path: expected }],
      })
    }
  })

  it('strips a query string and fragment from a path instead of dropping it', () => {
    const result = validateMcpUsage({
      tool: 'docs_read',
      path: '/uilib/button.md?token=secret#x',
    })

    expect(result).toEqual({
      ok: true,
      value: [{ tool: 'docs_read', path: '/uilib/button.md' }],
    })
  })

  it('drops a traversing or malformed path instead of rejecting', () => {
    for (const path of [
      '/../etc/passwd',
      '/a/../b',
      '/<script>',
      '/' + 'a'.repeat(513),
      42,
    ]) {
      const result = validateMcpUsage({ tool: 'docs_read', path })

      expect(result).toEqual({ ok: true, value: [{ tool: 'docs_read' }] })
    }
  })

  it('accepts a valid env label', () => {
    const result = validateMcpUsage({ tool: 'docs_entry', env: 'prod' })

    expect(result).toEqual({
      ok: true,
      value: [{ tool: 'docs_entry', env: 'prod' }],
    })
  })

  it('drops an unrecognised env instead of rejecting', () => {
    for (const env of ['Prod', 'a'.repeat(33), '1prod', 'pr od', 42]) {
      const result = validateMcpUsage({ tool: 'docs_entry', env })

      expect(result).toEqual({ ok: true, value: [{ tool: 'docs_entry' }] })
    }
  })

  it('accepts a valid semver eufemiaVersion', () => {
    for (const eufemiaVersion of [
      '12.3.0',
      '0.0.1',
      '12.3.0-beta.1',
      '12.3.0+build.5',
    ]) {
      const result = validateMcpUsage({
        tool: 'docs_entry',
        eufemiaVersion,
      })

      expect(result).toEqual({
        ok: true,
        value: [{ tool: 'docs_entry', eufemiaVersion }],
      })
    }
  })

  it('rejects a non-semver eufemiaVersion', () => {
    for (const eufemiaVersion of [
      'latest',
      'v12.3.0',
      '12.3',
      '12',
      'not-a-version',
      'a'.repeat(65),
      42,
    ]) {
      const result = validateMcpUsage({
        tool: 'docs_entry',
        eufemiaVersion,
      })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects an invalid timestamp', () => {
    for (const timestamp of ['nope', '2026', 'March 5', '2026-08-20']) {
      const result = validateMcpUsage({ tool: 'docs_entry', timestamp })

      expect(result.ok).toBe(false)
    }
  })

  it('ignores a client-sent transport field', () => {
    const result = validateMcpUsage({
      tool: 'docs_entry',
      transport: 'web',
    })

    expect(result).toEqual({ ok: true, value: [{ tool: 'docs_entry' }] })
  })
})

describe('buildMcpUsageRecord', () => {
  const createdAt = '2026-08-20T10:00:00.000Z'

  it('stamps the given transport regardless of input', () => {
    const record = buildMcpUsageRecord(
      { tool: 'docs_entry' },
      createdAt,
      'local'
    )

    expect(record.transport).toBe('local')
  })

  it('defaults absent fields', () => {
    const record = buildMcpUsageRecord(
      { tool: 'docs_entry' },
      createdAt,
      'local'
    )

    expect(record).toEqual({
      tool: 'docs_entry',
      component: '',
      path: '',
      env: 'unknown',
      transport: 'local',
      eufemiaVersion: 'unknown',
      timestamp: createdAt,
      createdat: createdAt,
    })
  })

  it('keeps a component only for a component tool', () => {
    const record = buildMcpUsageRecord(
      { tool: 'docs_entry', component: 'Button' },
      createdAt,
      'local'
    )

    expect(record.component).toBe('')
  })

  it('keeps a path only for a path tool', () => {
    const record = buildMcpUsageRecord(
      { tool: 'docs_entry', path: '/a' },
      createdAt,
      'local'
    )

    expect(record.path).toBe('')
  })

  it('carries through a valid component and path for their matching tools', () => {
    const component = buildMcpUsageRecord(
      { tool: 'component_doc', component: 'Button' },
      createdAt,
      'local'
    )
    expect(component.component).toBe('Button')

    const path = buildMcpUsageRecord(
      { tool: 'docs_read', path: '/a' },
      createdAt,
      'local'
    )
    expect(path.path).toBe('/a')
  })
})
