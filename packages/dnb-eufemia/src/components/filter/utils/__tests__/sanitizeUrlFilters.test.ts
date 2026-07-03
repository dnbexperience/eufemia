// @vitest-environment node

import { sanitizeUrlFilters } from '../sanitizeUrlFilters'

describe('sanitizeUrlFilters', () => {
  it('returns valid filter entries', () => {
    const input = {
      status: { value: 'active', label: 'Active' },
      count: { value: 42, label: 'Count' },
      enabled: { value: true, label: 'Enabled' },
    }

    expect(sanitizeUrlFilters(input)).toEqual(input)
  })

  it('preserves categoryLabel when present', () => {
    const input = {
      status: {
        value: 'active',
        label: 'Active',
        categoryLabel: 'Status',
      },
    }

    expect(sanitizeUrlFilters(input)).toEqual(input)
  })

  it('allows object values', () => {
    const input = {
      range: { value: { min: 0, max: 100 }, label: 'Range' },
    }

    expect(sanitizeUrlFilters(input)).toEqual(input)
  })

  it('returns empty object for null', () => {
    expect(sanitizeUrlFilters(null)).toEqual({})
  })

  it('returns empty object for array', () => {
    expect(sanitizeUrlFilters([1, 2, 3])).toEqual({})
  })

  it('returns empty object for string', () => {
    expect(sanitizeUrlFilters('hello')).toEqual({})
  })

  it('returns empty object for number', () => {
    expect(sanitizeUrlFilters(42)).toEqual({})
  })

  it('strips __proto__ key', () => {
    const input = JSON.parse(
      '{"__proto__": {"polluted": true}, "status": {"value": "ok", "label": "OK"}}'
    )

    const result = sanitizeUrlFilters(input)

    expect(result).toEqual({ status: { value: 'ok', label: 'OK' } })
    expect(result).not.toHaveProperty('__proto__', { polluted: true })
  })

  it('strips constructor key', () => {
    const input = JSON.parse(
      '{"constructor": {"prototype": {}}, "status": {"value": "ok", "label": "OK"}}'
    )

    const result = sanitizeUrlFilters(input)

    expect(result).toEqual({ status: { value: 'ok', label: 'OK' } })
    expect(result).not.toHaveProperty('constructor', {
      prototype: {},
    })
  })

  it('strips prototype key', () => {
    const input = JSON.parse(
      '{"prototype": {"polluted": true}, "status": {"value": "ok", "label": "OK"}}'
    )

    const result = sanitizeUrlFilters(input)

    expect(result).toEqual({ status: { value: 'ok', label: 'OK' } })
  })

  it('drops entries missing label', () => {
    const input = { status: { value: 'active' } }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('drops entries missing value', () => {
    const input = { status: { label: 'Active' } }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('drops entries with non-string label', () => {
    const input = { status: { value: 'active', label: 123 } }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('drops entries that are arrays', () => {
    const input = { status: ['active'] }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('drops entries that are null', () => {
    const input = { status: null }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('drops entries that are strings', () => {
    const input = { status: 'active' }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('keeps valid entries and drops invalid ones', () => {
    const input = {
      valid: { value: 'yes', label: 'Valid' },
      invalid: 'nope',
      alsoValid: { value: 42, label: 'Also Valid' },
    }

    expect(sanitizeUrlFilters(input)).toEqual({
      valid: { value: 'yes', label: 'Valid' },
      alsoValid: { value: 42, label: 'Also Valid' },
    })
  })

  it('drops entries with non-string categoryLabel', () => {
    const input = {
      status: { value: 'active', label: 'Active', categoryLabel: 99 },
    }

    expect(sanitizeUrlFilters(input)).toEqual({})
  })

  it('strips unknown properties from entries', () => {
    const input = {
      status: {
        value: 'active',
        label: 'Active',
        onClick: 'alert(1)',
        extra: true,
      },
    }

    expect(sanitizeUrlFilters(input)).toEqual({
      status: { value: 'active', label: 'Active' },
    })
  })
})
