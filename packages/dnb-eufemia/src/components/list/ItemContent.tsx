import React, { useContext } from 'react'
import classnames from 'classnames'
import { ListVariant, ListContext } from './ListContext'
import FlexContainer, { Props as FlexProps } from '../flex/Container'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'

export type ItemContentProps = {
  variant?: ListVariant
  selected?: boolean
  pending?: boolean
  disabled?: boolean
  skeleton?: SkeletonShow
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
      element="li"
      direction="horizontal"
      justify="space-between"
      wrap={false}
      gap={false}
      className={classnames(
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
      <Context.Provider value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context.Provider>
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
