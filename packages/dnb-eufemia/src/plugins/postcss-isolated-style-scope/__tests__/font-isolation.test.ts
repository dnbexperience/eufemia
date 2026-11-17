// @vitest-environment node

import postcss from 'postcss'
import isolateFonts from '../isolate-fonts.js'
import revisions from '../font-revisions.js'

function rewrite(css: string) {
  const root = postcss.parse(css)
  isolateFonts(root)
  return root.toString()
}

describe('isolated font families', () => {
  it('aligns faces, declarations, variables and variable fallbacks', () => {
    const result = rewrite(`
      @font-face { font-family: DNB; src: url('DNB.woff2'); }
      p { font-family: dnb, Arial, sans-serif; }
      :root { --font-family-display: 'DNB Sans Display', var(--custom, DNB); }
    `)
    expect(result).toContain(`font-family: "${revisions.families.DNB}"`)
    expect(result).toContain(`'${revisions.families['DNB Sans Display']}'`)
    expect(result).toContain(`var(--custom, "${revisions.families.DNB}")`)
    expect(result).toContain("url('DNB.woff2')")
    expect(result).toContain('Arial, sans-serif')
  })

  it.each([
    'italic 600 18px/1.5 DNB, sans-serif',
    'var(--size) DNB, sans-serif',
    'calc(1rem + 1vw)/var(--height) DNB, sans-serif',
    '18px DNB/**/Sans Display, sans-serif',
    'var(--font, italic 20px DNB, sans-serif)',
    '0 DNB, sans-serif',
    'MEDIUM DNB, sans-serif',
    '18px /**/ / /**/ 1.5 DNB, sans-serif',
  ])('rewrites shorthand families in %s', (value) => {
    const result = rewrite(`p { font: ${value}; }`)
    expect(result).toContain(
      value.includes('Display')
        ? revisions.families['DNB Sans Display']
        : revisions.families.DNB
    )
    expect(result).toContain('sans-serif')
  })

  it('preserves unrelated values and complete unknown family names', () => {
    const css = `p { content: 'DNB'; --label: 'DNB'; font-family: DNB Custom, 'DNB Sans Display Custom'; font: menu; background: url(DNB); }`
    expect(rewrite(css)).toBe(css)
  })

  it('is independent of the selector scope and idempotent', () => {
    const css = rewrite(
      `p { font-family: ${Object.keys(revisions.families)
        .map((family) => JSON.stringify(family))
        .join(', ')}; }`
    )
    expect(rewrite(css)).toBe(css)
    for (const revision of Object.values(revisions.families)) {
      expect(css).toContain(revision)
    }
  })
})
