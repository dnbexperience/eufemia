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
import type { ContextProps } from '../../shared/Context'
import Context from '../../shared/Context'
import {
  isTrue,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import ProgressIndicatorCircular from './ProgressIndicatorCircular'
import ProgressIndicatorLinear from './ProgressIndicatorLinear'
import { format } from '../number-format/NumberUtils'

import type {
  ProgressIndicatorAllProps,
  ProgressIndicatorAnimationProps,
  CustomSize,
} from './types'
import { isValidSize } from './types'

function ProgressIndicator(props: ProgressIndicatorAllProps) {
  const allProps = updatePropsWithContext(props, useContext(Context))

  const {
    type = 'circular',
    size = 'default',
    noAnimation = false,
    onComplete,
    label,
    indicatorLabel,
    labelDirection = 'horizontal',
    showDefaultLabel = false,
    className,
    title,
    progress,
    visible = true,
    customColors,
    customCircleWidth,
    style,
    ...rest
  } = allProps

  const remainingDOMProps = validateDOMAttributes(allProps, { ...rest })

  const [sizeVariant, customSize]: [
    ProgressIndicatorAnimationProps['size'],
    CustomSize,
  ] = isValidSize(size) ? [size, undefined] : ['custom-size', size]

  const completeTimeout = useRef<NodeJS.Timeout>()
  const fadeOutTimeout = useRef<NodeJS.Timeout>()
  const [complete, setCompleteState] = useState(false)

  const progressNumber =
    typeof progress === 'string'
      ? parseFloat(progress)
      : typeof progress === 'number'
      ? progress
      : undefined

  const usedIndicatorLabel =
    label || (isTrue(showDefaultLabel) && indicatorLabel)
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
        sizeVariant && `dnb-progress-indicator--${sizeVariant}`,
        isTrue(noAnimation) && 'dnb-progress-indicator--no-animation',
        createSpacingClasses(allProps),
        className
      )}
      style={{
        ...style,
        ...{
          '--progress-indicator-circular-size': customSize,
          '--progress-indicator-circular-stroke-width': customCircleWidth,
          '--progress-indicator-linear-size': customSize,
        },
      }}
      {...remainingDOMProps}
    >
      {(type === 'circular' || type === 'countdown') && (
        <ProgressIndicatorCircular
          size={sizeVariant}
          progress={progressNumber}
          visible={visible}
          onComplete={onComplete}
          callOnCompleteHandler={callOnCompleteHandler}
          title={progressTitle?.toString()}
          customColors={customColors}
          customCircleWidth={customCircleWidth}
          counterClockwise={type === 'countdown'}
        />
      )}
      {type === 'linear' && (
        <ProgressIndicatorLinear
          size={sizeVariant}
          progress={progressNumber}
          visible={visible}
          onComplete={onComplete}
          callOnCompleteHandler={callOnCompleteHandler}
          title={progressTitle?.toString()}
          customColors={customColors}
        />
      )}
      {usedIndicatorLabel && (
        <span className="dnb-progress-indicator__label dnb-p">
          {usedIndicatorLabel}
        </span>
      )}
    </span>
  )
}

function updatePropsWithContext(
  props: ProgressIndicatorAllProps,
  context: ContextProps
) {
  const localPropsFromContext =
    context?.getTranslation(props).ProgressIndicator
  const componentPropsFromContext = context?.ProgressIndicator
  return extendPropsWithContext(
    props,
    {},
    localPropsFromContext,
    componentPropsFromContext
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
