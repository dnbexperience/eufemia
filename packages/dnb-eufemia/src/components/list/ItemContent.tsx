import { useContext } from 'react'
import { clsx } from 'clsx'
import type { ListVariant } from './ListContext'
import { ListContext } from './ListContext'
import type { FlexContainerAllProps as FlexProps } from '../flex/Container'
import FlexContainer from '../flex/Container'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import type { DynamicElement } from '../../shared/types'
import Context from '../../shared/Context'

export type ItemContentProps = {
  id?: string
  variant?: ListVariant
  selected?: boolean
  pending?: boolean
  disabled?: boolean
  skeleton?: SkeletonShow
  /**
   * Define the HTML element used for the row. Defaults to `li` for correct list semantics. Use an element that is valid inside the surrounding markup when the row is rendered inside markup that already provides the list item. For example, use `span` for a `Dropdown` or `Autocomplete` option.
   * Default: `'li'`
   */
  element?: DynamicElement
} & FlexProps

function ItemContent(props: ItemContentProps) {
  const {
    className,
    children,
    variant,
    selected,
    pending,
    disabled,
    skeleton,
    element = 'li',
    ...rest
  } = props
  const context = useContext(Context)
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
ItemContent._supportsSpacingProps = true

export default ItemContent

function Pending() {
  return <div className="dnb-list__item__pending" />
}
// To ensure it gets not wrapped by Flex, we pretend it supports spacing props
Pending._supportsSpacingProps = true
