import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

/**
 * Props for List.Cell.Start (ItemStart).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemStartProps = ItemContentProps & {
  /** Font size of the start content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
}

function ItemStart({
  className,
  fontSize = 'basis',
  ...rest
}: ItemStartProps) {
  return (
    <FlexItem
      className={clsx(
        'dnb-list__item__start',
        fontSize && `dnb-t__size--${fontSize}`,
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    />
  )
}
ItemStart._supportsSpacingProps = true

export default ItemStart
