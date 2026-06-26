import { useContext } from 'react'
import { clsx } from 'clsx'
import type { FlexItemAllProps as FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import Hr from '../../elements/Hr'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'

export type ItemFooterProps = FlexItemProps & {
  /**
   * When `true`, applies skeleton font styling to all child items inside the scroll view. Propagated via context so nested `List.Container` and items inherit it.
   */
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
      <Context value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context>
    )
  }

  return content
}
ItemFooter._supportsSpacingProps = true

export default ItemFooter
