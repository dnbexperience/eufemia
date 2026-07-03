import { useContext } from 'react'
import type { AllHTMLAttributes, ReactElement, Ref } from 'react'
import { clsx } from 'clsx'

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
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * List of [timeline items](/uilib/components/timeline/properties#timelineitem-properties) to render. Each object in data can include all properties from [Timeline.Item properties](/uilib/components/timeline/properties#timelineitem-properties).
   */
  data?: TimelineItemProps[]

  /**
   * Content of the component. Can be used instead of property `data`, by adding [Timeline Item](/uilib/components/timeline/properties#timelineitem-properties) as children `<Timeline.Item {...properties} />`.
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

const timelineDefaultProps: Partial<TimelineAllProps> = {
  skeleton: false,
}

const Timeline = (localProps: TimelineAllProps) => {
  // Every component should have a context
  const context = useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    timelineDefaultProps,
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
