import { Children, type ReactNode } from 'react'
import type { ItemContentProps } from './ItemContent'
import ItemContent from './ItemContent'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemBasicProps = {
  id?: string
  icon?: IconIcon
  title?: ReactNode
} & Omit<ItemContentProps, 'title'>

function ItemBasic(props: ItemBasicProps) {
  const { icon, title, children, element, ...rest } = props
  const childArray = title === undefined ? Children.toArray(children) : []
  const hasPlainText =
    title === undefined &&
    childArray.length > 0 &&
    childArray.every(
      (child) => typeof child === 'string' || typeof child === 'number'
    ) &&
    childArray.join('') !== ''
  const appliedTitle = hasPlainText ? children : title

  // The auto-rendered icon and title must be valid inside the row element.
  // When the row is a phrasing element (`element="span"`, e.g. for a Dropdown
  // or Autocomplete option) they must be phrasing content too, or they would
  // render a `<div>` inside a `<span>` — the exact invalid nesting the
  // `element` prop exists to avoid. Follow the row element in that case.
  const cellElement = element === 'span' ? 'span' : undefined

  return (
    <ItemContent element={element} {...rest}>
      {icon && <ItemIcon element={cellElement}>{icon}</ItemIcon>}
      {appliedTitle !== undefined && (
        <ItemTitle element={cellElement}>{appliedTitle}</ItemTitle>
      )}
      {!hasPlainText && children}
    </ItemContent>
  )
}
withComponentMarkers(ItemBasic, {
  _supportsSpacingProps: true,
})

export default ItemBasic
