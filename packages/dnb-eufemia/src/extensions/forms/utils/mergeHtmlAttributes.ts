/**
 * Merges `htmlAttributes` into the props of a field, so that event handlers
 * given in `htmlAttributes` are called in addition to the field's own handlers,
 * instead of replacing them.
 */
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
        const ownResult = ownHandler(...args)
        const givenResult = givenHandler(...args)

        // Components like Input act on the returned value, so keep the given one
        return typeof givenResult === 'undefined' ? ownResult : givenResult
      }
    }
  }

  return merged as T
}
