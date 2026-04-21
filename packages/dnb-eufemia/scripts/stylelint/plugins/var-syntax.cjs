const stylelint = require('stylelint')

const RULE_NAME = 'eufemia/var-syntax'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  invalidSyntax: (raw) =>
    `Invalid custom property syntax "${raw}". Variables must start with exactly two dashes, e.g. var(--my-property).`,
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

/**
 * Matches all var() references.
 * Group 1: the first argument (property name), trimmed.
 */
const VAR_REGEX = /var\(\s*([^\s,)]+)/gi
const VAR_REGEX_SINGLE = /var\(\s*([^\s,)]+)/i

/**
 * A valid custom property name starts with exactly two dashes,
 * followed by at least one non-dash character: --foo, --my-var, etc.
 */
const VALID_PROPERTY_NAME = /^--[^-]/

const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      RULE_NAME,
      {
        actual: primary,
        possible: [true],
      }
    )

    if (!validOptions) {
      return
    }

    root.walkDecls((decl) => {
      const value = decl.value

      if (!value || !value.includes('var(')) {
        return
      }

      const matches = value.match(VAR_REGEX)

      if (!matches) {
        return
      }

      for (const match of matches) {
        const singleMatch = match.match(VAR_REGEX_SINGLE)
        const propertyName = singleMatch?.[1]

        if (!propertyName) {
          continue
        }

        if (VALID_PROPERTY_NAME.test(propertyName)) {
          continue
        }

        stylelint.utils.report({
          result,
          ruleName: RULE_NAME,
          node: decl,
          message: messages.invalidSyntax(propertyName),
        })
      }
    })
  }
}

ruleFunction.ruleName = RULE_NAME
ruleFunction.messages = messages
ruleFunction.meta = meta

module.exports = stylelint.createPlugin(RULE_NAME, ruleFunction)
module.exports.ruleName = RULE_NAME
module.exports.messages = messages
