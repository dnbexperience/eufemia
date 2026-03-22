import React from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'

function ItemCenter({ className, ...rest }: FlexItemProps) {
  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__center',
        'dnb-t__size--basis',
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    />
  )
}

ItemCenter._supportsSpacingProps = true

export default ItemCenter
