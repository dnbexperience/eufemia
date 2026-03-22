import React from 'react'
import classnames from 'classnames'
import FlexItem, { Props as FlexItemProps } from '../flex/Item'

/**
 * Props for List.Cell.Start (ItemStart).
 * Extends FlexItem props; supports spacing props.
 */
export type ItemStartProps = FlexItemProps & {
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
      className={classnames(
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
