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
    onComplete,
    callOnCompleteHandler,
    title,
    customColors,
    customCircleWidth,
    counterClockwise = false,
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
    const max = Math.PI * 100
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
        if (!visibleRef.current && prog < 20) {
          prog = min
        }
        if (setProg) {
          element.style['stroke-dashoffset'] = `${prog}%`
        } else if (!animateOnStart) {
          element.style['stroke-dashoffset'] = `${max}%`
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
          console.log('start')
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

  const progressIsControlled = progress > -1

  if (progressIsControlled) {
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
        progressIsControlled &&
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
        className={classnames('light', 'paused')}
        customColor={customColors?.shaft}
        customWidth={customCircleWidth}
      />
      <Circle
        className={classnames(
          'dark',
          'dark',
          progressIsControlled || useAnimationFrame ? 'paused' : null
        )}
        style={
          progressIsControlled
            ? {
                strokeDashoffset: getOffset(progress, counterClockwise),
              }
            : {}
        }
        customColor={customColors?.line}
        customWidth={customCircleWidth}
        ref={_refDark}
      />
      {!progressIsControlled && (
        <Circle
          className={classnames(
            'light',
            useAnimationFrame ? 'paused' : null
          )}
          customColor={customColors?.shaft}
          customWidth={customCircleWidth}
          ref={_refLight}
        />
      )}
    </span>
  )
}

const Circle = forwardRef(function Circle(
  {
    customColor,
    customWidth,
    className,
    ...rest
  }: React.HTMLProps<SVGSVGElement> & {
    customColor?: CSS.Property.BackgroundColor
    customWidth?: CSS.Property.StrokeWidth
  },
  ref: React.RefObject<SVGSVGElement>
) {
  const correctedCustomWidth = correctPercentageStrokeWidth(customWidth)
  return (
    <svg
      className={classnames(
        'dnb-progress-indicator__circular__line',
        className
      )}
      shapeRendering="geometricPrecision"
      ref={ref}
      {...rest}
    >
      <circle
        className="dnb-progress-indicator__circular__circle"
        fill="none"
        cx="50%"
        cy="50%"
        r="50%"
        style={{
          stroke: customColor,
          ...(correctedCustomWidth
            ? {
                '--progress-indicator-circular-stroke-width':
                  correctedCustomWidth,
              }
            : undefined),
        }}
      />
    </svg>
  )
})
/**
 *
 * @param progress number between 0-100
 * @param counterClockwise decides direction of movement. Default is `false`
 * @returns
 */

function getOffset(progress: number, counterClockwise = false) {
  const offset = Math.PI * (100 - progress)
  return `${counterClockwise ? -offset : offset}%`
}

/**
 * If the custom stroke width is a percentage, returns a corrected width
 * relative to the parent SVG
 * @param strokeWidth
 * @returns
 */
function correctPercentageStrokeWidth(
  strokeWidth: CSS.Property.StrokeWidth
) {
  if (typeof strokeWidth === 'string' && strokeWidth.endsWith('%')) {
    const number = parseFloat(strokeWidth.slice(0, strokeWidth.length - 1))
    return `${(100 * number) / (100 - number)}%`
  }
}
export default ProgressIndicatorCircular
