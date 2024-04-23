/**
 * Web ProgressIndicator Component
 *
 */

import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'
type ProgressIndicatorLinearProps = {
  /**
   * Defines the size, like `small`, `default`, `medium` or `large`. Defaults to `default`.
   */
  size?: string
  /**
   * Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean
  /**
   * To visualize a static "percentage" (0-100) as a progress state. Defaults to `null`.
   */
  progress?: number
  onComplete?: (...args: any[]) => any
  callOnCompleteHandler?: (...args: any[]) => any
  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string
}

function usePrevious<P>(value: P): [P, P] {
  const ref = useRef<P>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return [ref.current, value]
}

function ProgressIndicatorLine(
  props: ProgressIndicatorLinearProps &
    Omit<React.HTMLProps<HTMLElement>, 'size'>
) {
  const {
    size,
    title,
    progress,
    visible,
    onComplete,
    callOnCompleteHandler,
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
        style={hasProgressValue ? { transform } : {}}
      />
      {!hasProgressValue && (
        <span
          className={classnames(
            'dnb-progress-indicator__linear__bar',
            'dnb-progress-indicator__linear__bar2-animation'
          )}
        />
      )}
    </span>
  )
}

export default ProgressIndicatorLine
