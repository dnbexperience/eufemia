import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

/**
 * Props for List.Cell.Title.Overline (ItemOverline).
 * Secondary line above the main row; pairs with List.Cell.Title.Subline (below title).
 */
export type ItemOverlineProps = ItemContentProps & {
  /** Font size of the overline content. Defaults to `x-small`. */
  fontSize?: 'basis' | 'small' | 'x-small'
  /** Font weight of the overline content. Defaults to `medium`. */
  fontWeight?: 'regular' | 'medium'
}

function ItemOverline({
  className,
  fontSize = 'x-small',
  fontWeight = 'medium',
  children,
  ...rest
}: ItemOverlineProps) {
  return (
    <FlexItem
      className={clsx(
        'dnb-list__item__overline',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        className
      )}
      {...rest}
    >
      {children}
    </FlexItem>
  )
}
withComponentMarkers(ItemOverline, {
  _supportsSpacingProps: true,
})

export default ItemOverline
