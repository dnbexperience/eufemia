import React from 'react'
import classnames from 'classnames'

// Components
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Icons
import checkIcon from '../../icons/check'
import calendarIcon from '../../icons/calendar'
import pinIcon from '../../icons/pin'

// Shared
import Context from '../../shared/Context'
import type { SkeletonShow } from '../skeleton/Skeleton'
import { extendPropsWithContext } from '../../shared/component-helper'

export type TimeLineItemStates = 'completed' | 'current' | 'upcoming'

export type TimelineItemProps = {
  /**
   * Icon displaying on the left side.
   * Default: `check` for state `completed`, `pin` for state `current`, and `calendar` for state `upcoming` .
   */
  icon?: IconIcon

  /**
   * Text displaying the title of the item's corresponding page.
   * Default: translations based on the icon.
   */
  iconAlt?: string

  /**
   * Text displaying the title of the timeline item.
   */
  title: React.ReactNode

  /**
   * Text displaying the subtitle of the timeline item.
   */
  subtitle?: React.ReactNode | React.ReactNode[]

  /**
   * Text displaying info message of the timeline item.
   */
  infoMessage?: React.ReactNode

  /**
   * The component state. State 'completed', 'current' or 'upcoming'.
   * Default: null
   */
  state: TimeLineItemStates

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow
}

export type TimelineItemAllProps = TimelineItemProps &
  Omit<React.AllHTMLAttributes<HTMLLIElement>, 'title' | 'name'>

const defaultProps = {
  icon: null,
  iconAlt: null,
  title: null,
  subtitle: null,
  infoMessage: null,
  state: null,
  skeleton: false,
}

const TimelineItem = (localProps: TimelineItemAllProps) => {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.TimelineItem,
    { skeleton: context?.skeleton }
  )

  const {
    icon,
    iconAlt,
    title,
    subtitle,
    infoMessage,
    state,
    skeleton,
    ...props
  } = allProps

  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const classes = classnames(
    'dnb-timeline__item',
    skeletonClasses,
    `dnb-timeline__item--${state}`
  )

  return (
    <li
      className={classes}
      aria-current={state === 'current' ? 'step' : undefined}
      {...props}
    >
      <TimelineItemLabel
        state={state}
        title={title}
        icon={icon}
        iconAlt={iconAlt}
        skeleton={skeleton}
        translations={
          context.translation.TimelineItem as TimeLineIconAltTranslations
        }
      />
      <TimelineItemContent subtitle={subtitle} infoMessage={infoMessage} />
    </li>
  )
}

// Label

type TimelineItemLabelProps = TimeLineIconProps & TimelineItemTitleProps

const TimelineItemLabel = ({
  title,
  ...iconProps
}: TimelineItemLabelProps) => {
  return (
    <span className="dnb-timeline__item__label">
      <TimelineItemIcon {...iconProps} />
      <TimelineItemTitle title={title} />
    </span>
  )
}

type TimeLineIconProps = Pick<
  TimelineItemProps,
  'icon' | 'iconAlt' | 'state' | 'skeleton'
> & { translations: TimeLineIconAltTranslations }

type TimeLineIconAltTranslations = {
  alt_label_completed: string
  alt_label_current: string
  alt_label_upcoming: string
}

const TimelineItemIcon = ({
  icon,
  state,
  iconAlt,
  skeleton,
  translations,
}: TimeLineIconProps) => {
  const { alt_label_completed, alt_label_current, alt_label_upcoming } =
    translations

  const icons: Record<TimeLineItemStates, IconIcon> = {
    completed: checkIcon,
    current: pinIcon,
    upcoming: calendarIcon,
  }

  const labels: Record<TimeLineItemStates, string> = {
    completed: alt_label_completed,
    current: alt_label_current,
    upcoming: alt_label_upcoming,
  }

  const currentIcon = icon || icons[state]
  const currentAltLabel = iconAlt || labels[state]

  return (
    <span className="dnb-timeline__item__label__icon">
      <span key="icon-alignment" aria-hidden>
        &zwnj;
      </span>
      {!skeleton && currentIcon && (
        <IconPrimary
          icon={currentIcon}
          alt={currentAltLabel}
          size={state === 'current' ? undefined : 'small'}
        />
      )}
    </span>
  )
}

type TimelineItemTitleProps = Pick<TimelineItemProps, 'title'>

const TimelineItemTitle = ({ title }: TimelineItemTitleProps) => {
  return <span className="dnb-timeline__item__label__title">{title}</span>
}

// Content

type TimeLineItemContentProps = Pick<
  TimelineItemProps,
  'subtitle' | 'infoMessage'
>

const TimelineItemContent = ({
  subtitle,
  infoMessage,
}: TimeLineItemContentProps) => {
  const renderSubtitles = () => {
    if (!subtitle) {
      return null
    }

    if (Array.isArray(subtitle)) {
      return subtitle.map((subtitle, i) => (
        <TimelineItemSubtitle key={i} subtitle={subtitle} />
      ))
    }
    return <TimelineItemSubtitle subtitle={subtitle} />
  }

  return (
    <div className="dnb-timeline__item__content">
      {renderSubtitles()}
      {infoMessage && (
        <FormStatus
          text={infoMessage}
          state="info"
          className="dnb-timeline__item__content__info"
          stretch
        />
      )}
    </div>
  )
}

type TimelineItemSubtitleProps = {
  subtitle: React.ReactNode
}

const TimelineItemSubtitle = ({ subtitle }: TimelineItemSubtitleProps) => (
  <div className="dnb-timeline__item__content__subtitle">{subtitle}</div>
)

export default TimelineItem
