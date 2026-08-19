const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')
const tokenNamePolicy = require('./rules/token-name-policy.cjs')
const noUnusedUse = require('./rules/no-unused-use.cjs')
const noUndefinedCustomProperty = require('./rules/no-undefined-custom-property.cjs')
const reviewRules = require('../review-rules.js')

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
    [noDeprecatedColorVariables.ruleName]: true,
    [tokenNamePolicy.ruleName]: true,
    [noUndefinedCustomProperty.ruleName]: true,
  },
}

module.exports = pluginPack
