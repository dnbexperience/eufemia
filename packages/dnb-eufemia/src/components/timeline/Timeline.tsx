import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'

// Shared
import Context from '../../shared/Context'
import { SpacingProps } from '../../shared/types'
import { SkeletonShow } from '../skeleton/Skeleton'

// Internal
import TimelineItem, { TimelineItemProps } from './TimelineItem'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'

export type TimelineProps = {
  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

  /**
   * Pass in a list of your events as objects of timelineitem, to render them as timelineitems.
   * Default: null
   */
  data?: TimelineItemProps[]

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?:
    | React.ReactElement<TimelineItemProps>[]
    | React.ReactElement<TimelineItemProps>
}

export type TimelineAllProps = TimelineProps &
  Omit<React.AllHTMLAttributes<HTMLOListElement>, 'type' | 'data'> &
  SpacingProps

export const defaultProps = {
  className: null,
  skeleton: false,
  data: null,
  children: null,
}

const Timeline = (localProps: TimelineAllProps) => {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.Timeline,
    {
      skeleton: context?.skeleton,
    }
  )
  const {
    className,
    skeleton,
    data,
    children: childrenProp,
    ...props
  } = allProps

  const spacingClasses = createSpacingClasses(props)

  let children = childrenProp

  if (Array.isArray(childrenProp)) {
    children = childrenProp.map((child, i) => {
      return React.cloneElement(child, {
        skeleton: skeleton,
        key: i,
      })
    })
  }

  validateDOMAttributes(allProps, props)

  return (
    <ol
      className={classnames(
        'dnb-timeline',
        'dnb-space__reset',
        spacingClasses,
        className
      )}
      data-testid="timeline"
      {...props}
    >
      {data?.map((timelineItem, i) => (
        <TimelineItem key={i} skeleton={skeleton} {...timelineItem} />
      ))}

      {children}
    </ol>
  )
}

Timeline.Item = TimelineItem

export { TimelineItem }

export default Timeline
