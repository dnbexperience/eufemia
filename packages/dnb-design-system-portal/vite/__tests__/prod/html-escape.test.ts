import { describe, it, expect } from 'vitest'
import { escapeHtml } from '../../prod/html-escape.mts'

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;')
  })

  // The wrong order in a chained implementation (escape '<' before '&')
  // re-escapes the ampersand it just emitted.
  it('does not re-escape the entities it emits', () => {
    expect(escapeHtml('<')).toBe('&lt;')
  })

  it('escapes an ampersand in text that already looks like an entity', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;')
  })

  it('escapes a closing element sequence', () => {
    expect(escapeHtml('</title><script>alert(1)</script>')).toBe(
      '&lt;/title&gt;&lt;script&gt;alert(1)&lt;/script&gt;'
    )
  })

  it('leaves a safe value untouched', () => {
    expect(escapeHtml('Button | Eufemia')).toBe('Button | Eufemia')
  })

  it('leaves an empty string untouched', () => {
    expect(escapeHtml('')).toBe('')
  })
})
