/**
 * Web ProgressIndicator Component
 *
 */

import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'
import { ProgressIndicatorLinearAllProps } from './types'

function usePrevious<P>(value: P): [P, P] {
  const ref = useRef<P>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return [ref.current, value]
}

function ProgressIndicatorLine(props: ProgressIndicatorLinearAllProps) {
  const {
    size,
    title,
    progress,
    visible,
    onComplete,
    callOnCompleteHandler,
    customColors,
    style,
    ...rest
  } = props

  const onCompleteIsFn =
    typeof onComplete === 'function' &&
    typeof callOnCompleteHandler === 'function'

  const [visibleCurrent, visiblePrev] = usePrevious(visible)

  if (onCompleteIsFn && !visibleCurrent && visiblePrev) {
    callOnCompleteHandler()
  }

  const hasProgressValue = progress > -1

  const transform = `translateX(${(progress || 0) - 100}%)`

  if (hasProgressValue) {
    rest.role = 'progressbar'
    rest['aria-label'] = title
    rest['title'] = title
  } else {
    rest.role = 'alert'
    rest['aria-busy'] = true
  }

  const remainingDOMAttributes = validateDOMAttributes(props, { ...rest })

  return (
    <span
      className={classnames(
        'dnb-progress-indicator__linear',
        size && `dnb-progress-indicator__linear--${size}`
      )}
      style={{
        ...style,
        ...(customColors?.shaft && {
          backgroundColor: customColors?.shaft,
        }),
      }}
      {...remainingDOMAttributes}
    >
      <span
        className={classnames(
          'dnb-progress-indicator__linear__bar',
          hasProgressValue &&
            'dnb-progress-indicator__linear__bar-transition',
          !hasProgressValue &&
            'dnb-progress-indicator__linear__bar1-animation'
        )}
        style={{
          backgroundColor: customColors?.line,
          transform: hasProgressValue ? transform : undefined,
        }}
      />
      {!hasProgressValue && (
        <span
          className={classnames(
            'dnb-progress-indicator__linear__bar',
            'dnb-progress-indicator__linear__bar2-animation'
          )}
          style={{
            backgroundColor: customColors?.line,
          }}
        />
      )}
    </span>
  )
}

export default ProgressIndicatorLine
