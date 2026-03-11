import React, { useContext } from 'react'
import clsx from 'clsx'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import ItemOverline from './ItemOverline'
import ItemSubline from './ItemSubline'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

/**
 * Props for List.Cell.Title (ItemTitle).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemTitleProps = FlexItemProps & {
  /** Font size of the title content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
  /** Font weight of the title content. Defaults to `regular`. */
  fontWeight?: 'regular' | 'medium'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
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
      <Context.Provider value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context.Provider>
    )
  }

  return content
}

type ItemTitleComponent = typeof ItemTitleBase & {
  Overline: typeof ItemOverline
  Subline: typeof ItemSubline
}

const ItemTitle = ItemTitleBase as ItemTitleComponent
ItemTitle.Overline = ItemOverline
ItemTitle.Subline = ItemSubline

withComponentMarkers(ItemTitle, {
  _supportsSpacingProps: true,
})

export default ItemTitle
