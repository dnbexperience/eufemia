import { useContext } from 'react'
import { clsx } from 'clsx'
import type { ListSize, ListVariant } from './ListContext'
import { ListContext } from './ListContext'
import type { FlexContainerAllProps as FlexProps } from '../flex/Container'
import FlexContainer from '../flex/Container'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import type { DynamicElement } from '../../shared/types'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemContentProps = {
  id?: string
  variant?: ListVariant
  /**
   * Use `small` for compact rows with less vertical padding and smaller corners. Text size stays unchanged, and rows grow to fit their content. Nested containers default to the regular size. Individual items can override their container size.
   */
  size?: ListSize
  selected?: boolean
  pending?: boolean
  disabled?: boolean
  skeleton?: SkeletonShow
  /**
   * Define the HTML element used for the row. Defaults to `li` for correct list semantics. Use an element that is valid inside the surrounding markup when the row is rendered inside markup that already provides the list item. For example, use `span` for a `Dropdown` or `Autocomplete` option.
   * Default: `'li'`
   */
  element?: DynamicElement
} & Omit<FlexProps, 'element'>

function ItemContent(props: ItemContentProps) {
  const {
    className,
    children,
    variant,
    size,
    selected,
    pending,
    disabled,
    skeleton,
    element = 'li',
    ...rest
  } = props
  const context = useContext(Context)
  const inheritedSize = useContext(ListContext)?.size
  const appliedSize = size ?? inheritedSize
  const inheritedVariant = useContext(ListContext)?.variant
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const inheritedDisabled = useContext(ListContext)?.disabled
  const appliedVariant = variant ?? inheritedVariant
  const appliedSkeleton = skeleton ?? inheritedSkeleton
  const appliedDisabled = disabled ?? inheritedDisabled

  const content = (
    <FlexContainer
      element={element}
      direction="horizontal"
      justify="space-between"
      wrap={false}
      gap={false}
      className={clsx(
        'dnb-list__item',
        'dnb-t__size--basis',
        appliedVariant && `dnb-list--variant-${appliedVariant}`,
        appliedSize && `dnb-list--size-${appliedSize}`,
        selected !== undefined && 'dnb-list__item--selection',
        selected && 'dnb-list__item--selected',
        pending && 'dnb-list__item--pending',
        appliedDisabled && 'dnb-list__item--disabled',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      {...rest}
    >
      {children}
      {pending && <Pending />}
    </FlexContainer>
  )

  if (appliedSkeleton) {
    return (
      <Context value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context>
    )
  }

  return content
}
withComponentMarkers(ItemContent, {
  _supportsSpacingProps: true,
})

export default ItemContent

function Pending() {
  return <div className="dnb-list__item__pending" />
}
// To ensure it gets not wrapped by Flex, we pretend it supports spacing props
withComponentMarkers(Pending, {
  _supportsSpacingProps: true,
})
