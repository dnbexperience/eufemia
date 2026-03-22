import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

/**
 * Props for List.Cell.Title.Overline (ItemOverline).
 * Secondary line above the main row; pairs with List.Cell.Title.Subline (below title).
 */
export type ItemOverlineProps = FlexItemProps & {
  /** Font size of the overline content. Defaults to `x-small`. */
  fontSize?: 'basis' | 'small' | 'x-small'
  /** Font weight of the overline content. Defaults to `medium`. */
  fontWeight?: 'regular' | 'medium'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemOverline({
  className,
  fontSize = 'x-small',
  fontWeight = 'medium',
  skeleton,
  children,
  ...rest
}: ItemOverlineProps) {
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__overline',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      {...rest}
    >
      {children}
    </FlexItem>
  )
}
ItemOverline._supportsSpacingProps = true

export default ItemOverline
