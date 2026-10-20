/**
 * Web ProgressIndicator Component
 *
 */

import { useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { validateDOMAttributes } from '../../shared/component-helper'
import type { ProgressIndicatorLinearAllProps } from './types'

function ProgressIndicatorLine(props: ProgressIndicatorLinearAllProps) {
  const {
    size,
    title,
    progress,
    show,
    onComplete,
    callOnCompleteHandler,
    customColors,
    style,
    className,
    ...rest
  } = props

  const onCompleteIsFn =
    typeof onComplete === 'function' &&
    typeof callOnCompleteHandler === 'function'

  // Call onComplete once the indicator is hidden (show changes from true to false)
  const wasShownRef = useRef(show)
  useEffect(() => {
    if (onCompleteIsFn && wasShownRef.current && !show) {
      callOnCompleteHandler()
    }
    wasShownRef.current = show
  }, [show, onCompleteIsFn, callOnCompleteHandler])

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
      className={clsx(
        'dnb-progress-indicator__linear',
        size && `dnb-progress-indicator__linear--${size}`,
        className
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
        className={clsx(
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
          className={clsx(
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
