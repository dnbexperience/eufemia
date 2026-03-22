import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import Hr from '../../elements/Hr'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

export type ItemFooterProps = FlexItemProps & {
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemFooter({
  className,
  skeleton,
  children,
  ...rest
}: ItemFooterProps) {
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <>
      <Hr top={false} bottom={false} className="dnb-list__item__footer" />
      <FlexItem
        className={classnames(
          'dnb-list__item__footer',
          appliedSkeleton && createSkeletonClass('font', true),
          className
        )}
        {...rest}
      >
        {children}
      </FlexItem>
    </>
  )
}
ItemFooter._supportsSpacingProps = true

export default ItemFooter
