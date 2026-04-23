const stylelint = require('stylelint')

const RULE_NAME = 'eufemia/dollar-variable-no-camel-case'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  expected: (name) =>
    `Expected "$${name}" to be kebab-case. Use "$${toKebabCase(name)}" instead.`,
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

/**
 * Checks whether a variable name contains camelCase (a lowercase letter
 * immediately followed by an uppercase letter).
 */
const isCamelCase = (name) => /[a-z][A-Z]/.test(name)

/**
 * Converts a camelCase name to kebab-case.
 */
const toKebabCase = (name) =>
  name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * Extracts `$variable` names from a mixin or function parameter list.
 *
 * Given `$bg-color: null, $text-color: blue`, returns:
 *   ['bg-color', 'text-color']
 */
const extractParamNames = (params) => {
  const results = []
  const re = /\$([a-zA-Z_][\w-]*)/g
  let match

  while ((match = re.exec(params)) !== null) {
    results.push(match[1])
  }

  return results
}

const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, RULE_NAME, {
      actual: primary,
    })

    if (!validOptions) {
      return
    }

    // Check $variable declarations
    root.walkDecls((decl) => {
      if (decl.prop[0] !== '$') {
        return
      }

      const name = decl.prop.slice(1)

      if (!isCamelCase(name)) {
        return
      }

      stylelint.utils.report({
        message: messages.expected(name),
        node: decl,
        result,
        ruleName: RULE_NAME,
      })
    })

    // Check @mixin and @function parameter names
    root.walkAtRules(/^(mixin|function)$/, (atRule) => {
      const params = atRule.params

      for (const name of extractParamNames(params)) {
        if (!isCamelCase(name)) {
          continue
        }

        stylelint.utils.report({
          message: messages.expected(name),
          node: atRule,
          result,
          ruleName: RULE_NAME,
        })
      }
    })

    // Check @include named arguments
    root.walkAtRules('include', (atRule) => {
      const params = atRule.params

      for (const name of extractParamNames(params)) {
        if (!isCamelCase(name)) {
          continue
        }

        stylelint.utils.report({
          message: messages.expected(name),
          node: atRule,
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
