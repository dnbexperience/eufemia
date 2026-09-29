/** Merges `htmlAttributes` into field props, calling both event handlers instead of replacing the field's own. */
export default function mergeHtmlAttributes<
  T extends Record<string, unknown>,
>(props: T, htmlAttributes?: Record<string, unknown>): T {
  if (!htmlAttributes) {
    return props
  }

  const merged: Record<string, unknown> = { ...props, ...htmlAttributes }

  for (const key of Object.keys(htmlAttributes)) {
    const ownHandler = props[key]
    const givenHandler = htmlAttributes[key]

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

  return merged as T
}
