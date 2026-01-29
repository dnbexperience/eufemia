import React, { useContext } from 'react'
import classnames from 'classnames'
import { ListVariant, ListContext } from './ListContext'
import FlexContainer, { Props as FlexProps } from '../flex/Container'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

export type ItemContentProps = {
  variant?: ListVariant
  selected?: boolean
  pending?: boolean
  skeleton?: SkeletonShow
} & React.HTMLAttributes<HTMLDivElement> &
  FlexProps

function ItemContent(props: ItemContentProps) {
  const {
    className,
    children,
    variant,
    selected,
    pending,
    skeleton,
    ...rest
  } = props
  const inheritedVariant = useContext(ListContext)?.variant
  const appliedVariant = variant ?? inheritedVariant

  return (
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
        selected && 'dnb-list__item--selected',
        pending && 'dnb-list__item--pending',
        skeleton && createSkeletonClass('font', true),
        className
      )}
      {...rest}
    >
      {children}
      {pending && <Pending />}
    </FlexContainer>
  )
}
ItemContent._supportsSpacingProps = true

export default ItemContent

function Pending() {
  return <div className="dnb-list__item__pending" />
}
// To ensure it gets not wrapped by Flex, we pretend it supports spacing props
Pending._supportsSpacingProps = true
