import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import type { Props as FlexHorizontalProps } from '../flex/Horizontal'
import type { SkeletonShow } from '../skeleton/Skeleton'
import useStatSkeleton from './useStatSkeleton'

export type InlineProps = FlexHorizontalProps & {
  skeleton?: SkeletonShow
}

function Inline({
  children,
  className = null,
  gap = 'x-small',
  align = 'center',
  skeleton = null,
  ...rest
}: InlineProps) {
  const { skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  const attributes: Record<string, unknown> = {}
  applySkeletonAttributes(attributes as React.HTMLProps<HTMLElement>)

  return (
    <Flex.Horizontal
      {...rest}
      {...attributes}
      gap={gap}
      align={align}
      className={classnames(
        'dnb-stat',
        'dnb-stat__inline',
        skeletonClass,
        className
      )}
    >
      {children}
    </Flex.Horizontal>
  )
}

Inline._supportsSpacingProps = true

export default Inline
