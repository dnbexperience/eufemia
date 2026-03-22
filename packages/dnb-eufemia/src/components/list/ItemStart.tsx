import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

/**
 * Props for List.Cell.Start (ItemStart).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemStartProps = FlexItemProps & {
  /** Font size of the start content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemStart({
  className,
  fontSize = 'basis',
  skeleton,
  ...rest
}: ItemStartProps) {
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__start',
        fontSize && `dnb-t__size--${fontSize}`,
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    />
  )
}
ItemStart._supportsSpacingProps = true

export default ItemStart
