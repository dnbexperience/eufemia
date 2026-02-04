import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import Hr from '../../elements/Hr'
import { ItemContentProps } from './ItemContent'

function ItemFooter({ className, children, ...rest }: ItemContentProps) {
  return (
    <>
      <Hr
        top={false}
        bottom={false}
        className="dnb-list__item__footer"
      />
      <FlexItem
        className={classnames('dnb-list__item__footer', className)}
        {...rest}
      >
        {children}
      </FlexItem>
    </>
  )
}
ItemFooter._supportsSpacingProps = true

export default ItemFooter
