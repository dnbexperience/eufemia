export type DefaultsProps = Record<string, unknown>
export type Contexts = Array<Record<string, unknown>>

/**
 * Overrides default props with values from context.
 *
 * "undefined" is considered the default value of a prop
 * unless otherwise provided
 *
 * @param props object of component properties
 * @param defaults object of default values
 * @param contexts one or more contexts to merge
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
      onlyMergeExistingProps: true,
    }),
  }
}

export function reduceContext(contexts: Contexts) {
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
  { onlyMergeExistingProps = false } = {}
) {
  const context = reduceContext(contexts)
  return Object.entries(context).reduce((acc, [key, value]) => {
    if (
      // An optional check to only merge existing props from context
      !onlyMergeExistingProps ||
      Object.prototype.hasOwnProperty.call(props, key)
    ) {
      if (props[key] === defaults?.[key]) {
        // Existing props can only be overridden if it has default value
        // But a prop that does not exist will also be merged (as long as the default value is "undefined")
        acc[key] = value
      }
    }

    return acc
  }, {})
}
