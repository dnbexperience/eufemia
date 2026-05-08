const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')
const tokenNamePolicy = require('./rules/token-name-policy.cjs')
const noUnusedUse = require('./rules/no-unused-use.cjs')

const pluginPack = [
  noDeprecatedColorVariables,
  tokenNamePolicy,
  noUnusedUse,
]

pluginPack.recommended = {
  plugins: [pluginPack],
  rules: {
    [noDeprecatedColorVariables.ruleName]: true,
    [tokenNamePolicy.ruleName]: true,
  },
}

module.exports = pluginPack
