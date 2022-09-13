/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import { injectTooltipSemantic } from './TooltipHelpers'
import TooltipPortal from './TooltipPortal'
import { TooltipProps } from './types'

type TooltipWithEventsProps = {
  target: React.ReactElement & React.RefObject<HTMLElement>
  active: boolean
  internalId: string
}

function TooltipWithEvents(props: TooltipProps & TooltipWithEventsProps) {
  const { children, target, ...restProps } = props

  const [isActive, setIsActive] = React.useState(false)
  const [isNotSemanticElement, setIsNotSemanticElement] =
    React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  const onEnterTimeout = React.useRef<NodeJS.Timeout>()
  const elementRef = React.useRef<HTMLElement>()
  const cloneRef = React.useRef<HTMLElement>()

  React.useEffect(() => {
    elementRef.current = getRefElement(cloneRef)

    // When used internal
    if (!elementRef.current) {
      elementRef.current = target.current
    }

    if (elementRef.current) {
      setIsMounted(true)
      addEvents(elementRef.current)
      handleSemanticElement()
    }

    return () => {
      clearTimeout(onEnterTimeout.current)

      const element = elementRef.current
      if (element) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Make the element focus able by keyboard, if it is not a semantic element
   * This will enable keyboard access to the tooltip by adding focus posibility
   */
  const handleSemanticElement = () => {
    try {
      const targetElement = document.querySelector(
        `*[aria-describedby*="${props.internalId}"]`
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

  const onFocus = (e: MouseEvent) => {
    try {
      if (
        document.documentElement.getAttribute('data-whatintent') ===
        'keyboard'
      ) {
        return onMouseEnter(e)
      }
    } catch (e) {
      warn(e)
    }
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

    if (props.noAnimation || globalThis.IS_TEST) {
      run()
    } else {
      clearTimeout(onEnterTimeout.current)
      onEnterTimeout.current = setTimeout(
        run,
        parseFloat(String(props.showDelay)) || 1
      ) // have min 1 to make sure we are after onMouseLeave
    }
  }

  const onMouseLeave = (e: MouseEvent) => {
    try {
      if (isTouch(e.type)) {
        const elem = e.currentTarget as HTMLElement
        elem.style.userSelect = ''
      }
    } catch (e) {
      warn(e)
    }

    clearTimeout(onEnterTimeout.current)
    setIsActive(false)
  }

  const componentWrapper = React.useMemo(() => {
    // we could also check against  && target.props && !target.props.tooltip
    if (React.isValidElement(target)) {
      const params = isNotSemanticElement
        ? injectTooltipSemantic({ className: props.className })
        : {}

      return React.cloneElement(target, {
        ref: cloneRef,
        ...params,
        'aria-describedby': combineDescribedBy(
          target.props,
          props.internalId
        ),
      })
    }

    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return (
    <>
      {componentWrapper}
      {isMounted && (
        <TooltipPortal
          key="tooltip"
          active={isActive}
          target={elementRef.current}
          {...restProps}
        >
          {children}
        </TooltipPortal>
      )}
    </>
  )
}

export default TooltipWithEvents

const isTouch = (type: string) => {
  return /touch/i.test(type)
}

function getRefElement(target: React.RefObject<HTMLElement>) {
  const unknownTarget = target as unknown as React.RefObject<{
    _ref: React.RefObject<HTMLElement>
  }>
  let element = target as HTMLElement | React.RefObject<HTMLElement>

  // "_ref" is set inside e.g. the Button component (among many others)
  if (unknownTarget?.current?._ref) {
    element = getRefElement(unknownTarget.current._ref)
  }

  if (Object.prototype.hasOwnProperty.call(element, 'current')) {
    element = (element as React.RefObject<HTMLElement>).current
  }

  return element as HTMLElement
}
