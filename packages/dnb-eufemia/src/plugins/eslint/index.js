const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')

const eslintPlugin = {
  rules: {
    'no-deprecated-color-variables': noDeprecatedColorVariables,
  },
}

const recommendedRules = {
  'eufemia/no-deprecated-color-variables': 'warn',
}

const legacyRecommendedConfig = {
  plugins: {
    eufemia: eslintPlugin,
  },
  rules: recommendedRules,
}

const flatRecommendedConfig = {
  plugins: {
    eufemia: eslintPlugin,
  },
  rules: recommendedRules,
}

eslintPlugin.configs = {
  legacyRecommended: legacyRecommendedConfig,
  recommended: flatRecommendedConfig,
}

eslintPlugin.legacyRecommended = legacyRecommendedConfig
eslintPlugin.recommended = flatRecommendedConfig

module.exports = eslintPlugin
