// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'

const compile = (scss: string) =>
  loadScss(null, {
    data: `
      @use 'utilities.scss';
      ${scss}
    `,
  })

describe('Focus ring CSS', () => {
  it('adds a transparent outline, so forced colors mode shows the focus ring', () => {
    const css = compile(`
      .element:focus {
        @include utilities.focusRing();
      }
    `)

    expect(css).toMatch(
      /html\[data-whatinput=['"]?keyboard['"]?\] \.element:focus \{[^}]*outline: var\(--focus-ring-width\) solid transparent;/
    )
  })

  it('draws the outline inside the element when the focus ring is inset', () => {
    const css = compile(`
      .element {
        @include utilities.focusRing('always', $inset: inset);
      }
    `)

    expect(css).toContain(
      'outline-offset: calc(var(--focus-ring-width) * -1);'
    )
  })

  it('adds a transparent outline to the focus style', () => {
    const css = compile(`
      .element:focus-visible {
        @include utilities.focusStyle();
      }
    `)

    expect(css).toContain(
      'outline: var(--focus-ring-width) solid transparent;'
    )
    expect(css).not.toContain('outline: none')
  })
})
