import React from 'react'
import classnames from 'classnames'

// Components
import FormStatus from '../form-status/FormStatus'
import Icon, { IconPrimaryIcon } from '../icon-primary/IconPrimary'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Icons
import checkIcon from '../../icons/check'
import calendarIcon from '../../icons/calendar'
import pinIcon from '../../icons/pin'

// Shared
import Context from '../../shared/Context'
import { SkeletonShow } from '../skeleton/Skeleton'
import { usePropsWithContext } from '../../shared/hooks'

export interface TimelineItemProps {
  /**
   * Icon displaying on the left side.
   * Default: `check` for state `completed`, `pin` for state `current`, and `calendar` for state `upcoming` .
   */
  icon?: IconPrimaryIcon

  /**
   * Text displaying the title of the item's corresponding page.
   * Default: translations based on the icon.
   */
  iconAlt?: string

  /**
   * Text displaying the name of the timeline item.
   */
  name: React.ReactNode & string

  /**
   * Text displaying the date of the timeline item.
   */
  date?: React.ReactNode

  /**
   * Text displaying info message of the timeline item.
   */
  infoMessage?: React.ReactNode

  /**
   * The component state. State 'completed' or 'current' or 'upcoming'.
   * Default: null
   */
  state: 'completed' | 'current' | 'upcoming'

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow
}

const defaultProps = {
  icon: null,
  iconAlt: null,
  name: null,
  date: null,
  infoMessage: null,
  state: null,
  skeleton: false,
}

const TimelineItem = (localProps: TimelineItemProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  const {
    translation: {
      TimelineItem: {
        alt_label_completed,
        alt_label_current,
        alt_label_upcoming,
      },
    },
  } = context

  // Extract additional props from global context
  const {
    icon,
    iconAlt,
    name,
    date,
    infoMessage,
    state,
    skeleton,
    ...props
  } = usePropsWithContext(
    localProps,
    defaultProps,
    context?.TimelineItem,
    { skeleton: context?.skeleton }
  )

  const stateIsCompleted = state === 'completed'
  const stateIsCurrent = state === 'current'
  const stateIsUpcoming = state === 'upcoming'

  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const classes = classnames(
    'dnb-timeline__item',
    skeletonClasses,
    `dnb-timeline__item--${state}`
  )

  const TimelineItemIcon = () => {
    const currentIcon =
      icon ||
      (stateIsCompleted && checkIcon) ||
      (stateIsCurrent && pinIcon) ||
      (stateIsUpcoming && calendarIcon)

    const currentAltLabel =
      iconAlt ||
      (stateIsCompleted && alt_label_completed) ||
      (stateIsCurrent && alt_label_current) ||
      (stateIsUpcoming && alt_label_upcoming)
    return (
      <span
        className="dnb-timeline__item__label__icon"
        data-testid="timeline-item-label-icon"
      >
        <span key="icon-alignment">&zwnj;</span>
        {!skeleton && currentIcon && (
          <Icon
            icon={currentIcon}
            alt={currentAltLabel}
            size={stateIsCurrent ? undefined : 'small'}
          />
        )}
      </span>
    )
  }

  const TimelineItemName = () => {
    return (
      <span
        className="dnb-timeline__item__label__name"
        data-testid="timeline-item-label-name"
      >
        {name}
      </span>
    )
  }

  const TimelineItemLabel = () => {
    return (
      <span className="dnb-timeline__item__label">
        <TimelineItemIcon />
        <TimelineItemName />
      </span>
    )
  }

  const TimelineItemContent = () => {
    return (
      <div className="dnb-timeline__item__content">
        {date && (
          <span
            className="dnb-timeline__item__content__date"
            data-testid="timeline-item-content-date"
          >
            {date}
          </span>
        )}
        {infoMessage && (
          <FormStatus
            text={infoMessage}
            state="info"
            className="dnb-timeline__item__content__info"
            data-testid="timeline-item-content-info"
          />
        )}
      </div>
    )
  }

  return (
    <div
      className={classes}
      data-testid="timeline-item"
      aria-current={stateIsCurrent ? 'step' : undefined}
      {...props}
    >
      <TimelineItemLabel />
      <TimelineItemContent />
    </div>
  )
}

export default TimelineItem
