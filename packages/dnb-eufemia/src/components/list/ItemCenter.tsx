import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

export type ItemCenterProps = FlexItemProps & {
  /** Font size of the center content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
  /** Font weight of the center content. Defaults to `regular`. */
  fontWeight?: 'regular' | 'medium'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemCenter({
  className,
  fontSize = 'basis',
  fontWeight = 'regular',
  skeleton,
  ...rest
}: ItemCenterProps) {
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__center',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    />
  )
}

ItemCenter._supportsSpacingProps = true

export default ItemCenter
