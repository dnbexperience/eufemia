const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')

const stylelintPlugin = noDeprecatedColorVariables

stylelintPlugin.rules = {
  'no-deprecated-color-variables': noDeprecatedColorVariables,
}

stylelintPlugin.recommended = {
  plugins: [noDeprecatedColorVariables],
  rules: {
    [noDeprecatedColorVariables.ruleName]: true,
  },
}

module.exports = stylelintPlugin
