import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import ItemOverline from './ItemOverline'
import ItemSubline from './ItemSubline'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

/**
 * Props for List.Cell.Title (ItemTitle).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemTitleProps = FlexItemProps & {
  /** Font size of the title content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemTitleBase({
  className,
  fontSize = 'basis',
  skeleton,
  children,
  ...rest
}: ItemTitleProps) {
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <FlexItem
      innerSpace={{ left: 'small' }}
      className={classnames(
        'dnb-list__item__title',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      {...rest}
    >
      <span className={`dnb-t__size--${fontSize}`}>{children}</span>
    </FlexItem>
  )
}
ItemTitleBase._supportsSpacingProps = true

type ItemTitleComponent = typeof ItemTitleBase & {
  Overline: typeof ItemOverline
  Subline: typeof ItemSubline
}

const ItemTitle = ItemTitleBase as ItemTitleComponent
ItemTitle.Overline = ItemOverline
ItemTitle.Subline = ItemSubline

export default ItemTitle
