import React from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'

/**
 * Props for List.Cell.End (ItemEnd).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemEndProps = {
  /** Font weight of the end content. Defaults to `medium`. */
  fontWeight?: 'regular' | 'medium'
  /** Font size of the end content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
} & FlexItemProps

function ItemEnd(props: ItemEndProps) {
  const {
    fontWeight = 'medium',
    fontSize = 'basis',
    className,
    ...rest
  } = props
  return (
    <FlexItem
      className={classnames(
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
ItemEnd._supportsSpacingProps = true

export default ItemEnd
