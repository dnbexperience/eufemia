// @vitest-environment node

import stylelint from 'stylelint'
const noNotFocusVisiblePlugin = require('../rules/no-not-focus-visible.cjs')

const lintWithRule = async (code: string) => {
  const result = await stylelint.lint({
    code,
    codeFilename: 'test.scss',
    customSyntax: 'postcss-scss',
    config: {
      plugins: [noNotFocusVisiblePlugin],
      rules: {
        [noNotFocusVisiblePlugin.ruleName]: true,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('no-not-focus-visible', () => {
  it('should report :focus-visible inside :not()', async () => {
    const warnings = await lintWithRule(`
      .dnb-button:not(:hover):not(:focus-visible) {
        box-shadow: none;
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('notFocusVisible()')
  })

  it('should report a nested selector with SCSS interpolation', async () => {
    const warnings = await lintWithRule(`
      .dnb-date-picker__day {
        &--within-selection:not(#{&}--start-date)
          .dnb-button:not(:hover):not(:focus-visible) {
          background-color: transparent;
        }
      }
    `)

    expect(warnings).toHaveLength(1)
  })

  it('should report :focus-visible inside a nested :has() within :not()', async () => {
    const warnings = await lintWithRule(`
      .dnb-list__item:not(:has(> :focus-visible)) {
        border: none;
      }
    `)

    expect(warnings).toHaveLength(1)
  })

  it('should not report :focus-visible outside of :not()', async () => {
    const warnings = await lintWithRule(`
      .dnb-button:not([disabled]):focus-visible,
      .dnb-anchor:not(.dnb-anchor--no-style):focus-visible {
        outline: none;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report :not() without :focus-visible', async () => {
    const warnings = await lintWithRule(`
      .dnb-button:not(:hover):not(:focus) {
        box-shadow: none;
      }
    `)

    expect(warnings).toHaveLength(0)
  })
})
