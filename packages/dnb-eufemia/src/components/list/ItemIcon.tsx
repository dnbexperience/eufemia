import React from 'react'
import FlexItem from '../flex/Item'
import Icon, { type IconIcon } from '../icon/Icon'
import { ItemContentProps } from './ItemContent'

function ItemIcon({
  children,
  ...rest
}: Omit<ItemContentProps, 'children'> & {
  children: IconIcon
}) {
  return (
    <FlexItem innerSpace={{ left: 'small' }} {...rest}>
      <Icon size="medium">{children}</Icon>
    </FlexItem>
  )
}
ItemIcon._supportsSpacingProps = true

export default ItemIcon
