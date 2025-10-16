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

  if (text.includes('{itemNo}')) {
    return text.replace('{itemNo}', String(index + 1))
  }

  return children
}

ItemNo._supportsSpacingProps = false
export default ItemNo
