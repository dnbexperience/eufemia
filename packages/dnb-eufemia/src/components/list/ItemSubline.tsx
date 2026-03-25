import React, { useContext } from 'react'
import clsx from 'clsx'
import type { FlexItemProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemSublineVariant = 'description'

/**
 * Props for List.Cell.Title.Subline (ItemSubline).
 * Secondary line under the title; pairs with List.Cell.Title.Overline (above the row).
 */
export type ItemSublineProps = FlexItemProps & {
  /** Visual variant. Use `description` for smaller, muted text. */
  variant?: ItemSublineVariant
  /** Font size of the subline content. Defaults to `small`. When `variant="description"`, defaults to `x-small`. */
  fontSize?: 'basis' | 'small' | 'x-small'
  /** Font weight of the subline content. Defaults to `regular`. */
  fontWeight?: 'regular' | 'medium'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemSubline({
  className,
  variant,
  fontSize = 'small',
  fontWeight = 'regular',
  skeleton,
  children,
  ...rest
}: ItemSublineProps) {
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      className={clsx(
        'dnb-list__item__subline',
        variant && `dnb-list__item__subline--${variant}`,
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
      <Context.Provider value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context.Provider>
    )
  }

  return content
}
withComponentMarkers(ItemSubline, {
  _supportsSpacingProps: true,
})

export default ItemSubline
