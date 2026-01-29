import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

export type ItemEndProps = {
  fontWeight?: 'regular' | 'medium'
} & ItemContentProps

function ItemEnd(props: ItemEndProps) {
  const { fontWeight = 'medium', className, ...rest } = props
  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__end',
        'dnb-t__size--basis',
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
