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
 * Props for List.Cell.End (ItemEnd).
 * Extends Flex.Item; supports spacing props.
 */
export type ItemEndProps = {
  /** Font weight of the end content. Defaults to `medium`. */
  fontWeight?: 'regular' | 'medium'
  /** Font size of the end content. Defaults to `basis`. */
  fontSize?: 'small' | 'basis'
  /** If `true`, applies skeleton loading state. Inherits from parent List context when not set. */
  skeleton?: SkeletonShow
} & FlexItemAllProps

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
      <Context.Provider value={{ ...context, skeleton: appliedSkeleton }}>
        {content}
      </Context.Provider>
    )
  }

  return content
}
withComponentMarkers(ItemEnd, {
  _supportsSpacingProps: true,
})

export default ItemEnd
