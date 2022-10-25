export type DefaultsProps = Record<string, unknown>
export type Contexts = Array<Record<string, unknown>>

/**
 * Extends props from a given context
 * but give the context second priority only
 *
 * @param props object of component properties
 * @param defaults object of potential default values
 * @param contexts the rest of all context to merge
 * @returns merged properties
 */
export function extendPropsWithContext<Props>(
  props: Props,
  defaults: DefaultsProps = {},
  ...contexts: Contexts
) {
  props = { ...defaults, ...props }
  return {
    ...props,
    ...reduceContextWithValue(props, defaults, contexts),
  }
}

export function extendPropsWithContextInClassComponent<Props>(
  props: Props,
  defaults: DefaultsProps = {},
  ...contexts: Contexts
) {
  return {
    ...props,
    ...reduceContextWithValue(props, defaults, contexts, {
      checkPropKey: true,
    }),
  }
}

function reduceContext(contexts: Contexts) {
  return contexts.reduce((acc, cur) => {
    if (cur) {
      acc = { ...acc, ...cur }
    }
    return acc
  }, {})
}

function reduceContextWithValue<Props>(
  props: Props,
  defaults: DefaultsProps,
  contexts: Contexts,
  { checkPropKey = false } = {}
) {
  const context = reduceContext(contexts)
  return Object.entries(context).reduce((acc, [key, value]) => {
    if (
      // Exists in props, but is same as default prop
      (checkPropKey
        ? Object.prototype.hasOwnProperty.call(props, key)
        : true) &&
      props[key] === defaults?.[key]
    ) {
      // then we use the context value
      acc[key] = value
    }
    return acc
  }, {})
}
