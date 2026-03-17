import React, { useContext } from 'react'
import { ListContext } from './ListContext'
import type { ItemContentProps } from './ItemContent'
import ItemContent from './ItemContent'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemBasicProps = {
  icon?: IconIcon
  title?: React.ReactNode
} & Omit<ItemContentProps, 'title'>

function ItemBasic(props: ItemBasicProps) {
  const { icon, title, children, variant, ...rest } = props
  const inheritedVariant = useContext(ListContext)?.variant
  const appliedVariant = variant ?? inheritedVariant

  return (
    <ItemContent variant={appliedVariant} {...rest}>
      {icon && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && <ItemTitle>{title}</ItemTitle>}
      {children}
    </ItemContent>
  )
}
withComponentMarkers(ItemBasic, {
  _supportsSpacingProps: true,
})

export default ItemBasic
