import { useContext } from 'react'
import type { ElementType, HTMLProps } from 'react'
import clsx from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatRootContext from './StatRootContext'
import useStatSkeleton from './useStatSkeleton'
import Provider from '../../shared/Provider'

type ContentOwnProps = {
  element?: ElementType
  direction?: 'horizontal' | 'vertical'
  skeleton?: SkeletonShow
}

export type ContentProps = Omit<
  HTMLProps<HTMLElement>,
  keyof ContentOwnProps | 'ref'
> &
  ContentOwnProps &
  SpacingProps

function Content(props: ContentProps) {
  const { inRoot } = useContext(StatRootContext)

  const {
    children,
    className = null,
    style = null,
    element: elementProp,
    direction = 'horizontal',
    skeleton = null,
    ...rest
  } = props

  const Element = elementProp ?? (inRoot ? 'dd' : 'span')

  const { hasSkeleton, skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  if (!inRoot) {
    warn('Stat.Content should be used inside Stat.Root')
  }

  const attributes = validateDOMAttributes(
    props,
    useSpacing(props, {
      ...rest,
      style,
      className: clsx(
        'dnb-stat',
        'dnb-stat__content-item',
        `dnb-stat__content-item--${direction}`,
        skeletonClass,
        className
      ),
    })
  )

  applySkeletonAttributes(attributes)

  return (
    <StatRootContext value={{ inRoot, skeleton: hasSkeleton }}>
      <Provider skeleton={hasSkeleton}>
        <Element {...attributes}>{children}</Element>
      </Provider>
    </StatRootContext>
  )
}

Content._supportsSpacingProps = true
Content._statRole = 'content'

export default Content
