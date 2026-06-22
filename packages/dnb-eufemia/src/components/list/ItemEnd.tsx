import { useContext } from 'react'
import { clsx } from 'clsx'
import type { FlexItemAllProps as FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'

/**
 * Props for List.Cell.End (ItemEnd).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemEndProps = {
  /**
   * Font weight of the end content. Defaults to `medium`.
   * Default: `"medium"`
   */
  fontWeight?: 'regular' | 'medium'
  /**
   * Font size of the end content. Defaults to `basis`. Use `small` for smaller text.
   * Default: `"basis"`
   */
  fontSize?: 'small' | 'basis'
  /**
   * When `true`, applies skeleton font styling to all child items inside the scroll view. Propagated via context so nested `List.Container` and items inherit it.
   */
  skeleton?: SkeletonShow
} & FlexItemProps

function ItemEnd(props: ItemEndProps) {
  const {
    fontWeight = 'medium',
    fontSize = 'basis',
    skeleton,
    className,
    children,
    ...rest
  } = props
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      className={clsx(
        'dnb-list__item__end',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      innerSpace={{ left: 'small', right: 'medium' }}
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
ItemEnd._supportsSpacingProps = true

export default ItemEnd
