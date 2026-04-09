const noBareBarePropsExport = require('./rules/no-bare-props-export')
const eventTypeNaming = require('./rules/event-type-naming')

module.exports = {
  rules: {
    'no-bare-props-export': noBareBarePropsExport,
    'event-type-naming': eventTypeNaming,
  },
}
