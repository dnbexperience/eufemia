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
import Context, { ContextProps } from '../../shared/Context'
import {
  isTrue,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'

import { createSpacingClasses } from '../space/SpacingHelper'
import { SpacingProps } from '../space/types'
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
  noAnimation?: boolean
  /**
   * Defines the size, like `small`, `default`, `medium` or `large`. Defaults to `default`.
   */
  size?: 'default' | 'small' | 'medium' | 'large' | 'huge'
  /**
   * A number between 0-100, if not supplied a continous loading-type animation will be used. Defaults to `undefined`
   */
  progress?: string | number
  /**
   * Show a custom label to the right or under the indicator.
   */
  label?: React.ReactNode
  /**
   * Set it to `vertical` if you want the label to be placed under the indicator. Defaults to `horizontal`.
   */
  labelDirection?: 'horizontal' | 'vertical'
  /**
   * If set to `true` a default label (from text locales) will be shown.
   */
  showDefaultLabel?: boolean
  /**
   * Use this to override the default label from text locales
   */
  indicator_label?: string
  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string
  /**
   * Will be called once it&#39;s no longer `visible`.
   */
  onComplete?: (...args: any[]) => any
}

// depracated, can be removed in v11
type DeprecatedProgressIndicatorProps = {
  /** @deprecated use `noAnimation` */
  no_animation?: boolean
  /** @deprecated use `labelDirection` */
  label_direction?: string
  /** @deprecated use `showDefaultLabel` */
  show_label?: boolean
  /** @deprecated use the `className` prop instead */
  class?: string
  /** @deprecated use the `label` prop instead */
  children?: React.ReactNode
  /**  @deprecated use `onComplete` */
  on_complete?: (...args: any[]) => any
}

export type ProgressIndicatorAllProps = Omit<
  React.HTMLProps<HTMLSpanElement>,
  'ref' | 'label' | 'size'
> &
  SpacingProps &
  ProgressIndicatorProps

function ProgressIndicator(
  props: ProgressIndicatorAllProps & DeprecatedProgressIndicatorProps
) {
  const undeprecatedProps = handleDeprecatedBehaviour(props)
  const allProps = updatePropsWithContext(
    undeprecatedProps,
    useContext(Context)
  )

  const {
    type = 'circular',
    size = 'default',
    noAnimation = false,
    onComplete,
    label,
    indicator_label,
    labelDirection = 'horizontal',
    showDefaultLabel = false,
    className,
    title,
    progress,
    visible = true,
    ...rest
  } = allProps

  const remainingDOMProps = validateDOMAttributes(allProps, { ...rest })

  const completeTimeout = useRef<NodeJS.Timeout>()
  const fadeOutTimeout = useRef<NodeJS.Timeout>()
  const [complete, setCompleteState] = useState(false)

  const progressNumber =
    typeof progress === 'string'
      ? parseFloat(progress)
      : typeof progress === 'number'
      ? progress
      : undefined

  const indicatorLabel =
    label || (isTrue(showDefaultLabel) && indicator_label)
  const progressTitle = title || formatProgress(progressNumber)

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
      if (onComplete) {
        fadeOutTimeout.current = setTimeout(() => {
          dispatchCustomElementEvent({ onComplete }, 'onComplete')
        }, 600) // wait for CSS fade out, defined in "progress-indicator-fade-out"
      }
    }, 200)
  }, [onComplete])

  return (
    <span
      className={classnames(
        'dnb-progress-indicator',
        visible && 'dnb-progress-indicator--visible',
        complete && 'dnb-progress-indicator--complete',
        type === 'linear' && 'dnb-progress-indicator--full-width',
        labelDirection && `dnb-progress-indicator--${labelDirection}`,
        size && `dnb-progress-indicator--${size}`,
        isTrue(noAnimation) && 'dnb-progress-indicator--no-animation',
        createSpacingClasses(allProps),
        className
      )}
      {...remainingDOMProps}
    >
      {type === 'circular' && (
        <ProgressIndicatorCircular
          size={size}
          progress={progressNumber}
          visible={visible}
          onComplete={onComplete}
          callOnCompleteHandler={callOnCompleteHandler}
          title={progressTitle?.toString()}
        />
      )}
      {type === 'linear' && (
        <ProgressIndicatorLinear
          size={size}
          progress={progressNumber}
          visible={visible}
          onComplete={onComplete}
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

function updatePropsWithContext(
  props: ProgressIndicatorAllProps,
  context: ContextProps
) {
  const localePropsFromContext =
    context?.getTranslation(props).ProgressIndicator
  const componentPropsFromContext = context?.ProgressIndicator
  return extendPropsWithContext(
    props,
    {},
    localePropsFromContext,
    componentPropsFromContext
  )
}

/**
 * Support deprecated behaviour by mutating the props.
 */
function handleDeprecatedBehaviour(
  oldProps: ProgressIndicatorAllProps & DeprecatedProgressIndicatorProps
): ProgressIndicatorAllProps {
  // Rename deprecated props
  // And indicator_label should still be snake case
  const {
    show_label: showDefaultLabel,
    indicator_label,
    class: className,
    children: label,
    ...propsToConvertToCamelCase
  } = oldProps

  // Merge deprecated props with new names (will not overwrite)
  return {
    showDefaultLabel,
    indicator_label,
    className,
    label,
    ...convertSnakeCaseProps(propsToConvertToCamelCase, {
      overrideExistingValue: false,
    }),
  }
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
