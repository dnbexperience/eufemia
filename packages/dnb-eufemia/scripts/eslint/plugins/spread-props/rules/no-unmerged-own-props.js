/**
 * ESLint rule: no-unmerged-own-props
 *
 * Reports an event handler, `className`, `style` or `ref` that a component
 * sets before a spread of the consumer's props, when the spread can contain
 * the same prop. The consumer's value then replaces the component's own, so
 * the component silently stops working. Use `mergeProps` (`useCombinedRef`
 * for a ref), take the prop out of the rest and combine it with the
 * component's own, or set the own prop after the spread when the props type
 * omits it.
 *
 * A spread counts as the consumer's props when it is the rest of an object
 * destructuring, a component's whole props parameter, `this.props`, or a
 * destructured prop that is spread, such as `buttonProps` or `postalCode`.
 * It is followed through locals, `||`, `??`, ternaries, object literals
 * that spread it, members named like a prop bag, such as
 * `props.buttonProps`, and helpers such as `useSpacing` and `useMemo`.
 *
 * Own props are checked on the element, in object literals spread into it,
 * also through a local or an earlier spread, and in the props given to
 * `createElement`, `cloneElement` and `Object.assign`.
 */

const DOM_EVENT_HANDLER =
  /^on(Click|DoubleClick|ContextMenu|AuxClick|Mouse[A-Z]\w*|Pointer[A-Z]\w*|(Got|Lost)PointerCapture|Touch[A-Z]\w*|Key(Down|Up|Press)|Focus|Blur|Change|Input|BeforeInput|Invalid|Submit|Reset|Drag\w*|Drop|Scroll(End)?|Wheel|Select|Copy|Cut|Paste|Composition[A-Z]\w*|Animation[A-Z]\w*|Transition[A-Z]\w*|(Before)?Toggle|Load(Start|edData|edMetadata)?|Error|Abort|CanPlay(Through)?|DurationChange|Emptied|Encrypted|Ended|Pause|Play(ing)?|Progress|RateChange|Seek(ed|ing)|Stalled|Suspend|TimeUpdate|VolumeChange|Waiting|Close|Cancel)(Capture)?$/

const isOwnProp = (name) =>
  name === 'className' ||
  name === 'style' ||
  name === 'ref' ||
  DOM_EVENT_HANDLER.test(name)

const PROP_BAG = /(^p|P)rops$|(^a|A)ttributes$/

// Such as `dataAttributes`, which only holds `data-` attributes
const ATTRIBUTE_ONLY_BAG = /^(data|aria)[A-Z]/

// Return their first argument without some props
const FIRST_ARGUMENT_HELPERS = new Set([
  'extendPropsWithContext',
  'extendExistingPropsWithContext',
  'injectTooltipSemantic',
  'omitDataValueReadWriteProps',
  'omitSpacingProps',
  'removeSpaceProps',
  'removeUndefinedProps',
  'skeletonDOMAttributes',
])

// Return their second argument with spacing or validation applied
const SECOND_ARGUMENT_HELPERS = new Set([
  'useSpacing',
  'validateDOMAttributes',
])

const ARRAY_CALLBACKS = new Set(['map', 'flatMap', 'forEach', 'filter'])

const MAX_DEPTH = 24

const unwrap = (node) => {
  while (
    node &&
    (node.type === 'TSAsExpression' ||
      node.type === 'TSNonNullExpression' ||
      node.type === 'TSSatisfiesExpression' ||
      node.type === 'ChainExpression')
  ) {
    node = node.expression
  }
  return node
}

const keyName = (property) => {
  const key = property.key
  if (!key || property.computed) {
    return null
  }
  return key.type === 'Identifier' ? key.name : String(key.value)
}

const calleeName = (call) => {
  const callee = unwrap(call.callee)
  if (callee?.type === 'Identifier') {
    return callee.name
  }
  if (
    callee?.type === 'MemberExpression' &&
    !callee.computed &&
    callee.property.type === 'Identifier'
  ) {
    return callee.property.name
  }
  return null
}

const isComponentFunction = (fn) => {
  const name =
    fn.id?.name ||
    (fn.parent?.type === 'VariableDeclarator' && fn.parent.id?.name)
  if (name) {
    return /^[A-Z]/.test(name)
  }

  // Such as `forwardRef((props, ref) => …)`, `List.Item = (props) => …` or
  // an anonymous default export
  const parent = fn.parent
  if (parent?.type === 'CallExpression') {
    return (
      parent.arguments[0] === fn &&
      ['forwardRef', 'memo'].includes(calleeName(parent))
    )
  }
  if (parent?.type === 'AssignmentExpression') {
    return /^[A-Z]/.test(parent.left.property?.name || '')
  }
  return parent?.type === 'ExportDefaultDeclaration'
}

// React passes no `ref` in the props of a `forwardRef` render function
const isForwardRefRender = (fn) =>
  fn.parent?.type === 'CallExpression' &&
  fn.parent.arguments[0] === fn &&
  calleeName(fn.parent) === 'forwardRef'

const findVariable = (identifier, scope) => {
  for (let s = scope; s; s = s.upper) {
    const variable = s.set.get(identifier.name)
    if (variable) {
      return variable
    }
  }
  return null
}

const intersect = (sets) =>
  new Set(
    [...sets[0]].filter((name) => sets.every((set) => set.has(name)))
  )

/** Returns the object literal a helper such as `useSpacing` or `useMemo` returns. */
const getReturnedObjectLiteral = (call) => {
  const name = calleeName(call)

  if (SECOND_ARGUMENT_HELPERS.has(name)) {
    const argument = unwrap(call.arguments[1])
    return argument?.type === 'ObjectExpression' ? argument : null
  }

  const callback = call.arguments[0]
  if (name !== 'useMemo' || callback?.type !== 'ArrowFunctionExpression') {
    return null
  }

  let body = unwrap(callback.body)
  if (body?.type === 'BlockStatement') {
    body = unwrap(
      body.body.find((statement) => statement.type === 'ReturnStatement')
        ?.argument
    )
  }
  return body?.type === 'ObjectExpression' ? body : null
}

/** Returns the object literals an expression is, returns or is kept in. */
const getObjectLiterals = (expression, scope, depth = 0) => {
  const node = unwrap(expression)
  if (!node || depth > MAX_DEPTH) {
    return []
  }

  if (node.type === 'ObjectExpression') {
    return [node]
  }

  if (node.type === 'CallExpression') {
    const object = getReturnedObjectLiteral(node)
    return object ? [object] : []
  }

  if (node.type === 'ConditionalExpression') {
    return [node.consequent, node.alternate].flatMap((branch) =>
      getObjectLiterals(branch, scope, depth + 1)
    )
  }

  if (node.type === 'LogicalExpression') {
    return [node.left, node.right].flatMap((operand) =>
      getObjectLiterals(operand, scope, depth + 1)
    )
  }

  if (node.type !== 'Identifier') {
    return []
  }

  const variable = findVariable(node, scope)
  const def = variable?.defs?.[0]
  if (def?.type !== 'Variable' || def.node.id !== def.name) {
    return []
  }

  // Also objects assigned later, such as `params = { onClick, ...rest }`
  const values = [
    def.node.init,
    ...variable.references
      .filter((reference) => reference.isWrite())
      .map((reference) => reference.writeExpr)
      .filter((value) => value && value !== def.node.init),
  ]

  return values.flatMap((value) =>
    getObjectLiterals(value, variable.scope, depth + 1)
  )
}

const isLocalObject = (expression, scope) =>
  getObjectLiterals(expression, scope).length > 0

/**
 * Returns the names the spread of an expression cannot contain from the
 * consumer, or null when it holds no consumer props.
 */
function getExcludedNamesOf(expression, scope, depth = 0) {
  const node = unwrap(expression)
  if (!node || depth > MAX_DEPTH) {
    return null
  }

  switch (node.type) {
    case 'Identifier':
      return getExcludedNames(node, scope, depth + 1)

    case 'ObjectExpression':
      return getLiteralExcludedNames(node, scope, depth + 1)

    case 'MemberExpression': {
      const name =
        !node.computed && node.property.type === 'Identifier'
          ? node.property.name
          : null

      // React passes no `ref` in the props of a class component
      if (node.object.type === 'ThisExpression') {
        return name === 'props' ? new Set(['ref']) : null
      }

      return name &&
        PROP_BAG.test(name) &&
        !ATTRIBUTE_ONLY_BAG.test(name) &&
        getExcludedNamesOf(node.object, scope, depth + 1)
        ? new Set()
        : null
    }

    case 'ConditionalExpression':
    case 'LogicalExpression': {
      const branches =
        node.type === 'ConditionalExpression'
          ? [node.consequent, node.alternate]
          : node.operator === '&&'
            ? [node.right]
            : [node.left, node.right]
      const sets = branches
        .map((branch) => getExcludedNamesOf(branch, scope, depth + 1))
        .filter(Boolean)
      return sets.length > 0 ? intersect(sets) : null
    }

    case 'CallExpression': {
      const object = getReturnedObjectLiteral(node)
      if (object) {
        return getLiteralExcludedNames(object, scope, depth + 1)
      }

      const name = calleeName(node)
      if (FIRST_ARGUMENT_HELPERS.has(name)) {
        return getExcludedNamesOf(node.arguments[0], scope, depth + 1)
      }
      if (SECOND_ARGUMENT_HELPERS.has(name)) {
        return getExcludedNamesOf(node.arguments[1], scope, depth + 1)
      }
      return null
    }

    default:
      return null
  }
}

/** Returns the names an object literal cannot contain from the consumer. */
function getLiteralExcludedNames(object, scope, depth) {
  const sets = []

  object.properties.forEach((property, index) => {
    if (property.type !== 'SpreadElement') {
      return
    }

    const excluded = getExcludedNamesOf(
      property.argument,
      scope,
      depth + 1
    )
    if (!excluded) {
      return
    }

    // A prop set after the spread wins, unless it passes on the consumer's
    // value, as in `{ ...rest, onClick }`
    const setAfter = object.properties
      .slice(index + 1)
      .filter((later) => later.type === 'Property')
    const passesOn = (later) =>
      unwrap(later.value)?.type === 'Identifier' &&
      Boolean(getExcludedNames(unwrap(later.value), scope, depth + 1))
    const passedOn = new Set(setAfter.filter(passesOn).map(keyName))

    sets.push(
      new Set(
        [
          ...excluded,
          ...setAfter.filter((later) => !passesOn(later)).map(keyName),
        ].filter((name) => !passedOn.has(name))
      )
    )
  })

  return sets.length > 0 ? intersect(sets) : null
}

/**
 * Returns the names the spread variable cannot contain, or null when it is
 * not the consumer's props.
 */
function getExcludedNames(identifier, scope, depth = 0) {
  const variable = findVariable(identifier, scope)
  const def = variable?.defs?.[0]
  if (!def || depth > MAX_DEPTH) {
    return null
  }

  const node = def.name

  // A default value, such as `{ buttonProps = {} }`
  const target =
    node.parent?.type === 'AssignmentPattern' && node.parent.left === node
      ? node.parent
      : node
  const parent = target.parent

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

    if (def.type === 'Parameter') {
      // The rest of an item in `items.map(({ id, ...item }) => …)` is only
      // the consumer's when the items are
      const fn = def.node
      const call = fn.parent
      const callee = unwrap(call?.callee)
      if (
        call?.type === 'CallExpression' &&
        call.arguments[0] === fn &&
        callee?.type === 'MemberExpression' &&
        ARRAY_CALLBACKS.has(callee.property?.name) &&
        !getExcludedNamesOf(callee.object, variable.scope, depth + 1)
      ) {
        return null
      }
      if (isForwardRefRender(fn)) {
        excluded.add('ref')
      }
      return excluded
    }

    // Include what an earlier destructuring of the same object took out
    const init = def.type === 'Variable' ? def.node.init : null
    if (init) {
      const earlier = getExcludedNamesOf(init, variable.scope, depth + 1)
      if (earlier) {
        earlier.forEach((name) => excluded.add(name))
      } else if (isLocalObject(init, variable.scope)) {
        return null // A locally built object, not the consumer's props
      }
    }

    return excluded
  }

  if (
    parent?.type === 'Property' &&
    parent.value === target &&
    parent.parent?.type === 'ObjectPattern'
  ) {
    const name = keyName(parent)
    if (!name || ATTRIBUTE_ONLY_BAG.test(name)) {
      return null
    }
    if (PROP_BAG.test(name)) {
      return new Set()
    }

    // Any other destructured prop of the consumer's props, such as `postalCode`
    const pattern = parent.parent
    const isFromProps =
      def.type === 'Parameter'
        ? def.node.params?.[0] === pattern && isComponentFunction(def.node)
        : def.node.id === pattern &&
          Boolean(
            getExcludedNamesOf(def.node.init, variable.scope, depth + 1)
          )
    return isFromProps ? new Set() : null
  }

  // A prop bag kept in a local, such as `const props = rest as Props`, or
  // picked from several, such as `closeButtonProps || closeButtonAttributes`
  if (
    parent?.type === 'VariableDeclarator' &&
    parent.id === node &&
    parent.init
  ) {
    return getExcludedNamesOf(parent.init, variable.scope, depth + 1)
  }

  if (
    def.type === 'Parameter' &&
    def.node.params?.[0] === target &&
    isComponentFunction(def.node)
  ) {
    return isForwardRefRender(def.node) ? new Set(['ref']) : new Set()
  }

  return null
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow an own event handler, className, style or ref before a spread of the consumer props that can replace it',
    },
    messages: {
      replaced:
        '`{{ name }}` is set before `{{ spread }}`, so `{{ name }}` from `{{ source }}` replaces it. Use `mergeProps`, take `{{ name }}` out of `{{ source }}` and combine it with your own, or set it after the spread when the props type omits it.',
      replacedRef:
        '`ref` is set before `{{ spread }}`, so `ref` from `{{ source }}` replaces it. Take `ref` out of `{{ source }}` and combine both with `useCombinedRef`, or set it after the spread when the props type omits it.',
    },
    schema: [],
  },
  create(context) {
    const sourceCode = context.sourceCode
    const reported = new Set()

    const getSource = (node) => {
      const text = sourceCode.getText(node).replace(/\s+/g, ' ')
      return text.length > 60 ? `${text.slice(0, 59)}…` : text
    }

    const ownItems = (properties) =>
      properties
        .filter((property) => property.type === 'Property')
        .map((property) => ({ name: keyName(property), node: property }))
        .filter(({ name }) => name && isOwnProp(name))

    /**
     * Reports own props that a later spread of the consumer's props
     * replaces. Items are own props `{ name, node }` and spreads
     * `{ spread, excluded, source }`, in the order they are applied.
     */
    const checkItems = (items, overridden = new Set()) => {
      items.forEach((item, index) => {
        if (!item.excluded) {
          return
        }

        const setAfter = new Set(
          items
            .slice(index + 1)
            .filter((later) => later.name)
            .map((later) => later.name)
        )

        items.slice(0, index).forEach((own) => {
          if (
            !own.name ||
            (own.group && own.group === item.group) ||
            item.excluded.has(own.name) ||
            setAfter.has(own.name) ||
            overridden.has(own.name) ||
            reported.has(own.node)
          ) {
            return
          }

          reported.add(own.node)
          context.report({
            node: own.node,
            messageId: own.name === 'ref' ? 'replacedRef' : 'replaced',
            data: {
              name: own.name,
              spread: item.spread,
              source: item.source,
            },
          })
        })
      })
    }

    /**
     * Returns the items a spread of an expression applies. They share a
     * group, as an object literal checks its own order itself.
     */
    const spreadItems = (argument, scope, spread) => {
      const group = {}
      const literals = getObjectLiterals(argument, scope)
      const excluded = getExcludedNamesOf(argument, scope)
      return [
        ...literals.flatMap((object) =>
          ownItems(object.properties).map((item) => ({ ...item, group }))
        ),
        ...(excluded
          ? [
              {
                spread,
                excluded,
                group,
                source: getSource(unwrap(argument)),
              },
            ]
          : []),
      ]
    }

    const checkObjectLiteral = (
      object,
      overridden,
      visiting = new Set()
    ) => {
      if (visiting.has(object)) {
        return
      }
      visiting.add(object)

      const scope = sourceCode.getScope(object)
      const items = object.properties.flatMap((property) => {
        if (property.type !== 'SpreadElement') {
          return ownItems([property])
        }

        getObjectLiterals(property.argument, scope).forEach((nested) =>
          checkObjectLiteral(nested, undefined, visiting)
        )
        return spreadItems(
          property.argument,
          scope,
          `...${getSource(unwrap(property.argument))}`
        )
      })

      checkItems(items, overridden)
    }

    return {
      JSXOpeningElement(element) {
        const items = element.attributes.flatMap((attribute) => {
          if (attribute.type === 'JSXSpreadAttribute') {
            return spreadItems(
              attribute.argument,
              sourceCode.getScope(attribute),
              `{...${getSource(unwrap(attribute.argument))}}`
            ).map((item) => ({ ...item, attribute }))
          }

          const name =
            attribute.name.type === 'JSXIdentifier'
              ? attribute.name.name
              : null
          return name && isOwnProp(name)
            ? [{ name, node: attribute, attribute }]
            : []
        })

        checkItems(items)

        element.attributes.forEach((attribute, index) => {
          if (attribute.type !== 'JSXSpreadAttribute') {
            return
          }

          // An own prop set again later on the element wins anyway
          const overridden = new Set(
            items
              .filter(
                (item) =>
                  item.name &&
                  element.attributes.indexOf(item.attribute) > index
              )
              .map((item) => item.name)
          )

          getObjectLiterals(
            attribute.argument,
            sourceCode.getScope(attribute)
          ).forEach((object) => checkObjectLiteral(object, overridden))
        })
      },

      CallExpression(call) {
        const name = calleeName(call)
        const scope = sourceCode.getScope(call)

        if (name === 'createElement' || name === 'cloneElement') {
          getObjectLiterals(call.arguments[1], scope).forEach((object) =>
            checkObjectLiteral(object)
          )
          return
        }

        // Object.assign(target, ...sources) applies like { ...target, ...sources }
        const callee = unwrap(call.callee)
        if (
          name === 'assign' &&
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === 'Object'
        ) {
          checkItems(
            call.arguments.flatMap((argument) =>
              spreadItems(
                argument,
                scope,
                `Object.assign(…, ${getSource(unwrap(argument))})`
              )
            )
          )
        }
      },
    }
  },
}
