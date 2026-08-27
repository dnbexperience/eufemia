// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'

describe('Style scopes', () => {
  it('corrects iOS Dynamic Type text without changing the root size', () => {
    const css = loadScss(null, {
      data: `
        @use 'scopes.scss' as scopes;

        @include scopes.htmlDefault();

        body,
        .dnb-core-style {
          @include scopes.coreDefault();
        }
      `,
    })

    expect(css).toContain('font: -apple-system-body')
    expect(css).toContain('-webkit-text-size-adjust: 100%')
    expect(css).toContain(`
@supports (-webkit-touch-callout: none) {
  @supports (font: -apple-system-body) {
    body,
    .dnb-core-style {
      /* stylelint-disable-next-line */
      -webkit-text-size-adjust: 94.117647%;
    }
  }
}`)
    expect(css).not.toMatch(
      /html \{[^}]*-webkit-text-size-adjust: 94\.117647%/
    )
  })
})
