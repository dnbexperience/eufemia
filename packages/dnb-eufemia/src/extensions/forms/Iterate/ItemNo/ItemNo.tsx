import React, { isValidElement, useMemo } from 'react'
import { useItem } from '../hooks'
import { convertJsxToString } from '../../../../shared/component-helper'

function ItemNo({ children }) {
  const { index } = useItem()

  const processedChildren = useMemo(
    () => replaceItemNo(children, index),
    [children, index]
  )

  return <>{processedChildren}</>
}

// Define regex at module level to avoid recreating on every call
const TOKEN_REGEX = /\{itemN(r|o)\}/g // supports {itemNr} (deprecated) and {itemNo}

export function replaceItemNo(
  children: React.ReactNode,
  index: number
): React.ReactNode {
  const replaceIn = (node: React.ReactNode): React.ReactNode => {
    if (node == null || node === false) return node

    if (typeof node === 'string') {
      // Fast path for strings
      return TOKEN_REGEX.test(node)
        ? node.replace(TOKEN_REGEX, String(index + 1))
        : node
    }

    if (Array.isArray(node)) {
      return node.map((n, i) => (
        <React.Fragment key={i}>{replaceIn(n)}</React.Fragment>
      ))
    }

    if (isValidElement(node)) {
      // Recursively process children while preserving element and props
      const { children: childProps, ...rest } = (node as any).props || {}
      const nextChildren = replaceIn(childProps)
      // Only clone if children changed (optional optimization)
      return nextChildren === childProps
        ? node
        : React.cloneElement(node as any, rest, nextChildren)
    }

    // Fallback: try to convert to string if possible
    const text = convertJsxToString(node)
    if (text && text.includes('{itemN')) {
      return text.replace(TOKEN_REGEX, String(index + 1))
    }
    return node
  }

  return replaceIn(children)
}

ItemNo._supportsSpacingProps = false
export default ItemNo
