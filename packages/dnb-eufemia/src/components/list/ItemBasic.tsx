import type { ReactNode } from 'react'
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
  /**
   * Select the internal Flex layout engine of the row. Defaults to `css`, which leaves the children unchanged, so cells rendered by your own components are placed like cells used directly. When `gap`, `rowGap` or `divider` is set, it defaults to `legacy`, so the row keeps the spacing it had before. Use `legacy` only as a temporary compatibility fallback.
   * Default: `'css'`
   */
  layoutEngine?: ItemContentProps['layoutEngine']
} & Omit<ItemContentProps, 'title' | 'layoutEngine'>

function isSetGap(
  props: Omit<ItemBasicProps, 'icon' | 'title' | 'children'>,
  key: 'gap' | 'rowGap'
) {
  return (
    Object.prototype.hasOwnProperty.call(props, key) &&
    props[key] !== false
  )
}

function ItemBasic(props: ItemBasicProps) {
  const { icon, title, children, element, layoutEngine, ...rest } = props

  // The css engine leaves the children unchanged, so cells rendered by your
  // own components are placed like cells used directly. But it turns these
  // Flex props into CSS gaps on the row grid, where every empty grid column
  // adds space. The legacy engine only adds space between the cells, so use
  // it when one of these props is set. An explicit layoutEngine still wins.
  // A forwarded `gap={undefined}` or `rowGap={undefined}` counts as set: it
  // replaces the `false` that ItemContent passes, so Flex uses its default
  // small gap.
  const usesLegacySpacing =
    isSetGap(rest, 'gap') ||
    isSetGap(rest, 'rowGap') ||
    Boolean(rest.divider && rest.divider !== 'space')
  const appliedLayoutEngine =
    layoutEngine ?? (usesLegacySpacing ? 'legacy' : 'css')

  // The auto-rendered icon and title must be valid inside the row element.
  // When the row is a phrasing element (`element="span"`, e.g. for a Dropdown
  // or Autocomplete option) they must be phrasing content too, or they would
  // render a `<div>` inside a `<span>` — the exact invalid nesting the
  // `element` prop exists to avoid. Follow the row element in that case.
  const cellElement = element === 'span' ? 'span' : undefined

  return (
    <ItemContent
      element={element}
      layoutEngine={appliedLayoutEngine}
      rowGap={appliedLayoutEngine === 'css' ? false : undefined}
      {...rest}
    >
      {icon && <ItemIcon element={cellElement}>{icon}</ItemIcon>}
      {title !== undefined && (
        <ItemTitle element={cellElement}>{title}</ItemTitle>
      )}
      {children}
    </ItemContent>
  )
}
withComponentMarkers(ItemBasic, {
  _supportsSpacingProps: true,
})

export default ItemBasic
