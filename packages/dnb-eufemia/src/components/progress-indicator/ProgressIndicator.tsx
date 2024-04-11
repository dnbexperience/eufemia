/**
 * Web ProgressIndicator Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { SpacingProps } from '../space/types'
import type { SectionSpacing, SectionStyleTypes } from '../Section'
import ProgressIndicatorCircular from './ProgressIndicatorCircular'
import ProgressIndicatorLinear from './ProgressIndicatorLinear'
import { format } from '../number-format/NumberUtils'

export type ProgressIndicatorProps = {
  /**
   * Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean
  /**
   * Defines the "type" of progress, like `circular` or `linear`. Defaults to `circular`.
   */
  type?: 'circular' | 'linear'
  /**
   * Disables the fade-in and fade-out animation. Defaults to `false`.
   */
  no_animation?: boolean
  /**
   * Defines the size, like `small`, `default`, `medium` or `large`. Defaults to `default`.
   */
  size?: 'default' | 'small' | 'medium' | 'large' | 'huge'
  /**
   * To visualize a static "percentage" (0-100) as a progress state. Defaults to `null`.
   */
  progress?: string | number
  /**
   * Show a custom label to the right or under the indicator.
   */
  label?: React.ReactNode
  /**
   * Set it to `vertical` if you want the label to be placed under the indicator. Defaults to `horizontal`.
   */
  label_direction?: string
  /**
   * If set to `true` a default label will be shown.
   */
  show_label?: boolean
  indicator_label?: string
  /**
   * To enable the visual helper `.dnb-section` class. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  section_style?: SectionStyleTypes
  /**
   * To modify the `spacing`. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  section_spacing?: SectionSpacing
  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string
  class?: string
  className?: string
  children?: React.ReactNode | ((...args: any[]) => any)
  /**
   * Will be called once it&#39;s no longer `visible`.
   */
  on_complete?: (...args: any[]) => any
}

export type ProgressIndicatorAllProps = Omit<
  React.HTMLProps<HTMLElement>,
  'ref'
> &
  SpacingProps &
  ProgressIndicatorProps

function ProgressIndicator(props: ProgressIndicatorAllProps) {
  const context = useContext(Context)

  const localePropsFromContext =
    context?.getTranslation(props).ProgressIndicator
  const componentPropsFromContext = context?.ProgressIndicator

  const propsUpdatedWithContext = extendPropsWithContext(
    props,
    localePropsFromContext,
    componentPropsFromContext
  )

  const {
    type = 'circular',
    size = 'default',
    no_animation = false,
    on_complete,
    label,
    indicator_label,
    label_direction = 'horizontal',
    show_label = false,
    className,
    class: _className,
    children,
    title,
    progress, // eslint-disable-line
    visible = true, // eslint-disable-line
    ...attributes
  } = propsUpdatedWithContext

  const progressNumber =
    typeof progress === 'string' ? parseFloat(progress) : progress

  const [complete, setCompleteState] = useState(false)

  const completeTimeout = useRef<NodeJS.Timeout>()
  const fadeOutTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      clearTimeout(completeTimeout.current)
      clearTimeout(fadeOutTimeout.current)
    }
  }, [])

  useEffect(() => {
    if (visible) {
      setCompleteState(false)
    }
  }, [visible])

  const callOnCompleteHandler = useCallback(() => {
    completeTimeout.current = setTimeout(() => {
      setCompleteState(true)
      if (on_complete) {
        fadeOutTimeout.current = setTimeout(() => {
          dispatchCustomElementEvent({ on_complete }, 'on_complete')
        }, 600) // wait for CSS fade out, defined in "progress-indicator-fade-out"
      }
    }, 200)
  }, [on_complete])

  const indicatorLabel =
    label || children || (isTrue(show_label) && indicator_label)
  const progressTitle = title || formatProgress(progressNumber)

  const params = { ...attributes }
  validateDOMAttributes(props, params)

  return (
    <span
      className={classnames(
        'dnb-progress-indicator',
        visible && 'dnb-progress-indicator--visible',
        complete && 'dnb-progress-indicator--complete',
        type === 'linear' && 'dnb-progress-indicator--full-width',
        label_direction && `dnb-progress-indicator--${label_direction}`,
        size && `dnb-progress-indicator--${size}`,
        isTrue(no_animation) && 'dnb-progress-indicator--no-animation',
        createSpacingClasses(propsUpdatedWithContext),
        className,
        _className
      )}
      {...params}
    >
      {type === 'circular' && (
        <ProgressIndicatorCircular
          size={size}
          progress={progressNumber}
          visible={visible}
          onComplete={on_complete}
          callOnCompleteHandler={callOnCompleteHandler}
          title={progressTitle?.toString()}
        />
      )}
      {type === 'linear' && (
        <ProgressIndicatorLinear
          size={size}
          progress={progressNumber}
          visible={visible}
          onComplete={on_complete}
          callOnCompleteHandler={callOnCompleteHandler}
          title={progressTitle?.toString()}
        />
      )}
      {indicatorLabel && (
        <span className="dnb-progress-indicator__label dnb-p">
          {indicatorLabel}
        </span>
      )}
    </span>
  )
}

function formatProgress(progress) {
  if (parseFloat(progress) > -1) {
    return format(progress, {
      decimals: 2,
      percent: true,
    })
  }
  return null
}

export default ProgressIndicator

ProgressIndicator._supportsSpacingProps = true
