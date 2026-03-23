import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import Icon, { type IconIcon } from '../icon/Icon'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'

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
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      className={classnames(
        'dnb-list__item__icon',
        appliedSkeleton && createSkeletonClass('shape', true),
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    >
      <Icon size="medium">{children}</Icon>
    </FlexItem>
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
ItemIcon._supportsSpacingProps = true

export default ItemIcon
