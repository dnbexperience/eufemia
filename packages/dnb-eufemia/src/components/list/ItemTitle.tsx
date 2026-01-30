import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

function ItemTitle({ className, children, ...rest }: ItemContentProps) {
  return (
    <FlexItem
      grow
      innerSpace={{ left: 'small' }}
      className={classnames('dnb-list__item__title', className)}
      {...rest}
    >
      <span className="dnb-t__size--basis">{children}</span>
    </FlexItem>
  )
}
ItemTitle._supportsSpacingProps = true

export default ItemTitle
