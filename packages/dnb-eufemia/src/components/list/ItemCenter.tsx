import { useContext } from 'react'
import { clsx } from 'clsx'
import type { FlexItemAllProps as FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'

export type ItemCenterProps = FlexItemProps & {
  /**
   * Font size of the center content. Defaults to `basis`. Use `small` for smaller text.
   * Default: `"basis"`
   */
  fontSize?: 'small' | 'basis'
  /**
   * Font weight of the center content. Defaults to `regular`.
   * Default: `"regular"`
   */
  fontWeight?: 'regular' | 'medium'
  /**
   * When `true`, applies skeleton font styling to all child items inside the scroll view. Propagated via context so nested `List.Container` and items inherit it.
   */
  skeleton?: SkeletonShow
}

function ItemCenter({
  className,
  fontSize = 'basis',
  fontWeight = 'regular',
  skeleton,
  children,
  ...rest
}: ItemCenterProps) {
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      className={clsx(
        'dnb-list__item__center',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      innerSpace={{ left: 'small' }}
      {...rest}
    >
      {children}
    </FlexItem>
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

ItemCenter._supportsSpacingProps = true

export default ItemCenter
