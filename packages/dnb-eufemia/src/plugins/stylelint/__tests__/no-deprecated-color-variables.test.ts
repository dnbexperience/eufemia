import stylelint from 'stylelint'
import stylelintPlugin from '../../stylelint.js'

const plugin = stylelintPlugin as typeof stylelintPlugin & {
  recommended: { plugins: unknown[]; rules: Record<string, unknown> }
}

const lintWithRule = async (code: string) => {
  const result = await stylelint.lint({
    code,
    codeFilename: 'test.scss',
    customSyntax: 'postcss-scss',
    config: {
      plugins: stylelintPlugin,
      rules: {
        'eufemia/no-deprecated-color-variables': true,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('stylelint recommended config', () => {
  it('includes no-deprecated-color-variables in recommended', () => {
    expect(
      plugin.recommended.rules['eufemia/no-deprecated-color-variables']
    ).toBe(true)
  })

  it('includes the plugin pack in recommended', () => {
    expect(plugin.recommended.plugins).toContain(stylelintPlugin)
  })
})

describe('no-deprecated-color-variables', () => {
  it('should report deprecated color variables used as custom property names', async () => {
    const warnings = await lintWithRule(
      ':root { --color-sea-green: #007272; }'
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--color-sea-green')
  })

  it('should report deprecated color variables in declaration values', async () => {
    const warnings = await lintWithRule(
      '.dnb-button { color: var(--color-sea-green); }'
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--color-sea-green')
    expect(warnings[0].text).toContain('design token')
    expect(warnings[0].text).not.toContain(
      'https://eufemia.dnb.no/uilib/usage/customisation/theming/design-tokens/guide/'
    )
  })

  it('should not report design token variables', async () => {
    const warnings = await lintWithRule(
      '.dnb-button { color: var(--token-color-text-neutral); }'
    )

    expect(warnings).toHaveLength(0)
  })

  it('should report deprecated color variables inside fallback chains', async () => {
    const warnings = await lintWithRule(
      '.dnb-button { color: var(--token-color-text-neutral, var(--color-mint)); }'
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--color-mint')
  })
})
