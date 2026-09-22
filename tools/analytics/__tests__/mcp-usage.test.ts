import { describe, it, expect } from 'vitest'
import {
  validateMcpUsage,
  buildMcpUsageRecord,
  KNOWN_TOOLS,
} from '../src/records/mcp-usage.js'

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
        { tool: 'component_find', component: 'Button' },
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

  it('rejects the whole batch when any event is invalid', () => {
    const result = validateMcpUsage([
      { tool: 'docs_entry' },
      { tool: 'nope' },
    ])

    expect(result.ok).toBe(false)
  })

  it('accepts a valid component', () => {
    for (const component of ['Button', 'DatePicker', 'Field.Address']) {
      const result = validateMcpUsage({
        tool: 'component_doc',
        component,
      })

      expect(result).toEqual({
        ok: true,
        value: [{ tool: 'component_doc', component }],
      })
    }
  })

  it('drops an unrecognised component instead of rejecting', () => {
    for (const component of [
      'button',
      'date-picker',
      '<script>',
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

  it('drops an unrecognised or traversing path instead of rejecting', () => {
    for (const path of [
      'no-leading-slash',
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
