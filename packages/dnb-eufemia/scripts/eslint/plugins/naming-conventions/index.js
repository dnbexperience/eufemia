const noBareBarePropsExport = require('./rules/no-bare-props-export')
const consistentEventTypeNaming = require('./rules/consistent-event-type-naming')

module.exports = {
  rules: {
    'no-bare-props-export': noBareBarePropsExport,
    'consistent-event-type-naming': consistentEventTypeNaming,
  },
}
