import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
export default withComponentMarkers(ItemStart, {
  _supportsSpacingProps: true,
})
