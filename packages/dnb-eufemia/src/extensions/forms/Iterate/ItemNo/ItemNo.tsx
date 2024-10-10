import React, { useMemo } from 'react'
import { useItem } from '../hooks'
import { convertJsxToString } from '../../../../shared/component-helper'

function ItemNo({ children }) {
  const { index } = useItem()

  children = useMemo(
    () => replaceItemNo(children, index),
    [children, index]
  )

  return <>{replaceItemNo(children, index)}</>
}

export function replaceItemNo(
  children: React.ReactNode,
  index: number
): string | React.ReactNode {
  const text =
    typeof children !== 'string' ? convertJsxToString(children) : children

  if (text.includes('{itemN')) {
    /**
     * {itemNr} is deprecated, and can be removed in v11 in favor of {itemNo}
     * So in v11 we can use '{itemNo}' instead of a regex
     */
    return text.replace(/\{itemN(r|o)\}/g, String(index + 1))
  }

  return children
}

ItemNo._supportsSpacingProps = false
export default ItemNo
