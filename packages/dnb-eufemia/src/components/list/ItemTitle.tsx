import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

/**
 * Props for List.Cell.Title (ItemTitle).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemTitleProps = ItemContentProps & {
  /** Font size of the title content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
}

function ItemTitle({
  className,
  fontSize = 'basis',
  children,
  ...rest
}: ItemTitleProps) {
  return (
    <FlexItem
      innerSpace={{ left: 'small' }}
      className={classnames('dnb-list__item__title', className)}
      {...rest}
    >
      <span className={`dnb-t__size--${fontSize}`}>{children}</span>
    </FlexItem>
  )
}
ItemTitle._supportsSpacingProps = true

export default ItemTitle
