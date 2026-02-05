import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'
import ItemOverline from './ItemOverline'
import ItemSubline from './ItemSubline'

/**
 * Props for List.Cell.Title (ItemTitle).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemTitleProps = ItemContentProps & {
  /** Font size of the title content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
}

function ItemTitleBase({
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
ItemTitleBase._supportsSpacingProps = true

type ItemTitleComponent = typeof ItemTitleBase & {
  Overline: typeof ItemOverline
  Subline: typeof ItemSubline
}

const ItemTitle = ItemTitleBase as ItemTitleComponent
ItemTitle.Overline = ItemOverline
ItemTitle.Subline = ItemSubline

export default ItemTitle
