import React from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import Hr from '../../elements/Hr'

function ItemFooter({ className, children, ...rest }: FlexItemProps) {
  return (
    <>
      <Hr top={false} bottom={false} className="dnb-list__item__footer" />
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
