const PRIMITIVE_TYPES = new Set([
  'string',
  'number',
  'boolean',
  'object',
  'array',
  'function',
  'undefined',
  'null',
  'void',
  'any',
  'unknown',
  'never',
  'bigint',
  'symbol',
  'true',
  'false',
])

const LOWERCASE_LITERAL_PATTERN = /^[a-z][a-z0-9-]*$/
const CAPITALIZED_TYPE_PATTERN = /^[A-Z][A-Za-z0-9_.<>()[\]/ -]*$/

function getTypePropertyName(node) {
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

function isSimpleUnionType(value) {
  if (!value.includes('|')) {
    return false
  }

  if (
    value.startsWith('(') ||
    value.startsWith('{') ||
    value.startsWith('[')
  ) {
    return false
  }

  return !/^Array<[^>]*\|[^>]*>$/.test(value)
}

function isUnknownType(value) {
  if (
    value.startsWith('(') ||
    value.startsWith('{') ||
    value.startsWith('[')
  ) {
    return false
  }

  if (PRIMITIVE_TYPES.has(value)) {
    return false
  }

  if (LOWERCASE_LITERAL_PATTERN.test(value)) {
    return false
  }

  if (/^".+"$/.test(value)) {
    return false
  }

  if (/^Array<.+>$/.test(value)) {
    return false
  }

  if (/^React\./.test(value)) {
    return false
  }

  if (CAPITALIZED_TYPE_PATTERN.test(value)) {
    return false
  }

  return true
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Warns about docs `type` formats that should be reviewed manually',
    },
    fixable: 'code',
    schema: [],
    messages: {
      avoidArrayShorthand:
        'Prefer Array<T> over T[] in docs `type` values for consistency.',
      avoidPipeUnion:
        'Avoid `|` in docs `type` strings. Prefer an array of supported types when possible.',
      unknownType:
        'Unknown docs `type` value {{current}}. Please verify if this is intended.',
    },
  },

  create(context) {
    return {
      Property(node) {
        if (getTypePropertyName(node) !== 'type') {
          return
        }

        const nodesToValidate =
          node.value.type === 'ArrayExpression'
            ? node.value.elements.filter(Boolean)
            : [node.value]

        for (const typeNode of nodesToValidate) {
          const currentValue = getStringNodeValue(typeNode)

          if (typeof currentValue !== 'string') {
            continue
          }

          const trimmedValue = currentValue.trim()
          if (/\[\]$/.test(trimmedValue)) {
            const innerValue = trimmedValue.replace(/\[\]$/, '').trim()
            const replacement = `Array<${innerValue}>`
            context.report({
              node: typeNode,
              messageId: 'avoidArrayShorthand',
              fix(fixer) {
                return fixer.replaceText(typeNode, `'${replacement}'`)
              },
            })
          }

          if (isSimpleUnionType(trimmedValue)) {
            const options = trimmedValue
              .split('|')
              .map((part) => part.trim())
              .filter(Boolean)

            context.report({
              node: typeNode,
              messageId: 'avoidPipeUnion',
              fix(fixer) {
                if (options.length < 2) {
                  return null
                }

                const replacement = options
                  .map((option) => `'${option}'`)
                  .join(', ')

                return fixer.replaceText(typeNode, `[${replacement}]`)
              },
            })
          }

          if (
            !isSimpleUnionType(trimmedValue) &&
            isUnknownType(trimmedValue)
          ) {
            context.report({
              node: typeNode,
              messageId: 'unknownType',
              data: {
                current: trimmedValue,
              },
            })
          }
        }
      },
    }
  },
}
