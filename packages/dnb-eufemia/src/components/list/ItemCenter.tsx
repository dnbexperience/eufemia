import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import type { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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

withComponentMarkers(ItemCenter, {
  _supportsSpacingProps: true,
})

export default ItemCenter
