import { loadScss } from '../../../core/test-utils/testSetup'

describe('resetLegacyStyles', () => {
  const compileMixin = () => {
    return loadScss(null, {
      data: `
        @use 'reset.scss' as reset;
        @include reset.resetLegacyStyles();
      `,
    }) as string
  }

  it('should reset text-align on .dnb-p without alignment modifiers', () => {
    const css = compileMixin()

    expect(css).toContain(
      'html[xmlns="http://www.w3.org/1999/xhtml"] .dnb-p:not(.dnb-t__align--center):not(.dnb-t__align--left):not(.dnb-t__align--right)'
    )
  })

  it('should not apply text-align directly on .dnb-p', () => {
    const css = compileMixin()

    // The .dnb-p rule should only have overflow and background-color,
    // not text-align — to avoid overriding alignment modifier classes
    const dnbPBlock = css.match(
      /html\[xmlns="[^"]+"\]\s+\.dnb-p\s*\{([^}]+)\}/
    )

    expect(dnbPBlock).not.toBeNull()
    expect(dnbPBlock![1]).not.toContain('text-align')
  })

  it('should still reset overflow and background-color on .dnb-p', () => {
    const css = compileMixin()

    const dnbPBlock = css.match(
      /html\[xmlns="[^"]+"\]\s+\.dnb-p\s*\{([^}]+)\}/
    )

    expect(dnbPBlock).not.toBeNull()
    expect(dnbPBlock![1]).toContain('overflow: initial')
    expect(dnbPBlock![1]).toContain('background-color: initial')
  })
})
