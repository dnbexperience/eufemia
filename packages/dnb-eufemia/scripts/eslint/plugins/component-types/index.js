const requireComponentPrefix = require('./rules/require-component-prefix')
const noInlineTypeExports = require('./rules/no-inline-type-exports')

module.exports = {
  rules: {
    'require-component-prefix': requireComponentPrefix,
    'no-inline-type-exports': noInlineTypeExports,
  },
}
