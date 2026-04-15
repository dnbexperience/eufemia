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
        'Disallows consecutive spaces in `doc` strings in *Docs files.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      doubleSpaces: 'Doc string contains consecutive spaces.',
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

        if (!/  /.test(value)) {
          return // stop here
        }

        context.report({
          node: node.value,
          messageId: 'doubleSpaces',
          fix(fixer) {
            const fixed = value.replace(/ {2,}/g, ' ')

            if (node.value.type === 'Literal') {
              const raw = context.sourceCode.getText(node.value)
              const quote = raw[0]
              const escaped =
                quote === "'"
                  ? fixed.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
                  : fixed.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
              return fixer.replaceText(
                node.value,
                `${quote}${escaped}${quote}`
              )
            }

            if (node.value.type === 'TemplateLiteral') {
              const escaped = fixed
                .replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
              return fixer.replaceText(node.value, `\`${escaped}\``)
            }

            return null
          },
        })
      },
    }
  },
}
