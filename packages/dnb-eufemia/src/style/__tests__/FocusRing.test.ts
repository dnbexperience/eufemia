// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'

const compile = (scss: string) =>
  String(
    loadScss(null, {
      data: `
        @use 'utilities.scss';
        ${scss}
      `,
    })
  )

const outline = 'outline: var(--focus-ring-width) solid transparent;'

describe('Focus ring CSS', () => {
  it('shows the focus ring as an outline in forced colors mode', () => {
    const css = compile(`
      .element:focus {
        @include utilities.focusRing();
      }
    `)

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*html\[data-whatinput=['"]?keyboard['"]?\] \.element:focus \{\s*outline: var\(--focus-ring-width\) solid transparent;/
    )
  })

  it('keeps the focus styles outside of forced colors mode unchanged', () => {
    const css = compile(`
      .element:focus {
        @include utilities.focusRing();
      }
      .other:focus-visible {
        @include utilities.focusStyle();
      }
    `)
    const withoutForcedColors = css.replace(
      /@media \(forced-colors: active\) \{[\s\S]*?\n\}/g,
      ''
    )

    expect(withoutForcedColors).not.toContain(outline)
    expect(withoutForcedColors).toMatch(
      /\.other:focus-visible \{\s*outline: none;/
    )
  })

  it('draws the outline inside the element when the focus ring is inset', () => {
    const css = compile(`
      .element {
        @include utilities.focusRing('always', $inset: inset);
      }
    `)

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.element \{\s*outline: var\(--focus-ring-width\) solid transparent;\s*outline-offset: calc\(var\(--focus-ring-width\) \* -1\);/
    )
  })
})
