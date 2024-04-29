/**
 * Web ProgressIndicator Component
 *
 */

import React, { useEffect, useRef, forwardRef } from 'react'
import * as CSS from 'csstype'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'
import { IS_EDGE } from '../../shared/helpers'
import { ProgressIndicatorCircularAllProps } from './types'

function ProgressIndicatorCircular(
  props: ProgressIndicatorCircularAllProps
) {
  const {
    size,
    visible,
    progress,
    reverse = false,
    maxOffset = 88,
    onComplete,
    callOnCompleteHandler,
    title,
    customColors,
    ...rest
  } = props
  const keepAnimatingRef = useRef(true)
  const visibleRef = useRef(false)
  const useAnimationFrame = typeof onComplete === 'function' || IS_EDGE
  const _refDark = useRef<SVGSVGElement>(null)
  const _refLight = useRef<SVGSVGElement>(null)
  const _startupTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (useAnimationFrame) {
      _startupTimeout.current = setTimeout(() => {
        if (_refDark.current) {
          doAnimation(_refDark.current, true, callOnCompleteHandler)
        }
        if (_refLight.current) {
          doAnimation(_refLight.current, false)
        }
      }, 300)
    }

    return () => {
      keepAnimatingRef.current = false
      if (_startupTimeout.current) {
        clearTimeout(_startupTimeout.current)
      }
    }
  }, [])

  useEffect(() => {
    visibleRef.current = visible
  }, [visible])

  const doAnimation = (
    element: SVGSVGElement,
    animateOnStart = true,
    callback = null
  ) => {
    const min = 1
    const max = 88
    let start = 0,
      ms = 0,
      prog = max,
      setProg = animateOnStart,
      animate1 = true,
      completeCalled = false,
      stopNextRound = false

    const step = (timestamp) => {
      if (!start) {
        start = timestamp
      }

      // milliseconds
      ms = timestamp - start

      if (animate1) {
        if (!visibleRef.current && prog < 5) {
          prog = min
        }
        if (setProg) {
          element.style['stroke-dashoffset'] = prog
        } else if (!animateOnStart) {
          element.style['stroke-dashoffset'] = max
        }
      }

      // if complete
      if (stopNextRound) {
        animate1 = false
        if (!completeCalled) {
          completeCalled = true
          if (animateOnStart && typeof callback === 'function') {
            callback()
          }
        } else if (visibleRef.current && ms % 1e3 > 950) {
          // startAnimationFirstTime() // will not start completely from scratch
          stopNextRound = false
        }
      } else {
        // make sure we stop next round
        stopNextRound = !visibleRef.current && prog === min
        animate1 = true
        completeCalled = false
      }

      // since we have 1sec as duration, and we want always a max of 1000ms
      prog = Math.round(max - (max / 1e3) * (ms % 1e3))

      // calc if we want to animate
      setProg = animateOnStart
        ? Math.ceil(ms / 1e3) % 2 === 1 || ms === 0
        : Math.ceil(ms / 1e3) % 2 === 0 && ms !== 0

      if (keepAnimatingRef.current) {
        window.requestAnimationFrame(step)
      }
    }
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(step)
    }
  }

  const strokeDashoffset = maxOffset - (maxOffset / 100) * progress
  const hasProgressValue = progress > -1

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
        'dnb-progress-indicator__circular',
        size && `dnb-progress-indicator__circular--${size}`,
        hasProgressValue &&
          'dnb-progress-indicator__circular--has-progress-value'
      )}
      {...remainingDOMAttributes}
    >
      <span className="dnb-progress-indicator__circular__background-padding">
        <span
          className="dnb-progress-indicator__circular__background"
          style={{ backgroundColor: customColors?.background }}
        />
      </span>

      {/* The first one is the background line */}
      <Circle
        className={classnames(
          'dnb-progress-indicator__circular__line',
          'light',
          'paused'
        )}
        strokeColor={customColors?.shaft}
      />
      <Circle
        className={classnames(
          'dnb-progress-indicator__circular__line',
          'dark',
          'dark',
          hasProgressValue || useAnimationFrame ? 'paused' : null
        )}
        style={
          hasProgressValue
            ? {
                strokeDashoffset: reverse
                  ? -strokeDashoffset
                  : strokeDashoffset,
              }
            : {}
        }
        strokeColor={customColors?.line}
        ref={_refDark}
      />
      {!hasProgressValue && (
        <Circle
          className={classnames(
            'dnb-progress-indicator__circular__line',
            'light',
            useAnimationFrame ? 'paused' : null
          )}
          strokeColor={customColors?.shaft}
          ref={_refLight}
        />
      )}
    </span>
  )
}

const Circle = forwardRef(function Circle(
  {
    strokeColor,
    ...rest
  }: React.HTMLProps<SVGSVGElement> & {
    strokeColor?: CSS.Property.BackgroundColor
  },
  ref: React.RefObject<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 32 32"
      shapeRendering="geometricPrecision"
      ref={ref}
      {...rest}
    >
      <circle
        className="dnb-progress-indicator__circular__circle"
        fill="none"
        strokeWidth="4"
        cx="16"
        cy="16"
        r="14"
        style={{ stroke: strokeColor }}
      />
    </svg>
  )
})

export default ProgressIndicatorCircular
