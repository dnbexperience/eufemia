const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')

const eslintPlugin = {
  rules: {
    'no-deprecated-color-variables': noDeprecatedColorVariables,
  },
}

const recommendedRules = {
  'eufemia/no-deprecated-color-variables': 'warn',
}

const recommendedConfig = {
  plugins: {
    eufemia: eslintPlugin,
  },
  rules: recommendedRules,
}

eslintPlugin.configs = {
  recommended: recommendedConfig,
}

eslintPlugin.recommended = recommendedConfig

module.exports = eslintPlugin
