import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

function ItemStart({ className, ...rest }: ItemContentProps) {
  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__start',
        'dnb-t__size--basis',
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    />
  )
}
ItemStart._supportsSpacingProps = true

export default ItemStart
