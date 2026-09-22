import { afterEach, describe, expect, it } from 'vitest'
import { FONT_DISPLAY_MARKER, forceFontDisplayBlock } from '../fontDisplay'

const addStylesheet = (css: string) => {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
  return style
}

/**
 * jsdom drops `src` and `font-display` when it serializes an
 * `@font-face` rule, so rules that need those descriptors are stubbed
 * onto a real stylesheet instead.
 */
const addFontFaceStylesheet = (cssTexts: string[], href?: string) => {
  const style = addStylesheet('.placeholder { color: red; }')
  const rules = cssTexts.map((cssText) => ({ type: 5, cssText }))

  Object.defineProperty(style.sheet, 'cssRules', { get: () => rules })
  Object.defineProperty(style.sheet, 'href', { get: () => href ?? null })

  return style
}

const getOverride = () =>
  document.querySelector(`style[${FONT_DISPLAY_MARKER}]`)

afterEach(() => {
  document.head.innerHTML = ''
})

describe('forceFontDisplayBlock', () => {
  it('re-declares every @font-face with font-display: block', () => {
    addStylesheet(`
      @font-face { font-family: DNB; font-weight: normal; }
      @font-face { font-family: DNB; font-weight: 500; }
      .dnb-button { color: red; }
    `)

    forceFontDisplayBlock()

    const content = getOverride()?.textContent
    expect(content).toContain('font-family: DNB')
    expect(content.match(/font-display: block;/g)).toHaveLength(2)
    expect(content).not.toContain('.dnb-button')
  })

  it('does nothing when no @font-face rule exists', () => {
    addStylesheet('.dnb-button { color: red; }')

    forceFontDisplayBlock()

    expect(getOverride()).toBeNull()
  })

  it('does not feed on its own output when called repeatedly', () => {
    addStylesheet('@font-face { font-family: DNB; font-weight: normal; }')

    forceFontDisplayBlock()
    const first = getOverride()?.textContent

    forceFontDisplayBlock()
    forceFontDisplayBlock()

    expect(
      document.querySelectorAll(`style[${FONT_DISPLAY_MARKER}]`)
    ).toHaveLength(1)
    expect(getOverride()?.textContent).toBe(first)
  })

  it('picks up @font-face rules added after the first call', () => {
    addStylesheet('@font-face { font-family: DNB; font-weight: normal; }')
    forceFontDisplayBlock()

    addStylesheet('@font-face { font-family: DNBMono; font-weight: 500; }')
    forceFontDisplayBlock()

    const content = getOverride()?.textContent
    expect(content).toContain('font-family: DNB;')
    expect(content).toContain('font-family: DNBMono;')
    expect(content.match(/font-display: block;/g)).toHaveLength(2)
  })

  it('leaves out disabled theme stylesheets', () => {
    const active = addStylesheet(
      '@font-face { font-family: DNB; font-weight: normal; }'
    )
    const inactive = addStylesheet(
      '@font-face { font-family: Sbanken; font-weight: normal; }'
    )
    inactive.sheet.disabled = true

    forceFontDisplayBlock()

    expect(getOverride()?.textContent).toContain('font-family: DNB;')
    expect(getOverride()?.textContent).not.toContain('Sbanken')

    // Switching theme has to move the override along with it
    active.sheet.disabled = true
    inactive.sheet.disabled = false

    forceFontDisplayBlock()

    expect(getOverride()?.textContent).toContain('font-family: Sbanken;')
    expect(getOverride()?.textContent).not.toContain('font-family: DNB;')
  })

  it('skips stylesheets that deny rule access', () => {
    const style = addStylesheet(
      '@font-face { font-family: DNB; font-weight: normal; }'
    )
    Object.defineProperty(style.sheet, 'cssRules', {
      get() {
        throw new DOMException('SecurityError')
      },
    })

    expect(() => forceFontDisplayBlock()).not.toThrow()
    expect(getOverride()).toBeNull()
  })

  describe('font urls', () => {
    it('resolves a stylesheet-relative url against the stylesheet', () => {
      addFontFaceStylesheet(
        [
          '@font-face { font-family: DNB; src: url("./DNB-Regular-a1b2.woff2") format("woff2"); }',
        ],
        'http://localhost:8000/assets/main.css'
      )

      forceFontDisplayBlock()

      expect(getOverride()?.textContent).toContain(
        'url("http://localhost:8000/assets/DNB-Regular-a1b2.woff2")'
      )
    })

    it('falls back to the document base for inline stylesheets', () => {
      addFontFaceStylesheet([
        '@font-face { font-family: DNB; src: url(DNB-Regular.woff2); }',
      ])

      forceFontDisplayBlock()

      expect(getOverride()?.textContent).toContain(
        `url("${new URL('DNB-Regular.woff2', document.baseURI).href}")`
      )
    })

    it('leaves absolute and data urls untouched', () => {
      addFontFaceStylesheet(
        [
          '@font-face { font-family: A; src: url("https://cdn.dnb.no/a.woff2"); }',
          '@font-face { font-family: B; src: url("data:font/woff2;base64,AAAA"); }',
        ],
        'http://localhost:8000/assets/main.css'
      )

      forceFontDisplayBlock()

      const content = getOverride()?.textContent
      expect(content).toContain('url("https://cdn.dnb.no/a.woff2")')
      expect(content).toContain('url("data:font/woff2;base64,AAAA")')
    })

    it('replaces the original font-display instead of repeating it', () => {
      addFontFaceStylesheet([
        '@font-face { font-family: DNB; src: url("/a.woff2"); font-display: fallback; }',
      ])

      forceFontDisplayBlock()

      const content = getOverride()?.textContent
      expect(content).not.toContain('fallback')
      expect(content.match(/font-display/g)).toHaveLength(1)
      expect(content).toContain('font-display: block;')
    })

    it('does not touch local() font names', () => {
      addFontFaceStylesheet([
        '@font-face { font-family: DNB; src: local("DNB Regular"), url("./a.woff2"); }',
      ])

      forceFontDisplayBlock()

      expect(getOverride()?.textContent).toContain('local("DNB Regular")')
    })
  })
})
