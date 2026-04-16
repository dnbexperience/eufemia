function getPropertyName(node) {
  if (node.key?.type === 'Identifier') {
    return node.key.name
  }

  if (node.key?.type === 'Literal' && typeof node.key.value === 'string') {
    return node.key.value
  }

  return null
}

function getStringNodeValue(node) {
  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value
  }

  if (
    node.type === 'TemplateLiteral' &&
    node.expressions.length === 0 &&
    node.quasis.length === 1
  ) {
    return node.quasis[0].value.cooked ?? node.quasis[0].value.raw
  }

  return null
}

const BARE_WORD_PATTERN = /^[a-z][a-zA-Z0-9]*$/

function isQuotedLiteral(value) {
  return /^['"]/.test(value) || /^`/.test(value)
}

function hasQuotedLiteralsInType(typeNode) {
  if (!typeNode) {
    return false
  }

  if (typeNode.type === 'ArrayExpression') {
    return typeNode.elements.some((el) => {
      if (!el) {
        return false
      }

      const val = getStringNodeValue(el)
      return typeof val === 'string' && /^"/.test(val)
    })
  }

  const val = getStringNodeValue(typeNode)
  return typeof val === 'string' && /^"/.test(val)
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensures `defaultValue` strings are quoted when they represent string literals.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      unquotedDefaultValue:
        "defaultValue `{{value}}` should be wrapped in quotes (e.g. `'{{value}}'`).",
    },
  },

  create(context) {
    return {
      Property(node) {
        if (getPropertyName(node) !== 'defaultValue') {
          return // stop here
        }

        const value = getStringNodeValue(node.value)

        if (typeof value !== 'string') {
          return // stop here
        }

        if (isQuotedLiteral(value)) {
          return // stop here
        }

        if (!BARE_WORD_PATTERN.test(value)) {
          return // stop here
        }

        // Check if this is a known non-string value
        const nonStringValues = new Set([
          'true',
          'false',
          'null',
          'undefined',
        ])

        if (nonStringValues.has(value)) {
          return // stop here
        }

        // Check if sibling `type` property has quoted literals
        const parent = node.parent
        if (parent?.type !== 'ObjectExpression') {
          return // stop here
        }

        const typeProperty = parent.properties.find(
          (p) => p.type === 'Property' && getPropertyName(p) === 'type'
        )

        if (
          !typeProperty ||
          !hasQuotedLiteralsInType(typeProperty.value)
        ) {
          return // stop here
        }

        context.report({
          node: node.value,
          messageId: 'unquotedDefaultValue',
          data: { value },
          fix(fixer) {
            if (node.value.type === 'Literal') {
              return fixer.replaceText(node.value, `"'${value}'"`)
            }

            if (node.value.type === 'TemplateLiteral') {
              return fixer.replaceText(node.value, `"'${value}'"`)
            }

            return null
          },
        })
      },
    }
  },
}
