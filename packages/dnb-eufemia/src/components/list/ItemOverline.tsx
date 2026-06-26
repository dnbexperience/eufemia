import { useContext } from 'react'
import { clsx } from 'clsx'
import type { FlexItemAllProps as FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'

/**
 * Props for List.Cell.Title.Overline (ItemOverline).
 * Secondary line above the main row; pairs with List.Cell.Title.Subline (below title).
 */
export type ItemOverlineProps = FlexItemProps & {
  /**
   * Font size of the overline content. Defaults to `x-small`.
   * Default: `"x-small"`
   */
  fontSize?: 'basis' | 'small' | 'x-small'
  /**
   * Font weight of the overline content. Defaults to `medium`.
   * Default: `"medium"`
   */
  fontWeight?: 'regular' | 'medium'
  /**
   * When `true`, applies skeleton font styling to all child items inside the scroll view. Propagated via context so nested `List.Container` and items inherit it.
   */
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
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      className={clsx(
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

  if (appliedSkeleton) {
    return (
      <Context value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context>
    )
  }

  return content
}
ItemOverline._supportsSpacingProps = true

export default ItemOverline
