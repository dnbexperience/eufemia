import React from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import Icon, { type IconIcon } from '../icon/Icon'

export type ItemIconProps = Omit<FlexItemProps, 'children'> & {
  children: IconIcon
}

function ItemIcon({ children, className, ...rest }: ItemIconProps) {
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
