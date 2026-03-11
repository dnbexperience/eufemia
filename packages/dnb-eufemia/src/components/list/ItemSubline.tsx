import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemSublineVariant = 'description'

/**
 * Props for List.Cell.Title.Subline (ItemSubline).
 * Secondary line under the title; pairs with List.Cell.Title.Overline (above the row).
 */
export type ItemSublineProps = Omit<ItemContentProps, 'variant'> & {
  /** Visual variant. Use `description` for smaller, muted text. */
  variant?: ItemSublineVariant
  /** Font size of the subline content. Defaults to `small`. When `variant="description"`, defaults to `x-small`. */
  fontSize?: 'basis' | 'small' | 'x-small'
  /** Font weight of the subline content. Defaults to `regular`. */
  fontWeight?: 'regular' | 'medium'
}

function ItemSubline({
  className,
  variant,
  fontSize = 'small',
  fontWeight = 'regular',
  children,
  ...rest
}: ItemSublineProps) {
  return (
    <FlexItem
      className={clsx(
        'dnb-list__item__subline',
        variant && `dnb-list__item__subline--${variant}`,
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
withComponentMarkers(ItemSubline, {
  _supportsSpacingProps: true,
})

export default ItemSubline
