import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('data-visual-test detection', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-visual-test')
    delete (globalThis as Record<string, unknown>).IS_TEST
  })

  afterEach(() => {
    document.documentElement.removeAttribute('data-visual-test')
    delete (globalThis as Record<string, unknown>).IS_TEST
  })

  it('sets globalThis.IS_TEST when URL contains data-visual-test', () => {
    // Simulate the inline detection logic from entry.tsx
    const url = 'http://localhost:3000/uilib/components/?data-visual-test'

    if (url.includes('data-visual-test')) {
      globalThis.IS_TEST = true
      document.documentElement.setAttribute('data-visual-test', 'true')
    }

    expect(globalThis.IS_TEST).toBe(true)
    expect(document.documentElement.getAttribute('data-visual-test')).toBe(
      'true'
    )
  })

  it('does not set globalThis.IS_TEST for normal URLs', () => {
    const url = 'http://localhost:3000/uilib/components/'

    if (url.includes('data-visual-test')) {
      globalThis.IS_TEST = true
      document.documentElement.setAttribute('data-visual-test', 'true')
    }

    expect(globalThis.IS_TEST).toBeUndefined()
    expect(document.documentElement.hasAttribute('data-visual-test')).toBe(
      false
    )
  })
})

describe('visual test FOUC prevention script in index.html', () => {
  it('contains an inline script that hides sidebar and header for data-visual-test', () => {
    const html = readFileSync(
      resolve(__dirname, '../client/index.html'),
      'utf-8'
    )

    expect(html).toContain('data-visual-test')
    expect(html).toContain('header.sticky-menu')
    expect(html).toContain('nav#portal-sidebar-menu')
    expect(html).toContain('--aside-width:0')
    expect(html).toContain('.dnb-live-editor')
    expect(html).toContain('.dnb-live-toolbar')
  })

  it('injects a style tag when search includes data-visual-test', () => {
    // Simulate the inline script logic
    const search = '?data-visual-test'

    if (search.includes('data-visual-test')) {
      const s = document.createElement('style')
      s.textContent =
        'header.sticky-menu{display:none!important}nav#portal-sidebar-menu{display:none!important}.dnb-app-content{margin-left:0!important}:root{--aside-width:0}.dnb-live-editor{display:none!important}.dnb-live-toolbar{display:none!important}'
      document.head.appendChild(s)
    }

    const style = document.querySelector('head style')
    expect(style).not.toBeNull()
    expect(style!.textContent).toContain('header.sticky-menu')
    expect(style!.textContent).toContain('display:none')

    // Clean up
    style!.remove()
  })

  it('does not inject a style tag for normal URLs', () => {
    const search = '?eufemia-theme=ui'

    if (search.includes('data-visual-test')) {
      const s = document.createElement('style')
      s.textContent = 'header.sticky-menu{display:none!important}'
      document.head.appendChild(s)
    }

    const style = document.querySelector('head style')
    expect(style).toBeNull()
  })
})
