import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import Hr from '../../elements/Hr'
import { ItemContentProps } from './ItemContent'

function ItemAddition({ className, children, ...rest }: ItemContentProps) {
  return (
    <>
      <Hr
        top={false}
        bottom={false}
        className="dnb-list__item__addition"
      />
      <FlexItem
        className={classnames('dnb-list__item__addition', className)}
        {...rest}
      >
        {children}
      </FlexItem>
    </>
  )
}
ItemAddition._supportsSpacingProps = true

export default ItemAddition
