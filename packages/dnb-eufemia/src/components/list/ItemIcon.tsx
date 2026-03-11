import React from 'react'
import clsx from 'clsx'
import FlexItem from '../flex/Item'
import Icon, { type IconIcon } from '../icon/Icon'
import { ItemContentProps } from './ItemContent'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

function ItemIcon({
  children,
  className,
  ...rest
}: Omit<ItemContentProps, 'children'> & {
  children: IconIcon
}) {
  return (
    <FlexItem
      className={clsx('dnb-list__item__icon', className)}
      innerSpace={{ left: 'small' }}
      {...rest}
    >
      <Icon size="medium">{children}</Icon>
    </FlexItem>
  )
}
withComponentMarkers(ItemIcon, {
  _supportsSpacingProps: true,
})

export default ItemIcon
