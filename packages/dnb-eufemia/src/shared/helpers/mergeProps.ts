/**
 * Merges given props into a component's own props, where the given props win.
 * Event handlers, like `onChange`, that both define are composed instead: the given one runs first, then the own one.
 * A given handler can return `false` to skip the own one. The `false` is returned, so components like Input can reject the change.
 */
export default function mergeProps<
  T extends Record<string, unknown>,
  U extends Record<string, unknown> = Record<string, unknown>,
>(props: T, givenProps?: U): T & U {
  if (!givenProps) {
    return props as T & U
  }

  const merged: Record<string, unknown> = { ...props, ...givenProps }

  for (const key of Object.keys(givenProps)) {
    const ownHandler = props[key]
    const givenHandler = givenProps[key]

    if (
      /^on[A-Z]/.test(key) &&
      typeof ownHandler === 'function' &&
      typeof givenHandler === 'function'
    ) {
      merged[key] = (...args: Array<unknown>) => {
        const givenResult = givenHandler(...args)

        // Components like Input use `false` to reject the event
        if (givenResult === false) {
          return false
        }

        return ownHandler(...args)
      }
    }
  }

  return merged as T & U
}
