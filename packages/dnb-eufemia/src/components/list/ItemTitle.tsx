import { useContext } from 'react'
import { clsx } from 'clsx'
import type { FlexItemAllProps as FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import ItemOverline from './ItemOverline'
import ItemSubline from './ItemSubline'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import type { DynamicElement } from '../../shared/types'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

/**
 * Props for List.Cell.Title (ItemTitle).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemTitleProps = FlexItemProps & {
  /**
   * Font size of the title content. Defaults to `basis`. Use `small` for smaller text.
   * Default: `"basis"`
   */
  fontSize?: 'small' | 'basis'
  /**
   * Font weight of the start content. Defaults to `regular`.
   * Default: `"regular"`
   */
  fontWeight?: 'regular' | 'medium'
  /**
   * When `true`, applies skeleton font styling to all child items inside the scroll view. Propagated via context so nested `List.Container` and items inherit it.
   */
  skeleton?: SkeletonShow
  /**
   * Define the HTML element used for the cell. Defaults to `div`. When the row is rendered outside a `List.Container` inside phrasing markup (for example a `Dropdown` or `Autocomplete` option, where the row is a `span`), set this to `span` so the cell stays valid phrasing content.
   * Default: `'div'`
   */
  element?: DynamicElement
}

function ItemTitleBase({
  className,
  fontSize = 'basis',
  fontWeight,
  skeleton,
  children,
  ...rest
}: ItemTitleProps) {
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      innerSpace={{ left: 'small' }}
      className={clsx(
        'dnb-list__item__title',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      {...rest}
    >
      <span
        className={clsx(
          `dnb-t__size--${fontSize}`,
          fontWeight === 'medium' && 'dnb-t__weight--medium'
        )}
      >
        {children}
      </span>
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
withComponentMarkers(ItemTitleBase, {
  _supportsSpacingProps: true,
})

type ItemTitleComponent = typeof ItemTitleBase & {
  Overline: typeof ItemOverline
  Subline: typeof ItemSubline
}

const ItemTitle = ItemTitleBase as ItemTitleComponent
ItemTitle.Overline = ItemOverline
ItemTitle.Subline = ItemSubline

export default ItemTitle
