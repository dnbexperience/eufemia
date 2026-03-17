import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import Hr from '../../elements/Hr'
import type { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

function ItemFooter({ className, children, ...rest }: ItemContentProps) {
  return (
    <>
      <Hr top={false} bottom={false} className="dnb-list__item__footer" />
      <FlexItem
        className={clsx('dnb-list__item__footer', className)}
        {...rest}
      >
        {children}
      </FlexItem>
    </>
  )
}
withComponentMarkers(ItemFooter, {
  _supportsSpacingProps: true,
})

export default ItemFooter
