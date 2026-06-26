import { describe, it, expect } from 'vitest'
import { normalizeDocsPath } from '../docs-source.js'

describe('normalizeDocsPath', () => {
  it('strips leading slashes', () => {
    expect(normalizeDocsPath('/uilib/components/button.md')).toBe(
      'uilib/components/button.md'
    )
  })

  it('strips multiple leading slashes', () => {
    expect(normalizeDocsPath('///foo/bar.md')).toBe('foo/bar.md')
  })

  it('converts backslashes to forward slashes', () => {
    expect(normalizeDocsPath('uilib\\components\\button.md')).toBe(
      'uilib/components/button.md'
    )
  })

  it('collapses empty segments', () => {
    expect(normalizeDocsPath('uilib//components///button.md')).toBe(
      'uilib/components/button.md'
    )
  })

  it('removes dot segments', () => {
    expect(normalizeDocsPath('./uilib/./components/button.md')).toBe(
      'uilib/components/button.md'
    )
  })

  it('throws on path traversal with ..', () => {
    expect(() => normalizeDocsPath('../etc/passwd')).toThrow(
      'Path escapes docs root'
    )
  })

  it('throws on embedded .. segments', () => {
    expect(() =>
      normalizeDocsPath('uilib/components/../../secret')
    ).toThrow('Path escapes docs root')
  })

  it('handles empty input', () => {
    expect(normalizeDocsPath('')).toBe('')
  })

  it('handles null/undefined input', () => {
    expect(normalizeDocsPath(null)).toBe('')
    expect(normalizeDocsPath(undefined)).toBe('')
  })

  it('handles bare filename', () => {
    expect(normalizeDocsPath('llm.md')).toBe('llm.md')
  })
})
