/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'
import {
  getRefElement,
  injectTooltipSemantic,
  isTouch,
  useHandleAria,
} from './TooltipHelpers'
import TooltipPortal from './TooltipPortal'
import { TooltipProps } from './types'

type TooltipWithEventsProps = {
  target: HTMLElement | React.ReactElement
  active: boolean
  internalId: string
}

function TooltipWithEvents(props: TooltipProps & TooltipWithEventsProps) {
  const { children, ...restProps } = props
  const {
    active,
    target,
    skipPortal,
    noAnimation,
    showDelay,
    hideDelay,
    internalId,
  } = restProps

  const [isActive, setIsActive] = React.useState(active)
  const [isNotSemanticElement, setIsNotSemanticElement] =
    React.useState(false)
  const [isMounted, setIsMounted] = React.useState(!target)

  const delayTimeout = React.useRef<NodeJS.Timeout>()
  const cloneRef = React.useRef<HTMLElement>()
  const targetRef = React.useRef<HTMLElement>()

  const clearTimers = () => {
    clearTimeout(delayTimeout.current)
  }

  React.useLayoutEffect(() => {
    targetRef.current = getRefElement(cloneRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  React.useLayoutEffect(() => {
    if (targetRef.current) {
      setIsMounted(true)
      addEvents(targetRef.current)
      handleSemanticElement()
    }

    return () => {
      clearTimers()
      removeEvents(targetRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Make the element focus-able by keyboard, if it is not a semantic element.
   * This will enable keyboard access to the tooltip by adding focus posibility
   */
  const handleSemanticElement = () => {
    try {
      const targetElement = document.querySelector(
        `*[aria-describedby*="${internalId}"]`
      )
      if (targetElement) {
        const role = targetElement.getAttribute('role')
        if (
          /div|p|span/i.test(targetElement?.tagName) &&
          (!role || role === 'text')
        ) {
          setIsNotSemanticElement(true)
        }
      }
    } catch (e) {
      warn(e)
    }
  }

  const addEvents = (element: HTMLElement) => {
    try {
      element.addEventListener('click', onMouseLeave)
      element.addEventListener('focus', onFocus)
      element.addEventListener('blur', onMouseLeave)
      element.addEventListener('mouseenter', onMouseEnter)
      element.addEventListener('mousedown', onMouseEnter)
      element.addEventListener('mouseleave', onMouseLeave)
      element.addEventListener('touchstart', onMouseEnter)
      element.addEventListener('touchend', onMouseLeave)
    } catch (e) {
      warn(e)
    }
  }

  const removeEvents = (element: HTMLElement) => {
    if (!element) return
    try {
      element.removeEventListener('click', onMouseLeave)
      element.removeEventListener('focus', onFocus)
      element.removeEventListener('blur', onMouseLeave)
      element.removeEventListener('mouseenter', onMouseEnter)
      element.removeEventListener('mouseleave', onMouseLeave)
      element.removeEventListener('touchstart', onMouseEnter)
      element.removeEventListener('touchend', onMouseLeave)
    } catch (e) {
      warn(e)
    }
  }

  const onFocus = (e: MouseEvent) => {
    /**
     * VoiceOver needs to show the Tooltip in order to read the aria-describedby
     */
    return onMouseEnter(e)
  }

  const onMouseEnter = (e: MouseEvent) => {
    try {
      if (isTouch(e.type)) {
        const elem = e.currentTarget as HTMLElement
        elem.style.userSelect = 'none'
      }
    } catch (e) {
      warn(e)
    }

    const run = () => {
      setIsActive(true)
    }

    if (noAnimation || globalThis.IS_TEST) {
      run()
    } else {
      clearTimers()
      delayTimeout.current = setTimeout(
        run,
        parseFloat(String(showDelay)) || 1
      ) // have min 1 to make sure we are after onMouseLeave
    }
  }

  const onMouseLeave = (e: MouseEvent) => {
    if (active) {
      return // stop here, because it is set to true by the original prop
    }

    try {
      if (isTouch(e.type)) {
        const elem = e.currentTarget as HTMLElement
        elem.style.userSelect = ''
      }
    } catch (e) {
      warn(e)
    }

    clearTimers()

    const run = () => {
      setIsActive(false)
    }

    if (skipPortal) {
      delayTimeout.current = setTimeout(run, parseFloat(String(hideDelay)))
    } else {
      run()
    }
  }

  /**
   * Here we get our "target" / "targetSelector"
   */
  const componentWrapper = React.useMemo(() => {
    // we could also check against && target.props && !target.props.tooltip
    if (React.isValidElement(target)) {
      const params = isNotSemanticElement
        ? injectTooltipSemantic({ className: props.className })
        : {}

      return React.cloneElement(target, {
        ref: cloneRef,
        ...params,
        'aria-describedby': combineDescribedBy(target.props, internalId),
      })
    } else {
      cloneRef.current = target
    }

    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  useHandleAria(targetRef.current, internalId)

  return (
    <>
      {isMounted &&
        (skipPortal ? (
          <TooltipContainer
            {...restProps}
            active={isActive}
            targetElement={targetRef.current}
          >
            {children}
          </TooltipContainer>
        ) : (
          <TooltipPortal
            {...restProps}
            active={isActive}
            targetElement={targetRef.current}
            keepInDOM // because of useHandleAria
          >
            {children}
          </TooltipPortal>
        ))}

      {componentWrapper}
    </>
  )
}

export default TooltipWithEvents
