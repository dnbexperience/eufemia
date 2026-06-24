import stylelint from 'stylelint'
const noUndefinedCustomPropertyPlugin = require('../rules/no-undefined-custom-property.cjs')

const lintWithRule = async (
  code: string,
  options: boolean | [boolean, Record<string, unknown>] = true
) => {
  const result = await stylelint.lint({
    code,
    codeFilename: 'test.scss',
    customSyntax: 'postcss-scss',
    config: {
      plugins: [noUndefinedCustomPropertyPlugin],
      rules: {
        [noUndefinedCustomPropertyPlugin.ruleName]: options,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('no-undefined-custom-property', () => {
  // The first lint triggers a one-time filesystem scan to build the set of
  // known custom properties. Warm it up here with a generous timeout so the
  // individual test cases run against the cached result.
  beforeAll(async () => {
    await lintWithRule(
      `.dnb-warmup { color: var(--token-color-text-action); }`
    )
  }, 120000)

  it('should report a var() reference to a property that is never defined', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz);
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain(
      '--this-property-does-not-exist-anywhere-xyz'
    )
    expect(warnings[0].rule).toBe(noUndefinedCustomPropertyPlugin.ruleName)
  })

  it('should not report when the property is defined in the same file', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        --this-property-does-not-exist-anywhere-xyz: 1rem;
        color: var(--this-property-does-not-exist-anywhere-xyz);
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report when the var() has a fallback value', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz, red);
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report SCSS-interpolated property references', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        margin: var(--margin-#{$short}-does-not-exist-xyz);
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report a property that is defined elsewhere in the codebase', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        color: var(--token-color-text-action);
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report properties listed in ignoreProperties', async () => {
    const warnings = await lintWithRule(
      `
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz);
      }
    `,
      [
        true,
        {
          ignoreProperties: [
            '--this-property-does-not-exist-anywhere-xyz',
          ],
        },
      ]
    )

    expect(warnings).toHaveLength(0)
  })

  it('should not report properties matching a regex in ignoreProperties', async () => {
    const warnings = await lintWithRule(
      `
      .dnb-foo {
        color: var(--made-up-family--small-xyz);
        background: var(--made-up-family--large-xyz);
      }
    `,
      [true, { ignoreProperties: ['/^--made-up-family--/'] }]
    )

    expect(warnings).toHaveLength(0)
  })

  it('should report each undefined reference within a single declaration', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        margin: var(--undefined-one-xyz) var(--undefined-two-xyz);
      }
    `)

    expect(warnings).toHaveLength(2)
  })

  it('should report a nested fallback reference that is undefined', async () => {
    const warnings = await lintWithRule(`
      .dnb-foo {
        color: var(--token-color-text-action, var(--undefined-nested-xyz));
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--undefined-nested-xyz')
  })

  it('should not throw on a malformed ignoreProperties regex', async () => {
    const warnings = await lintWithRule(
      `
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz);
      }
    `,
      [true, { ignoreProperties: ['/[/'] }]
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain(
      '--this-property-does-not-exist-anywhere-xyz'
    )
  })

  it('should not run when the rule is disabled', async () => {
    const warnings = await lintWithRule(
      `
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz);
      }
    `,
      false
    )

    expect(warnings).toHaveLength(0)
  })

  describe('reportFallbacks option', () => {
    it('should report an undefined primary in a var() with a fallback when enabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz, red);
      }
    `,
        [true, { reportFallbacks: true }]
      )

      expect(warnings).toHaveLength(1)
      expect(warnings[0].text).toContain(
        '--this-property-does-not-exist-anywhere-xyz'
      )
      expect(warnings[0].text).toContain('phantom')
    })

    it('should not report undefined-with-fallback when reportFallbacks is explicitly disabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        color: var(--this-property-does-not-exist-anywhere-xyz, red);
      }
    `,
        [true, { reportFallbacks: false }]
      )

      expect(warnings).toHaveLength(0)
    })

    it('should not report a defined primary used with a fallback even when enabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        color: var(--token-color-text-action, red);
      }
    `,
        [true, { reportFallbacks: true }]
      )

      expect(warnings).toHaveLength(0)
    })

    it('should not report a primary defined in the same file used with a fallback when enabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        --this-property-does-not-exist-anywhere-xyz: 1rem;
        margin: var(--this-property-does-not-exist-anywhere-xyz, 0);
      }
    `,
        [true, { reportFallbacks: true }]
      )

      expect(warnings).toHaveLength(0)
    })

    it('should respect ignoreProperties for phantom references when enabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        color: var(--made-up-hook--small-xyz, red);
        background: var(--made-up-hook--large-xyz, blue);
      }
    `,
        [
          true,
          {
            reportFallbacks: true,
            ignoreProperties: ['/^--made-up-hook--/'],
          },
        ]
      )

      expect(warnings).toHaveLength(0)
    })

    it('should not report SCSS-interpolated names in a fallback var() when enabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        margin: var(--margin-#{$short}-does-not-exist-xyz, 0);
      }
    `,
        [true, { reportFallbacks: true }]
      )

      expect(warnings).toHaveLength(0)
    })

    it('should report both no-fallback and phantom references when enabled', async () => {
      const warnings = await lintWithRule(
        `
      .dnb-foo {
        margin: var(--undefined-no-fallback-xyz);
        padding: var(--undefined-with-fallback-xyz, 0);
      }
    `,
        [true, { reportFallbacks: true }]
      )

      expect(warnings).toHaveLength(2)
      const texts = warnings.map((warning) => warning.text).join('\n')
      expect(texts).toContain('--undefined-no-fallback-xyz')
      expect(texts).toContain('--undefined-with-fallback-xyz')
    })
  })
})
