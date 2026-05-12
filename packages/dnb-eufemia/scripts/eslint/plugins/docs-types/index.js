const validateSupportedTypes = require('./rules/validate-supported-types')
const warnSupportedTypes = require('./rules/warn-supported-types')
const docTrailingPeriod = require('./rules/doc-trailing-period')
const defaultvalueInnerQuotes = require('./rules/defaultvalue-inner-quotes')
const docNoDoubleSpaces = require('./rules/doc-no-double-spaces')
const syncDocsJsdoc = require('./rules/sync-docs-jsdoc')

module.exports = {
  rules: {
    'validate-supported-types': validateSupportedTypes,
    'warn-supported-types': warnSupportedTypes,
    'doc-trailing-period': docTrailingPeriod,
    'defaultvalue-inner-quotes': defaultvalueInnerQuotes,
    'doc-no-double-spaces': docNoDoubleSpaces,
    'sync-docs-jsdoc': syncDocsJsdoc,
  },
}
