import { useContext } from 'react'
import { clsx } from 'clsx'
import type { FlexItemAllProps as FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import type { DynamicElement } from '../../shared/types'
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
  /**
   * Define the HTML element used for the cell. Defaults to `div`. When the row is rendered outside a `List.Container` inside phrasing markup (for example a `Dropdown` or `Autocomplete` option, where the row is a `span`), set this to `span` so the cell stays valid phrasing content.
   * Default: `'div'`
   */
  element?: DynamicElement
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
