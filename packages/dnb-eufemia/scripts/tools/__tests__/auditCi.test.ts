import { describe, it, expect } from 'vitest'

const {
  resolveThreshold,
  extractGhsa,
  parseAuditOutput,
  isAllowlisted,
  filterViolations,
} = require('../auditCi.cjs')

const sampleOutput = [
  JSON.stringify({
    value: 'fast-uri',
    children: {
      ID: 1117870,
      Issue: 'fast-uri vulnerable to path traversal',
      URL: 'https://github.com/advisories/GHSA-q3j6-qgpj-74h6',
      Severity: 'high',
      Dependents: ['ajv@npm:8.18.0'],
    },
  }),
  '',
  JSON.stringify({
    value: 'lodash',
    children: {
      ID: 2222,
      Issue: 'Prototype pollution',
      URL: 'https://github.com/advisories/GHSA-aaaa-bbbb-cccc',
      Severity: 'moderate',
      Dependents: ['some-dev-tool@npm:1.0.0'],
    },
  }),
  'not json at all',
].join('\n')

describe('resolveThreshold', () => {
  it('returns the lowest enabled severity', () => {
    expect(resolveThreshold({ high: true })).toBe('high')
    expect(resolveThreshold({ moderate: true, high: true })).toBe(
      'moderate'
    )
    expect(resolveThreshold({ critical: true })).toBe('critical')
  })

  it('defaults to high when nothing is enabled', () => {
    expect(resolveThreshold({})).toBe('high')
  })
})

describe('extractGhsa', () => {
  it('extracts the GHSA id from an advisory url', () => {
    expect(
      extractGhsa('https://github.com/advisories/GHSA-q3j6-qgpj-74h6')
    ).toBe('GHSA-Q3J6-QGPJ-74H6')
  })

  it('returns null when no GHSA id is present', () => {
    expect(extractGhsa('https://example.com')).toBeNull()
    expect(extractGhsa(undefined)).toBeNull()
  })
})

describe('parseAuditOutput', () => {
  it('parses NDJSON advisories and skips blank/invalid lines', () => {
    const advisories = parseAuditOutput(sampleOutput)

    expect(advisories).toHaveLength(2)
    expect(advisories[0]).toMatchObject({
      id: 1117870,
      module: 'fast-uri',
      severity: 'high',
      ghsa: 'GHSA-Q3J6-QGPJ-74H6',
    })
  })

  it('returns an empty array for empty output', () => {
    expect(parseAuditOutput('')).toEqual([])
    expect(parseAuditOutput(undefined)).toEqual([])
  })
})

describe('isAllowlisted', () => {
  const advisory = {
    id: 1117870,
    module: 'fast-uri',
    ghsa: 'GHSA-Q3J6-QGPJ-74H6',
  }

  it('matches by numeric id', () => {
    expect(isAllowlisted(advisory, [1117870])).toBe(true)
  })

  it('matches by string id, GHSA id, and module name', () => {
    expect(isAllowlisted(advisory, ['1117870'])).toBe(true)
    expect(isAllowlisted(advisory, ['GHSA-q3j6-qgpj-74h6'])).toBe(true)
    expect(isAllowlisted(advisory, ['fast-uri'])).toBe(true)
  })

  it('does not match unrelated entries or empty allowlist', () => {
    expect(isAllowlisted(advisory, ['other'])).toBe(false)
    expect(isAllowlisted(advisory, [])).toBe(false)
  })
})

describe('filterViolations', () => {
  const advisories = parseAuditOutput(sampleOutput)

  it('keeps only advisories at or above the threshold', () => {
    const violations = filterViolations(advisories, 'high', [])
    expect(violations).toHaveLength(1)
    expect(violations[0].module).toBe('fast-uri')
  })

  it('includes lower severities when threshold is lowered', () => {
    expect(filterViolations(advisories, 'moderate', [])).toHaveLength(2)
  })

  it('excludes allowlisted advisories', () => {
    expect(
      filterViolations(advisories, 'high', ['GHSA-q3j6-qgpj-74h6'])
    ).toHaveLength(0)
  })
})
