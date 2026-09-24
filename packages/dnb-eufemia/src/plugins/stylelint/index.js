const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')
const tokenNamePolicy = require('./rules/token-name-policy.cjs')
const noUnusedUse = require('./rules/no-unused-use.cjs')
const noUndefinedCustomProperty = require('./rules/no-undefined-custom-property.cjs')
const reviewRules = require('../review-rules.js')

/**
 * Cast, because the extra properties are assigned after the array is created.
 *
 * @typedef {import('stylelint').Plugin[] & {
 *   reviewRules: Record<string, import('../review-rules.js').ReviewRuleMetadata>
 *   recommended: import('stylelint').Config
 * }} EufemiaStylelintPlugins
 */

const pluginPack = /** @type {EufemiaStylelintPlugins} */ ([
  noDeprecatedColorVariables,
  tokenNamePolicy,
  noUnusedUse,
  noUndefinedCustomProperty,
])

pluginPack.reviewRules = reviewRules
pluginPack.recommended = {
  plugins: pluginPack,
  rules: {
    [noDeprecatedColorVariables.ruleName]: [
      true,
      {
        severity: reviewRules[noDeprecatedColorVariables.ruleName].level,
      },
    ],
    [tokenNamePolicy.ruleName]: true,
    [noUndefinedCustomProperty.ruleName]: true,
  },
}

module.exports = pluginPack
