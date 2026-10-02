import { describe, it, expect } from 'vitest'
import {
  rewriteBody,
  rewriteRow,
} from '../src/scripts/rewrite-mcp-usage-keys.js'

const legacy = {
  tool: 'docs_read',
  component: '',
  path: '/uilib',
  env: 'prod',
  transport: 'local',
  eufemiaVersion: '11.14.1',
  timestamp: '2026-09-20T10:00:00.000Z',
  createdat: '2026-09-20T10:00:01.000Z',
}

const migrated = {
  tool: 'docs_read',
  component: '',
  path: '/uilib',
  env: 'prod',
  transport: 'local',
  eufemia_version: '11.14.1',
  timestamp: '2026-09-20T10:00:00.000Z',
  created_at: '2026-09-20T10:00:01.000Z',
}

describe('rewriteRow', () => {
  it('renames the legacy keys and keeps every other field', () => {
    expect(JSON.parse(rewriteRow(JSON.stringify(legacy)) ?? '')).toEqual(
      migrated
    )
  })

  it('renames a web row that only carries createdat', () => {
    const { eufemiaVersion: _, ...web } = legacy
    const { eufemia_version: __, ...expected } = migrated

    expect(JSON.parse(rewriteRow(JSON.stringify(web)) ?? '')).toEqual(
      expected
    )
  })

  it('leaves an already migrated row untouched', () => {
    expect(rewriteRow(JSON.stringify(migrated))).toBeNull()
  })

  it('prefers an existing new key over the legacy one', () => {
    const both = { ...migrated, createdat: 'stale' }

    expect(JSON.parse(rewriteRow(JSON.stringify(both)) ?? '')).toEqual(
      migrated
    )
  })

  it('skips malformed and non-object rows', () => {
    expect(rewriteRow('{not json')).toBeNull()
    expect(rewriteRow('[1]')).toBeNull()
  })
})

describe('rewriteBody', () => {
  it('rewrites each NDJSON row and keeps the line layout', () => {
    const body = [legacy, migrated]
      .map((row) => JSON.stringify(row))
      .join('\n')

    expect(
      rewriteBody(body)
        ?.split('\n')
        .map((line) => JSON.parse(line))
    ).toEqual([migrated, migrated])
  })

  it('returns null when no row needs a rewrite, so the object is not written', () => {
    expect(rewriteBody(`${JSON.stringify(migrated)}\n`)).toBeNull()
  })
})
