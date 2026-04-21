const stylelint = require('stylelint')

const RULE_NAME = 'eufemia/no-unused-use'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  unusedUse: (namespace, path) =>
    `Unexpected unused @use "${path}" with namespace "${namespace}". Either use the namespace or remove the @use statement.`,
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

/**
 * Extracts the namespace from a @use at-rule.
 *
 * - `@use 'path' as foo` → "foo"
 * - `@use 'path' as *`   → null (global — cannot be checked)
 * - `@use 'path'`         → null (side-effect / implicit namespace — skip)
 */
const getExplicitNamespace = (params) => {
  const match = params.match(/^(['"]).*?\1\s+as\s+(\S+)\s*;?\s*$/)

  if (!match) {
    return null
  }

  const namespace = match[2].replace(/;$/, '')

  if (namespace === '*') {
    return null
  }

  return namespace
}

/**
 * Extracts the module path string from @use params.
 */
const getModulePath = (params) => {
  const match = params.match(/^(['"])(.*?)\1/)
  return match ? match[2] : params
}

/**
 * Checks whether a namespace is referenced anywhere in the file
 * after the @use statement.
 *
 * A namespace is "used" if `<namespace>.` appears in any of:
 * - `@include namespace.mixin`
 * - `namespace.$variable`
 * - `namespace.function()`
 * - `meta.load-css` with the namespace
 */
const isNamespaceUsed = (root, namespace) => {
  const pattern = `${namespace}.`
  let found = false

  root.walk((node) => {
    if (found) {
      return
    }

    const textToSearch = []

    if (node.type === 'decl') {
      textToSearch.push(node.prop, node.value)
    } else if (node.type === 'atrule') {
      if (node.name !== 'use' && node.name !== 'forward') {
        textToSearch.push(node.params)
      }
    } else if (node.type === 'rule') {
      textToSearch.push(node.selector)
    }

    for (const text of textToSearch) {
      if (text && text.includes(pattern)) {
        found = true
        return
      }
    }
  })

  return found
}

const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      RULE_NAME,
      {
        actual: primary,
      },
    )

    if (!validOptions) {
      return
    }

    root.walkAtRules('use', (atRule) => {
      const namespace = getExplicitNamespace(atRule.params)

      if (!namespace) {
        return
      }

      if (!isNamespaceUsed(root, namespace)) {
        const modulePath = getModulePath(atRule.params)

        stylelint.utils.report({
          message: messages.unusedUse(namespace, modulePath),
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
module.exports.ruleName = RULE_NAME
module.exports.messages = messages
