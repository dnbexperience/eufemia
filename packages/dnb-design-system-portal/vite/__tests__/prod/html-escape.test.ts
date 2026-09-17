import { describe, it, expect } from 'vitest'
import { escapeHtml } from '../../prod/html-escape.mts'

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;')
  })

  it('escapes the ampersand first so entities are not double-escaped', () => {
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
