const stylelint = require('stylelint')

const RULE_NAME = 'eufemia/no-deprecated-color-variables'
const COLOR_VARIABLE_REGEX = /--color-[a-z0-9-]+/g
const DESIGN_TOKENS_GUIDE_URL =
  'https://eufemia.dnb.no/uilib/usage/customisation/theming/design-tokens/guide/'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected: (variable) =>
    `Deprecated CSS color variable "${variable}" detected. Use a design token instead; the correct replacement depends on context.`,
})

const meta = {
  url: DESIGN_TOKENS_GUIDE_URL,
}

const reportMatches = ({ node, result, value }) => {
  if (typeof value !== 'string') {
    return
  }

  const matches = value.match(COLOR_VARIABLE_REGEX)

  if (!matches?.length) {
    return
  }

  for (const variable of new Set(matches)) {
    stylelint.utils.report({
      message: messages.rejected(variable),
      node,
      result,
      ruleName: RULE_NAME,
      word: variable,
    })
  }
}

const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      RULE_NAME,
      {
        actual: primary,
      }
    )

    if (!validOptions) {
      return
    }

    root.walkDecls((declaration) => {
      reportMatches({
        node: declaration,
        result,
        value: declaration.prop,
      })

      reportMatches({
        node: declaration,
        result,
        value: declaration.value,
      })
    })
  }
}

ruleFunction.ruleName = RULE_NAME
ruleFunction.messages = messages
ruleFunction.meta = meta

const plugin = stylelint.createPlugin(RULE_NAME, ruleFunction)

plugin.ruleName = RULE_NAME
plugin.messages = messages

module.exports = plugin
module.exports.ruleName = RULE_NAME
module.exports.messages = messages
