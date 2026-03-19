import React, { isValidElement, useMemo } from 'react'
import { useItem } from '../hooks'
import { convertJsxToString } from '../../../../shared/component-helper'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

function ItemNo({ children }: { children?: React.ReactNode }) {
  const { index } = useItem()

  const processedChildren = useMemo(
    () => replaceItemNo(children, index),
    [children, index]
  )

  return <>{processedChildren}</>
}

export function replaceItemNo(
  node: React.ReactNode,
  index: number
): React.ReactNode {
  if (node == null || node === false) {
    return node
  }

  if (typeof node === 'string' && node.includes('{itemNo}')) {
    // Fast path for strings
    return node.replace('{itemNo}', String(index + 1))
  }

  if (Array.isArray(node)) {
    return node.map((n, i) => (
      <React.Fragment key={i}>{replaceItemNo(n, index)}</React.Fragment>
    ))
  }

  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    // Recursively process children while preserving element and props
    const { children: childProps, ...rest } = node.props || {}
    const nextChildren = replaceItemNo(childProps, index)
    // Only clone if children changed (optional optimization)
    return nextChildren === childProps
      ? node
      : React.createElement(
          node.type as React.ComponentType<any>,
          rest,
          nextChildren
        )
  }

  // Fallback: try to convert to string if possible
  const text = convertJsxToString(node)
  if (text && text.includes('{itemNo}')) {
    return replaceItemNo(text, index)
  }

  return node
}

withComponentMarkers(ItemNo, {
  _supportsSpacingProps: false,
})

export default ItemNo
