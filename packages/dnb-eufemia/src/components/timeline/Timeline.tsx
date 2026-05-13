import { useContext } from 'react'
import type { AllHTMLAttributes, ReactElement, Ref } from 'react'
import clsx from 'clsx'

// Components
import { useSpacing } from '../space/SpacingUtils'

// Shared
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'

// Internal
import type { TimelineItemProps } from './TimelineItem'
import TimelineItem from './TimelineItem'
import TimelineContext from './TimelineContext'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type TimelineProps = {
  /**
   * Skeleton should be applied when loading content
   * Default: `null`
   */
  skeleton?: SkeletonShow

  /**
   * Pass in a list of your events as objects of TimelineItem, to render them as TimelineItems.
   * Default: `null`
   */
  data?: TimelineItemProps[]

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: `null`
   */
  children?:
    | ReactElement<TimelineItemProps>[]
    | ReactElement<TimelineItemProps>
}

export type TimelineAllProps = TimelineProps &
  Omit<AllHTMLAttributes<HTMLOListElement>, 'type' | 'data'> &
  SpacingProps & {
    ref?: Ref<HTMLOListElement>
  }

const defaultProps: Partial<TimelineAllProps> = {
  skeleton: false,
}

const Timeline = (localProps: TimelineAllProps) => {
  // Every component should have a context
  const context = useContext(Context)

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

  validateDOMAttributes(allProps, props)

  const olProps = useSpacing(allProps, {
    ...props,
    className: clsx('dnb-timeline', 'dnb-space__reset', className),
  })

  return (
    <TimelineContext value={{ skeleton }}>
      <ol {...olProps}>
        {data?.map((timelineItem, i) => (
          <TimelineItem key={i} skeleton={skeleton} {...timelineItem} />
        ))}

        {childrenProp}
      </ol>
    </TimelineContext>
  )
}

Timeline.Item = TimelineItem

export { TimelineItem }

withComponentMarkers(Timeline, {
  _supportsSpacingProps: true,
})

export default Timeline
