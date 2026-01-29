import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import Icon, { type IconIcon } from '../icon/Icon'
import { ItemContentProps } from './ItemContent'

function ItemIcon({
  children,
  className,
  ...rest
}: Omit<ItemContentProps, 'children'> & {
  children: IconIcon
}) {
  return (
    <FlexItem
      className={classnames('dnb-list__item__icon', className)}
      innerSpace={{ left: 'small' }}
      {...rest}
    >
      <Icon size="medium">{children}</Icon>
    </FlexItem>
  )
}
ItemIcon._supportsSpacingProps = true

export default ItemIcon
