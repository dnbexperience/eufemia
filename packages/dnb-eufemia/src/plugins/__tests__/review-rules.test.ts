// @vitest-environment node

import eslintPlugin from '../eslint.js'
import reviewRules from '../review-rules.js'
import stylelintPlugin from '../stylelint.js'

const stylelintPluginWithMetadata =
  stylelintPlugin as typeof stylelintPlugin & {
    reviewRules: typeof reviewRules
  }

describe('review rule metadata', () => {
  it('is shared by the ESLint and Stylelint plugins', () => {
    expect(eslintPlugin.reviewRules).toEqual(reviewRules)
    expect(stylelintPluginWithMetadata.reviewRules).toEqual(reviewRules)
  })

  it('distinguishes warning metadata from automatic fixes', () => {
    expect(
      reviewRules['eufemia/no-deprecated-color-variables']
    ).toMatchObject({
      category: 'deprecation',
      fixable: false,
      level: 'warning',
      tools: ['eslint', 'stylelint'],
    })
  })
})
