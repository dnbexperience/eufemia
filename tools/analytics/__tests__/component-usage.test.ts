import { describe, it, expect } from 'vitest'
import {
  validateComponentUsage,
  buildComponentUsageRecord,
  normalizeComponentName,
} from '../src/records/component-usage.js'

describe('validateComponentUsage', () => {
  it('accepts a batch of well-formed facts', () => {
    const result = validateComponentUsage([
      { app: 'app-a', component: 'Button', version: '10.72.0' },
      {
        app: 'app-b',
        component: 'Input',
        version: '10.71.0',
        env: 'prod',
      },
    ])

    expect(result).toEqual({
      ok: true,
      value: [
        {
          app: 'app-a',
          component: 'Button',
          version: '10.72.0',
          env: undefined,
          timestamp: undefined,
        },
        {
          app: 'app-b',
          component: 'Input',
          version: '10.71.0',
          env: 'prod',
          timestamp: undefined,
        },
      ],
    })
  })

  it('rejects a non-array body', () => {
    expect(validateComponentUsage({ app: 'a' }).ok).toBe(false)
  })

  it('rejects an empty batch', () => {
    expect(validateComponentUsage([]).ok).toBe(false)
  })

  it('rejects a record missing required fields', () => {
    const result = validateComponentUsage([
      { app: 'app-a', component: 'Button' },
    ])

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors[0]).toMatch(/version/)
    }
  })

  it('drops an unrecognised env rather than failing the batch', () => {
    const result = validateComponentUsage([
      { app: 'app-a', component: 'Button', version: '1.0.0', env: 'NOPE' },
    ])

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value[0].env).toBeUndefined()
    }
  })

  it('accepts a full batch at the limit but rejects one over it', () => {
    const one = { app: 'app-a', component: 'Button', version: '1.0.0' }

    expect(validateComponentUsage(Array(5000).fill(one)).ok).toBe(true)

    const tooMany = validateComponentUsage(Array(5001).fill(one))
    expect(tooMany.ok).toBe(false)
    if (!tooMany.ok) {
      expect(tooMany.errors[0]).toMatch(/exceed/)
    }
  })

  it('rejects a field longer than the max field length', () => {
    const result = validateComponentUsage([
      { app: 'a'.repeat(257), component: 'Button', version: '1.0.0' },
    ])

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors[0]).toMatch(/app/)
    }
  })
})

describe('buildComponentUsageRecord', () => {
  const now = new Date('2026-09-16T12:00:00.000Z')

  it('canonicalises the component name and stamps timestamps', () => {
    const record = buildComponentUsageRecord(
      { app: ' app-a ', component: 'Button', version: ' 10.72.0 ' },
      now
    )

    expect(record).toEqual({
      app: 'app-a',
      component: 'button',
      version: '10.72.0',
      env: 'unknown',
      timestamp: '2026-09-16T12:00:00.000Z',
      created_at: '2026-09-16T12:00:00.000Z',
    })
  })

  it('keeps a valid env and a provided timestamp', () => {
    const record = buildComponentUsageRecord(
      {
        app: 'app-a',
        component: 'Button',
        version: '10.72.0',
        env: 'prod',
        timestamp: '2026-01-01T00:00:00.000Z',
      },
      now
    )

    expect(record.env).toBe('prod')
    expect(record.timestamp).toBe('2026-01-01T00:00:00.000Z')
    expect(record.created_at).toBe('2026-09-16T12:00:00.000Z')
  })

  it('degrades an unrecognised env to unknown', () => {
    const record = buildComponentUsageRecord(
      { app: 'app-a', component: 'Button', version: '1.0.0', env: 'NOPE' },
      now
    )

    expect(record.env).toBe('unknown')
  })

  it('degrades a non-ISO timestamp to the write time', () => {
    const record = buildComponentUsageRecord(
      {
        app: 'app-a',
        component: 'Button',
        version: '1.0.0',
        timestamp: 'yesterday',
      },
      now
    )

    expect(record.timestamp).toBe('2026-09-16T12:00:00.000Z')
  })
})

describe('normalizeComponentName', () => {
  it('collapses import spellings to one canonical name', () => {
    expect(normalizeComponentName('Button')).toBe('button')
    expect(normalizeComponentName(' Button ')).toBe('button')
  })
})
