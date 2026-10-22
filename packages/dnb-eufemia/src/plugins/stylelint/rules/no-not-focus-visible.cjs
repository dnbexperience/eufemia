const stylelint = require('stylelint')

const RULE_NAME = 'eufemia/no-not-focus-visible'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected:
    'Unexpected ":focus-visible" inside ":not()". Safari before 15.4 drops every rule that uses ":focus-visible", so the rule never applies there. Use the notFocusVisible() mixin from utilities.scss instead.',
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

/**
 * Returns true when a `:not(...)` argument contains `:focus-visible`.
 * Reads the raw selector, so selectors with SCSS interpolation are checked too.
 */
const hasNotFocusVisible = (selector) => {
  let index = selector.indexOf(':not(')

  while (index !== -1) {
    let depth = 0
    let end = index + ':not'.length

    for (; end < selector.length; end++) {
      if (selector[end] === '(') {
        depth++
      } else if (selector[end] === ')') {
        depth--
        if (depth === 0) {
          break
        }
      }
    }

    if (selector.slice(index, end).includes(':focus-visible')) {
      return true
    }

    index = selector.indexOf(':not(', index + 1)
  }

  return false
}

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

    root.walkRules((node) => {
      if (hasNotFocusVisible(node.selector)) {
        stylelint.utils.report({
          message: messages.rejected,
          node,
          result,
          ruleName: RULE_NAME,
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
