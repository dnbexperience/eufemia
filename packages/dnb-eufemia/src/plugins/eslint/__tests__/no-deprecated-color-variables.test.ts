import { RuleTester } from 'eslint'
import eslintPlugin from '../../eslint.js'

const rule = eslintPlugin.rules['no-deprecated-color-variables']

describe('eslint recommended config', () => {
  it('includes no-deprecated-color-variables in legacyRecommended', () => {
    expect(
      eslintPlugin.configs.legacyRecommended.rules[
        'eufemia/no-deprecated-color-variables'
      ]
    ).toBe('warn')
  })

  it('includes the rule in the recommended config', () => {
    expect(
      eslintPlugin.configs.recommended.rules[
        'eufemia/no-deprecated-color-variables'
      ]
    ).toBe('warn')

    expect(eslintPlugin.configs.recommended.plugins.eufemia).toBe(
      eslintPlugin
    )
  })

  it('exposes recommended and legacyRecommended as top-level aliases', () => {
    expect(eslintPlugin.recommended).toBe(eslintPlugin.configs.recommended)
    expect(eslintPlugin.legacyRecommended).toBe(
      eslintPlugin.configs.legacyRecommended
    )
  })
})

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

ruleTester.run('no-deprecated-color-variables', rule, {
  valid: [
    {
      code: "const color = 'var(--token-color-text-neutral)'",
    },
    {
      code: "const cssVariable = '--custom-app-color'",
    },
  ],
  invalid: [
    {
      code: "const color = 'var(--color-sea-green)'",
      errors: [
        {
          messageId: 'deprecatedColorVariable',
          data: {
            variable: '--color-sea-green',
          },
        },
      ],
    },
    {
      code: "const cssVariable = '--color-mint'",
      errors: [
        {
          messageId: 'deprecatedColorVariable',
          data: {
            variable: '--color-mint',
          },
        },
      ],
    },
    {
      code: 'const styles = `color: var(--color-emerald);`',
      errors: [
        {
          messageId: 'deprecatedColorVariable',
          data: {
            variable: '--color-emerald',
          },
        },
      ],
    },
    {
      code: "const styles = <style>{'.foo { color: var(--color-ocean-green); }'}</style>",
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [
        {
          messageId: 'deprecatedColorVariable',
          data: {
            variable: '--color-ocean-green',
          },
        },
      ],
    },
    {
      code: 'const styles = <div>var(--color-ocean-green)</div>',
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [
        {
          messageId: 'deprecatedColorVariable',
          data: {
            variable: '--color-ocean-green',
          },
        },
      ],
    },
  ],
})
