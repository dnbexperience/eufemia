const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')
const tokenNamePolicy = require('./rules/token-name-policy.cjs')
const noUnusedUse = require('./rules/no-unused-use.cjs')
const noUndefinedCustomProperty = require('./rules/no-undefined-custom-property.cjs')
const reviewRules = require('../review-rules.js')

/**
 * Inline the type, because a named typedef is not emitted into the
 * declaration file and would leave it referencing an undeclared name.
 *
 * @type {import('stylelint').Plugin[] & {
 *   reviewRules: Record<string, import('../review-rules.js').ReviewRuleMetadata>
 *   recommended: import('stylelint').Config
 * }}
 */
const pluginPack = [
  noDeprecatedColorVariables,
  tokenNamePolicy,
  noUnusedUse,
  noUndefinedCustomProperty,
]

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
