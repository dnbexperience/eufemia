import React from 'react'
import ItemContent, { ItemContentProps } from './ItemContent'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'

export type ItemBasicProps = {
  icon?: IconIcon
  title?: React.ReactNode
} & Omit<ItemContentProps, 'title'>

function ItemBasic(props: ItemBasicProps) {
  const { icon, title, children, ...rest } = props

  return (
    <ItemContent {...rest}>
      {icon && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && <ItemTitle>{title}</ItemTitle>}
      {children}
    </ItemContent>
  )
}
ItemBasic._supportsSpacingProps = true

export default ItemBasic
