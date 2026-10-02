import { clsx, type ClassValue } from 'clsx'
import type { CSSProperties } from 'react'

/**
 * Merges given props into a component's own props:
 * - Event handlers, like `onChange`, that both define are both called: the given one first, then the own one.
 *   A given handler can return `false` to skip the own one. The `false` is returned, so components like Input can reject the change.
 * - `className` values are joined.
 * - `style` objects are merged, where the given values win.
 * - For every other prop, the given value wins.
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
    const ownValue = props[key]
    const givenValue = givenProps[key]

    if (key === 'className') {
      merged.className =
        clsx(ownValue as ClassValue, givenValue as ClassValue) || undefined
    } else if (key === 'style') {
      merged.style =
        ownValue && givenValue
          ? {
              ...(ownValue as CSSProperties),
              ...(givenValue as CSSProperties),
            }
          : (givenValue ?? ownValue)
    } else if (
      /^on[A-Z]/.test(key) &&
      typeof ownValue === 'function' &&
      typeof givenValue === 'function'
    ) {
      merged[key] = (...args: Array<unknown>) => {
        const givenResult = givenValue(...args)

        // Components like Input use `false` to reject the event
        if (givenResult === false) {
          return false
        }

        return ownValue(...args)
      }
    }
  }

  return merged as T & U
}
