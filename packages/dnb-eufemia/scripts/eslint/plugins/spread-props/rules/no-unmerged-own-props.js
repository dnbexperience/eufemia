/**
 * ESLint rule: no-unmerged-own-props
 *
 * Reports an event handler, `className` or `style` that a component sets on
 * an element before a spread of the consumer's props, when the spread can
 * contain the same prop. The consumer's value then replaces the component's
 * own, so the component silently stops working. Use `mergeProps`, take the
 * prop out of the rest and combine it with the component's own, or set the
 * own prop after the spread when the props type omits it.
 *
 * A spread counts as the consumer's props when it is the rest of an object
 * destructuring, a component's whole props parameter, or a destructured prop
 * bag such as `htmlAttributes` or `buttonProps`.
 */

const DOM_EVENT_HANDLER =
  /^on(Click|DoubleClick|ContextMenu|Aux(Click)?|Mouse[A-Z]\w*|Pointer[A-Z]\w*|Touch[A-Z]\w*|Key(Down|Up|Press)|Focus|Blur|Change|Input|BeforeInput|Invalid|Submit|Reset|Drag\w*|Drop|Scroll|Wheel|Select|Copy|Cut|Paste|Composition[A-Z]\w*|Animation[A-Z]\w*|Transition[A-Z]\w*|Toggle)(Capture)?$/

const isOwnProp = (name) =>
  name === 'className' || name === 'style' || DOM_EVENT_HANDLER.test(name)

const PROP_BAG = /(Props|Attributes)$/

const unwrap = (node) => {
  while (
    node &&
    (node.type === 'TSAsExpression' ||
      node.type === 'TSNonNullExpression' ||
      node.type === 'TSSatisfiesExpression')
  ) {
    node = node.expression
  }
  return node
}

const keyName = (property) => {
  const key = property.key
  if (!key) {
    return null
  }
  return key.type === 'Identifier' ? key.name : String(key.value)
}

const isComponentFunction = (fn) => {
  const name =
    fn.id?.name ||
    (fn.parent?.type === 'VariableDeclarator' && fn.parent.id?.name)
  return Boolean(name && /^[A-Z]/.test(name))
}

const findVariable = (identifier, scope) => {
  for (let s = scope; s; s = s.upper) {
    const variable = s.set.get(identifier.name)
    if (variable) {
      return variable
    }
  }
  return null
}

/**
 * Returns the names the spread variable cannot contain, or null when the
 * spread is not the consumer's props.
 */
function getExcludedNames(identifier, scope, depth = 0) {
  const variable = findVariable(identifier, scope)
  const def = variable?.defs?.[0]
  if (!def || depth > 5) {
    return null
  }

  const node = def.name
  const parent = node.parent

  if (
    parent?.type === 'RestElement' &&
    parent.parent?.type === 'ObjectPattern'
  ) {
    const excluded = new Set(
      parent.parent.properties
        .filter((property) => property.type === 'Property')
        .map(keyName)
        .filter(Boolean)
    )

    // Include what an earlier destructuring of the same object took out
    const init = unwrap(def.node.init)
    if (def.type === 'Variable' && init?.type === 'Identifier') {
      const source = findVariable(init, variable.scope)
      const sourceInit = unwrap(source?.defs?.[0]?.node?.init)
      if (sourceInit?.type === 'ObjectExpression') {
        return null // A locally built object, not the consumer's props
      }

      const earlier = getExcludedNames(init, variable.scope, depth + 1)
      earlier?.forEach((name) => excluded.add(name))
    }

    return excluded
  }

  if (
    parent?.type === 'Property' &&
    parent.value === node &&
    parent.parent?.type === 'ObjectPattern' &&
    PROP_BAG.test(keyName(parent))
  ) {
    return new Set()
  }

  if (
    def.type === 'Parameter' &&
    def.node.params?.[0] === node &&
    isComponentFunction(def.node)
  ) {
    return new Set()
  }

  return null
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow an own event handler, className or style before a spread of the consumer props that can replace it',
    },
    messages: {
      replaced:
        '`{{ name }}` is set before `{...{{ spread }}}`, so a `{{ name }}` in `{{ spread }}` replaces it. Use `mergeProps`, take `{{ name }}` out of `{{ spread }}` and combine it with your own, or set it after the spread when the props type omits it.',
    },
    schema: [],
  },
  create(context) {
    const sourceCode = context.sourceCode

    return {
      JSXOpeningElement(element) {
        const attributes = element.attributes
        const spreads = attributes
          .map((attribute, index) => ({ attribute, index }))
          .filter(
            ({ attribute }) => attribute.type === 'JSXSpreadAttribute'
          )
          .map(({ attribute, index }) => {
            const argument = unwrap(attribute.argument)
            if (argument?.type !== 'Identifier') {
              return null
            }
            const excluded = getExcludedNames(
              argument,
              sourceCode.getScope(attribute)
            )
            return excluded
              ? { index, name: argument.name, excluded }
              : null
          })
          .filter(Boolean)

        if (spreads.length === 0) {
          return
        }

        attributes.forEach((attribute, index) => {
          if (
            attribute.type !== 'JSXAttribute' ||
            attribute.name.type !== 'JSXIdentifier'
          ) {
            return
          }

          const name = attribute.name.name
          if (!isOwnProp(name)) {
            return
          }

          const spread = spreads.find(
            (spread) => spread.index > index && !spread.excluded.has(name)
          )
          if (!spread) {
            return
          }

          context.report({
            node: attribute,
            messageId: 'replaced',
            data: { name, spread: spread.name },
          })
        })
      },
    }
  },
}
