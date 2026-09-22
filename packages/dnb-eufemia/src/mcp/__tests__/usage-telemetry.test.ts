// @vitest-environment node

import path from 'node:path'
import fs from 'node:fs'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildUsageRecord,
  createUsageReporter,
  isTelemetryDisabled,
  readEufemiaVersion,
} from '../usage-telemetry'
import { registerDocsTools } from '../mcp-docs-server'

const VERSION = '11.2.3'
const DEFAULT_ENDPOINT =
  'https://server.eufemia.dnb.no/analytics/collect-local-mcp-usage'

const testDir = __dirname

describe('buildUsageRecord', () => {
  it('returns null for an unknown tool', () => {
    expect(
      buildUsageRecord('evil_tool', { name: 'x' }, VERSION)
    ).toBeNull()
  })

  it('captures the component name for component tools', () => {
    const record = buildUsageRecord(
      'component_doc',
      { name: 'Button' },
      VERSION
    )
    expect(record).toMatchObject({
      tool: 'component_doc',
      component: 'Button',
      eufemiaVersion: VERSION,
    })
    expect(record?.path).toBeUndefined()
  })

  it('captures a compound component name', () => {
    const record = buildUsageRecord(
      'component_props',
      { name: 'Field.Address' },
      VERSION
    )
    expect(record?.component).toBe('Field.Address')
  })

  it('drops an invalid component name (degrades to a tool count)', () => {
    const record = buildUsageRecord(
      'component_find',
      { name: 'not a component!' },
      VERSION
    )
    expect(record?.component).toBeUndefined()
    expect(record?.tool).toBe('component_find')
  })

  it('captures the path for docs_read', () => {
    const record = buildUsageRecord(
      'docs_read',
      { path: '/uilib/components/button.md' },
      VERSION
    )
    expect(record?.path).toBe('/uilib/components/button.md')
    expect(record?.component).toBeUndefined()
  })

  it('captures the prefix as the path for docs_list', () => {
    const record = buildUsageRecord(
      'docs_list',
      { prefix: '/uilib/components/' },
      VERSION
    )
    expect(record?.path).toBe('/uilib/components/')
  })

  it('drops a traversal path', () => {
    const record = buildUsageRecord(
      'docs_read',
      { path: '/uilib/../secret.md' },
      VERSION
    )
    expect(record?.path).toBeUndefined()
  })

  it('drops a relative (non-absolute) path', () => {
    const record = buildUsageRecord(
      'docs_read',
      { path: 'uilib/components/button.md' },
      VERSION
    )
    expect(record?.path).toBeUndefined()
  })

  it('never captures the docs_search query or prefix', () => {
    const record = buildUsageRecord(
      'docs_search',
      { query: 'how do I disable a button on submit', prefix: '/uilib/' },
      VERSION
    )
    expect(record).toMatchObject({ tool: 'docs_search' })
    expect(record?.component).toBeUndefined()
    expect(record?.path).toBeUndefined()
    expect(JSON.stringify(record)).not.toContain('how do I disable')
  })

  it('handles a non-object input', () => {
    const record = buildUsageRecord('docs_entry', null, VERSION)
    expect(record).toMatchObject({ tool: 'docs_entry' })
    expect(record?.component).toBeUndefined()
    expect(record?.path).toBeUndefined()
  })

  it('stamps an ISO timestamp', () => {
    const record = buildUsageRecord('docs_entry', {}, VERSION)
    expect(record?.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    )
  })
})

describe('isTelemetryDisabled', () => {
  it.each(['0', 'false', 'FALSE', ' false '])(
    'is disabled for %j',
    (value) => {
      expect(isTelemetryDisabled({ EUFEMIA_MCP_TELEMETRY: value })).toBe(
        true
      )
    }
  )

  it.each([undefined, '', '1', 'true', 'on'])(
    'is enabled (default on) for %j',
    (value) => {
      expect(
        isTelemetryDisabled(
          value === undefined ? {} : { EUFEMIA_MCP_TELEMETRY: value }
        )
      ).toBe(false)
    }
  )
})

describe('createUsageReporter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns null when opted out', () => {
    const fetchImpl = vi.fn()
    const reporter = createUsageReporter({
      eufemiaVersion: VERSION,
      env: { EUFEMIA_MCP_TELEMETRY: '0' },
      fetchImpl: fetchImpl as unknown as typeof fetch,
      logNotice: () => undefined,
    })
    expect(reporter).toBeNull()
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('POSTs the record to the default endpoint and sends the version', () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null))
    const reporter = createUsageReporter({
      eufemiaVersion: VERSION,
      env: {},
      fetchImpl: fetchImpl as unknown as typeof fetch,
      logNotice: () => undefined,
    })

    reporter?.onToolCall('component_doc', { name: 'Button' })

    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe(DEFAULT_ENDPOINT)
    expect(init.method).toBe('POST')
    const body = JSON.parse(init.body)
    expect(body).toMatchObject({
      tool: 'component_doc',
      component: 'Button',
      eufemiaVersion: VERSION,
    })
    expect(init.signal).toBeInstanceOf(AbortSignal)
  })

  it('honours an endpoint override from the environment', () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null))
    const reporter = createUsageReporter({
      eufemiaVersion: VERSION,
      env: { EUFEMIA_MCP_TELEMETRY_ENDPOINT: 'http://localhost:9999/x' },
      fetchImpl: fetchImpl as unknown as typeof fetch,
      logNotice: () => undefined,
    })

    reporter?.onToolCall('docs_entry', {})

    expect(fetchImpl.mock.calls[0][0]).toBe('http://localhost:9999/x')
  })

  it('does not beacon for an unknown tool', () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null))
    const reporter = createUsageReporter({
      eufemiaVersion: VERSION,
      env: {},
      fetchImpl: fetchImpl as unknown as typeof fetch,
      logNotice: () => undefined,
    })

    reporter?.onToolCall('evil_tool', {})

    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('swallows a rejected fetch without throwing', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('network down'))
    const reporter = createUsageReporter({
      eufemiaVersion: VERSION,
      env: {},
      fetchImpl: fetchImpl as unknown as typeof fetch,
      logNotice: () => undefined,
    })

    expect(() => reporter?.onToolCall('docs_entry', {})).not.toThrow()
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    // Let the swallowed rejection settle.
    await vi.runAllTimersAsync()
  })

  it('swallows a synchronously throwing fetch', () => {
    const fetchImpl = vi.fn().mockImplementation(() => {
      throw new Error('boom')
    })
    const reporter = createUsageReporter({
      eufemiaVersion: VERSION,
      env: {},
      fetchImpl: fetchImpl as unknown as typeof fetch,
      logNotice: () => undefined,
    })

    expect(() => reporter?.onToolCall('docs_entry', {})).not.toThrow()
  })
})

describe('first-run notice', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('prints the notice once to the log sink', async () => {
    const { createUsageReporter: freshCreate } =
      await import('../usage-telemetry')
    const logNotice = vi.fn()
    const env = {}
    const fetchImpl = vi.fn() as unknown as typeof fetch

    freshCreate({ eufemiaVersion: VERSION, env, fetchImpl, logNotice })
    freshCreate({ eufemiaVersion: VERSION, env, fetchImpl, logNotice })

    expect(logNotice).toHaveBeenCalledTimes(1)
    expect(logNotice).toHaveBeenCalledWith(
      expect.stringContaining('EUFEMIA_MCP_TELEMETRY=0')
    )
  })

  it('does not print the notice when opted out', async () => {
    const { createUsageReporter: freshCreate } =
      await import('../usage-telemetry')
    const logNotice = vi.fn()

    freshCreate({
      eufemiaVersion: VERSION,
      env: { EUFEMIA_MCP_TELEMETRY: 'false' },
      fetchImpl: vi.fn() as unknown as typeof fetch,
      logNotice,
    })

    expect(logNotice).not.toHaveBeenCalled()
  })
})

describe('readEufemiaVersion', () => {
  it('reads the version from the package package.json', () => {
    const pkg = JSON.parse(
      fs.readFileSync(
        path.resolve(testDir, '../../../package.json'),
        'utf8'
      )
    ) as { version: string }

    expect(readEufemiaVersion(testDir)).toBe(pkg.version)
  })

  it('falls back to the development placeholder outside the package', () => {
    expect(readEufemiaVersion(path.parse(testDir).root)).toBe(
      '0.0.0-development'
    )
  })
})

describe('registerDocsTools telemetry hook', () => {
  const okResult = { content: [{ type: 'text' as const, text: 'ok' }] }

  function wire(onToolCall?: (tool: string, input: unknown) => void) {
    const handlers = new Map<
      string,
      (input: unknown) => Promise<unknown>
    >()
    const fakeServer = {
      registerTool: (
        name: string,
        _config: unknown,
        handler: (input: unknown) => Promise<unknown>
      ) => {
        handlers.set(name, handler)
      },
    } as unknown as Parameters<typeof registerDocsTools>[0]

    const fakeTools = {
      componentDoc: vi.fn().mockResolvedValue(okResult),
    } as unknown as Parameters<typeof registerDocsTools>[1]

    registerDocsTools(fakeServer, fakeTools, { onToolCall })
    return handlers
  }

  it('calls the hook with the tool name and input after a tool call', async () => {
    const onToolCall = vi.fn()
    const handlers = wire(onToolCall)

    const result = await handlers.get('component_doc')?.({
      name: 'Button',
    })

    expect(result).toEqual(okResult)
    expect(onToolCall).toHaveBeenCalledWith('component_doc', {
      name: 'Button',
    })
  })

  it('returns the tool result even when the hook throws', async () => {
    const onToolCall = vi.fn(() => {
      throw new Error('hook boom')
    })
    const handlers = wire(onToolCall)

    const result = await handlers.get('component_doc')?.({
      name: 'Button',
    })

    expect(result).toEqual(okResult)
  })

  it('is a no-op when no hook is provided', async () => {
    const handlers = wire(undefined)

    const result = await handlers.get('component_doc')?.({
      name: 'Button',
    })

    expect(result).toEqual(okResult)
  })
})
