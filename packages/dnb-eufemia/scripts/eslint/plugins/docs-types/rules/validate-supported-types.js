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

const CAPITALIZED_PRIMITIVES = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Object: 'object',
  Function: 'function',
  Undefined: 'undefined',
  Null: 'null',
  Void: 'void',
  Any: 'any',
  Unknown: 'unknown',
  Never: 'never',
  BigInt: 'bigint',
  Symbol: 'symbol',
}

const QUOTED_LITERAL_TARGETS = new Set([
  '_self',
  '_blank',
  '_parent',
  '_top',
])
const REACT_NODE_PATTERN = /React\.(?:Node|node)\b|(?<!\.)\bReactNode\b/g
const LOWERCASE_LITERAL_PATTERN = /^[a-z][a-z0-9-]*$/

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

function needsLiteralQuotes(value) {
  return (
    LOWERCASE_LITERAL_PATTERN.test(value) && !PRIMITIVE_TYPES.has(value)
  )
}

function isArrayGeneric(value) {
  return /^Array<(.+)>$/.test(value)
}

function replaceCapitalizedPrimitives(value) {
  let nextValue = value

  for (const [from, to] of Object.entries(CAPITALIZED_PRIMITIVES)) {
    nextValue = nextValue.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
  }

  return nextValue
}

function transformInlineType(rawValue) {
  let nextValue = rawValue.trim()

  nextValue = nextValue.replace(REACT_NODE_PATTERN, 'React.ReactNode')
  nextValue = replaceCapitalizedPrimitives(nextValue)

  if (isArrayGeneric(nextValue)) {
    const innerValue = nextValue.slice(6, -1)
    const transformedInnerValue = transformInlineType(innerValue)
    return `Array<${transformedInnerValue}>`
  }

  if (
    QUOTED_LITERAL_TARGETS.has(nextValue) ||
    needsLiteralQuotes(nextValue)
  ) {
    return `"${nextValue}"`
  }

  return nextValue
}

function escapeForSingleQuotes(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Validates and fixes `type` values in *Docs files so only primitive types are unquoted and React.ReactNode is used',
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidTypeValue:
        'Unsupported docs `type` value {{current}}. Use {{expected}}.',
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

          const expectedValue = transformInlineType(currentValue)

          if (expectedValue === currentValue) {
            continue
          }

          context.report({
            node: typeNode,
            messageId: 'invalidTypeValue',
            data: {
              current: currentValue,
              expected: expectedValue,
            },
            fix(fixer) {
              return fixer.replaceText(
                typeNode,
                `'${escapeForSingleQuotes(expectedValue)}'`
              )
            },
          })
        }
      },
    }
  },
}
