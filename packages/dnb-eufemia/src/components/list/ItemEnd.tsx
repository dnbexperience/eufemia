import React, { useContext } from 'react'
import classnames from 'classnames'
import FlexItem, { type Props as FlexItemProps } from '../flex/Item'
import { ListContext } from './ListContext'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../Skeleton'

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
} & FlexItemProps

function ItemEnd(props: ItemEndProps) {
  const {
    fontWeight = 'medium',
    fontSize = 'basis',
    skeleton,
    className,
    ...rest
  } = props
  const inheritedSkeleton = useContext(ListContext)?.skeleton
  const appliedSkeleton = skeleton ?? inheritedSkeleton

  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__end',
        fontSize && `dnb-t__size--${fontSize}`,
        fontWeight === 'medium' && 'dnb-t__weight--medium',
        appliedSkeleton && createSkeletonClass('font', true),
        className
      )}
      innerSpace={{ left: 'small', right: 'medium' }}
      {...rest}
    />
  )
}
ItemEnd._supportsSpacingProps = true

export default ItemEnd
