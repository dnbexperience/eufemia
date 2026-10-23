const stylelint = require('stylelint')

const RULE_NAME = 'eufemia/no-unsafe-focus-visible'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  insideNot:
    'Unexpected ":focus-visible" inside ":not()". Safari before 15.4 drops every rule that uses ":focus-visible", so the rule never applies there. Use the notFocusVisible() mixin from utilities.scss instead.',
  inSelectorList:
    'Unexpected ":focus-visible" in a selector list with other selectors. Safari before 15.4 drops every rule that uses ":focus-visible", also the other selectors in the list. Put the ":focus-visible" selectors in their own rule.',
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

/**
 * Splits a selector list at the top-level commas.
 * Reads the raw selector, so selectors with SCSS interpolation work too.
 */
const splitSelectorList = (selector) => {
  const selectors = []
  let depth = 0
  let start = 0

  for (let i = 0; i < selector.length; i++) {
    if (selector[i] === '(') {
      depth++
    } else if (selector[i] === ')') {
      depth--
    } else if (selector[i] === ',' && depth === 0) {
      selectors.push(selector.slice(start, i))
      start = i + 1
    }
  }
  selectors.push(selector.slice(start))

  return selectors
}

/**
 * Returns true when a `:not(...)` argument contains `:focus-visible`.
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
      const { selector } = node

      if (!selector.includes(':focus-visible')) {
        return
      }

      if (hasNotFocusVisible(selector)) {
        stylelint.utils.report({
          message: messages.insideNot,
          node,
          result,
          ruleName: RULE_NAME,
        })
        return
      }

      const selectors = splitSelectorList(selector)
      const withFocusVisible = selectors.filter((item) =>
        item.includes(':focus-visible')
      )

      if (withFocusVisible.length < selectors.length) {
        stylelint.utils.report({
          message: messages.inSelectorList,
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
