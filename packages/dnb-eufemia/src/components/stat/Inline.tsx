import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import type { Props as FlexHorizontalProps } from '../flex/Horizontal'
import type { SkeletonShow } from '../skeleton/Skeleton'
import { warn } from '../../shared/component-helper'
import StatRootContext from './StatRootContext'
import useStatSkeleton from './useStatSkeleton'
import Provider from '../../shared/Provider'

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
  const { inRoot } = React.useContext(StatRootContext)
  const { hasSkeleton, skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  if (!inRoot) {
    warn('Stat.Inline should be used inside Stat.Root')
  }

  const attributes: Record<string, unknown> = {}
  applySkeletonAttributes(attributes as React.HTMLProps<HTMLElement>)

  return (
    <StatRootContext.Provider value={{ inRoot, skeleton: hasSkeleton }}>
      <Provider skeleton={hasSkeleton}>
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
      </Provider>
    </StatRootContext.Provider>
  )
}

Inline._supportsSpacingProps = true

export default Inline
