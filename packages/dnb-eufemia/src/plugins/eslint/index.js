const noDeprecatedColorVariables = require('./rules/no-deprecated-color-variables.js')
const reviewRules = require('../review-rules.js')

/**
 * Inline the type, because the recommended config refers back to the plugin
 * it belongs to, which TypeScript cannot describe on its own here.
 *
 * @type {import('eslint').ESLint.Plugin & {
 *   reviewRules: Record<string, import('../review-rules.js').ReviewRuleMetadata>
 *   configs: { recommended: import('eslint').Linter.Config }
 *   recommended: import('eslint').Linter.Config
 * }}
 */
const eslintPlugin = {
  reviewRules,
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
