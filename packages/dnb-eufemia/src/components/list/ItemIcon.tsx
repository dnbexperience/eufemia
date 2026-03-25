import React, { useContext } from 'react'
import clsx from 'clsx'
import FlexItem, { type FlexItemProps } from '../flex/Item'
import Icon, { type IconIcon } from '../icon/Icon'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemIconProps = Omit<FlexItemProps, 'children'> & {
  children: IconIcon
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemIcon({
  children,
  className,
  skeleton,
  ...rest
}: ItemIconProps) {
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <FlexItem
      className={clsx(
        'dnb-list__item__icon',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    >
      <Icon size="medium">{children}</Icon>
    </FlexItem>
  )
}
withComponentMarkers(ItemIcon, {
  _supportsSpacingProps: true,
})

export default ItemIcon
