import React from 'react'
import clsx from 'clsx'
import Flex from '../flex/Flex'
import type { HorizontalProps as FlexHorizontalProps } from '../flex/Horizontal'
import type { SkeletonShow } from '../skeleton/Skeleton'
import { warn } from '../../shared/component-helper'
import StatRootContext from './StatRootContext'
import useStatSkeleton from './useStatSkeleton'
import Provider from '../../shared/Provider'

export type InlineProps = FlexHorizontalProps & {
  id?: string
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
  const { inRoot } = React.useContext(StatRootContext)
  const { hasSkeleton, skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  if (!inRoot) {
    warn('Stat.Inline should be used inside Stat.Root')
  }

  const attributes: Record<string, unknown> = {}
  applySkeletonAttributes(attributes)

  return (
    <StatRootContext value={{ inRoot, skeleton: hasSkeleton }}>
      <Provider skeleton={hasSkeleton}>
        <Flex.Horizontal
          {...rest}
          {...attributes}
          gap={gap}
          align={align}
          className={clsx(
            'dnb-stat',
            'dnb-stat__inline',
            skeletonClass,
            className
          )}
        >
          {children}
        </Flex.Horizontal>
      </Provider>
    </StatRootContext>
  )
}

Inline._supportsSpacingProps = true

export default Inline
