import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

function ItemCenter({ className, ...rest }: ItemContentProps) {
  return (
    <FlexItem
      grow
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
