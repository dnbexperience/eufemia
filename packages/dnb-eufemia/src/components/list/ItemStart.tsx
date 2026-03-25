import React, { useContext } from 'react'
import clsx from 'clsx'
import type { FlexItemAllProps } from '../flex/Item'
import FlexItem from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

/**
 * Props for List.Cell.Start (ItemStart).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemStartProps = FlexItemAllProps & {
  /** Font size of the start content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
  /** Font weight of the start content. Defaults to `regular`. */
  fontWeight?: 'regular' | 'medium'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
}

function ItemStart({
  className,
  fontSize = 'basis',
  fontWeight = 'regular',
  skeleton,
  children,
  ...rest
}: ItemStartProps) {
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  const content = (
    <FlexItem
      className={clsx(
        'dnb-list__item__start',
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
      <Context.Provider value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context.Provider>
    )
  }

  return content
}
withComponentMarkers(ItemStart, {
  _supportsSpacingProps: true,
})

export default ItemStart
