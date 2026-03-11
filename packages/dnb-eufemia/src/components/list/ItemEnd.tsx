import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

/**
 * Props for List.Cell.End (ItemEnd).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemEndProps = {
  /** Font weight of the end content. Defaults to `medium`. */
  fontWeight?: 'regular' | 'medium'
  /** Font size of the end content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
} & ItemContentProps

function ItemEnd(props: ItemEndProps) {
  const {
    fontWeight = 'medium',
    fontSize = 'basis',
    className,
    ...rest
  } = props
  return (
    <FlexItem
      className={clsx(
        'dnb-list__item__end',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        className
      )}
      innerSpace={{ left: 'small', right: 'medium' }}
      {...rest}
    />
  )
}
export default withComponentMarkers(ItemEnd, {
  _supportsSpacingProps: true,
})
