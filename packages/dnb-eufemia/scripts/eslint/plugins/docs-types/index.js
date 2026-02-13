const validateSupportedTypes = require('./rules/validate-supported-types')
const warnSupportedTypes = require('./rules/warn-supported-types')

module.exports = {
  rules: {
    'validate-supported-types': validateSupportedTypes,
    'warn-supported-types': warnSupportedTypes,
  },
}
