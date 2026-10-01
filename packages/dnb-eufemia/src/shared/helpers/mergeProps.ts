/** Merges a given props object into a component's own props, calling both event handlers instead of replacing the component's own. */
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
