import React from 'react'

/**
 * Converts React children to a flat array, filtering out null, undefined,
 * and boolean values.
 *
 * Replaces the legacy React.Children utilities (toArray, map, forEach,
 * count) which are discouraged in React 19+.
 *
 * Note: Fragments are kept as valid elements (not flattened), matching
 * the behavior of React.Children.toArray.
 */
export default function toChildArray(
  children: React.ReactNode
): React.ReactNode[] {
  if (children == null || typeof children === 'boolean') {
    return []
  }
  if (Array.isArray(children)) {
    return children.flatMap(toChildArray)
  }
  return [children]
}
