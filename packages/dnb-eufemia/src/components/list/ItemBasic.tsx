import React, { useContext } from 'react'
import { ListContext } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'

export type ItemBasicProps = {
  icon?: IconIcon
  title?: React.ReactNode
  subtitle?: React.ReactNode
} & Omit<ItemContentProps, 'title'>

function ItemBasic(props: ItemBasicProps) {
  const { icon, title, subtitle, children, variant, ...rest } = props
  const inheritedVariant = useContext(ListContext)?.variant
  const appliedVariant = variant ?? inheritedVariant

  return (
    <ItemContent variant={appliedVariant} {...rest}>
      {icon && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && (
        <ItemTitle subtitle={subtitle}>{title}</ItemTitle>
      )}
      {children}
    </ItemContent>
  )
}
ItemBasic._supportsSpacingProps = true

export default ItemBasic
