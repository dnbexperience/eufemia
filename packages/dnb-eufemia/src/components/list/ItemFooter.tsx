import React, { useContext } from 'react'
import clsx from 'clsx'
import FlexItem, { type FlexItemProps } from '../flex/Item'
import Hr from '../../elements/Hr'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <>
      <Hr
        top={false}
        bottom={false}
        className="dnb-list__item__footer-separator"
      />
      <FlexItem
        className={clsx(
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

  if (appliedSkeleton) {
    return (
      <Context.Provider value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context.Provider>
    )
  }

  return content
}
withComponentMarkers(ItemFooter, {
  _supportsSpacingProps: true,
})

export default ItemFooter
