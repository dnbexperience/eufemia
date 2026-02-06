import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

function ItemCenter({ className, ...rest }: ItemContentProps) {
  return (
    <FlexItem
      className={clsx(
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
