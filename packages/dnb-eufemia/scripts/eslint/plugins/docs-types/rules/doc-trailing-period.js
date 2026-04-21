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

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensures `doc` strings in *Docs files end with a period.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingTrailingPeriod: 'Doc string should end with a period.',
    },
  },

  create(context) {
    return {
      Property(node) {
        if (getPropertyName(node) !== 'doc') {
          return // stop here
        }

        const value = getStringNodeValue(node.value)

        if (typeof value !== 'string') {
          return // stop here
        }

        const trimmed = value.trimEnd()

        if (trimmed.length === 0) {
          return // stop here
        }

        if (trimmed.endsWith('.')) {
          return // stop here
        }

        context.report({
          node: node.value,
          messageId: 'missingTrailingPeriod',
          fix(fixer) {
            if (node.value.type === 'Literal') {
              const raw = context.sourceCode.getText(node.value)
              const quote = raw[0]
              const inner = raw.slice(1, -1)
              const trimmedInner = inner.replace(/\s+$/, '')
              const trailingWhitespace = inner.slice(trimmedInner.length)
              return fixer.replaceText(
                node.value,
                `${quote}${trimmedInner}.${trailingWhitespace}${quote}`
              )
            }

            if (node.value.type === 'TemplateLiteral') {
              const raw = context.sourceCode.getText(node.value)
              const inner = raw.slice(1, -1)
              const trimmedInner = inner.replace(/\s+$/, '')
              const trailingWhitespace = inner.slice(trimmedInner.length)
              return fixer.replaceText(
                node.value,
                `\`${trimmedInner}.${trailingWhitespace}\``
              )
            }

            return null
          },
        })
      },
    }
  },
}
