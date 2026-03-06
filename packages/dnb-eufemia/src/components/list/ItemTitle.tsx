import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import type { ItemContentProps } from './ItemContent'
import ItemOverline from './ItemOverline'
import ItemSubline from './ItemSubline'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
      className={clsx('dnb-list__item__title', className)}
      {...rest}
    >
      <span className={`dnb-t__size--${fontSize}`}>{children}</span>
    </FlexItem>
  )
}

type ItemTitleComponent = typeof ItemTitleBase & {
  Overline: typeof ItemOverline
  Subline: typeof ItemSubline
}

const ItemTitle = ItemTitleBase as ItemTitleComponent
ItemTitle.Overline = ItemOverline
ItemTitle.Subline = ItemSubline

withComponentMarkers(ItemTitle, {
  _supportsSpacingProps: true,
})

export default ItemTitle
