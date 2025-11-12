/**
 * Web Tooltip Component
 *
 */

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'
import {
  getRefElement,
  injectTooltipSemantic,
  isTouch,
  useHandleAria,
} from './TooltipHelpers'
import TooltipPortal from './TooltipPortal'
import { TooltipContext } from './TooltipContext'
import { TooltipProps } from './types'

type TooltipWithEventsProps = {
  target: HTMLElement
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
    omitDescribedBy,
  } = restProps

  const [isActive, setIsActive] = useState(active)
  const [isNotSemanticElement, setIsNotSemanticElement] = useState(false)
  const [, forceUpdate] = useState(!target)
  const [isControlled] = useState(() => typeof active === 'boolean')

  const delayTimeout = useRef<NodeJS.Timeout>()
  const cloneRef = useRef<HTMLElement>()
  const targetRef = useRef<HTMLElement>()

  const clearTimers = () => {
    clearTimeout(delayTimeout.current)
  }

  const onMouseEnter = useCallback(
    (e: MouseEvent) => {
      try {
        const elem = e.currentTarget as HTMLElement

        if (elem.getAttribute('data-autofocus')) {
          return // stop here
        }

        if (isTouch(e.type)) {
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
    },
    [noAnimation, showDelay]
  )

  const onFocus = useCallback(
    (e: MouseEvent) => {
      /**
       * VoiceOver needs to show the Tooltip in order to read the aria-describedby
       */
      return onMouseEnter(e)
    },
    [onMouseEnter]
  )

  const onMouseLeave = useCallback(
    (e: MouseEvent) => {
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
        delayTimeout.current = setTimeout(
          run,
          parseFloat(String(hideDelay))
        )
      } else {
        run()
      }
    },
    [active, hideDelay, skipPortal]
  )

  const addEvents = useCallback(
    (element: HTMLElement) => {
      try {
        element.addEventListener('focus', onFocus)
        element.addEventListener('blur', onMouseLeave)
        element.addEventListener('mouseenter', onMouseEnter)
        element.addEventListener('mouseleave', onMouseLeave)
        element.addEventListener('touchstart', onMouseEnter)
        element.addEventListener('touchend', onMouseLeave)
      } catch (e) {
        warn(e)
      }
    },
    [onFocus, onMouseLeave, onMouseEnter]
  )

  const removeEvents = useCallback(
    (element: HTMLElement) => {
      if (!element) {
        return // stop here
      }
      try {
        element.removeEventListener('focus', onFocus)
        element.removeEventListener('blur', onMouseLeave)
        element.removeEventListener('mouseenter', onMouseEnter)
        element.removeEventListener('mouseleave', onMouseLeave)
        element.removeEventListener('touchstart', onMouseEnter)
        element.removeEventListener('touchend', onMouseLeave)
      } catch (e) {
        warn(e)
      }
    },
    [onFocus, onMouseEnter, onMouseLeave]
  )

  /**
   * Make the element focus-able by keyboard, if it is not a semantic element.
   * This will enable keyboard access to the tooltip by adding focus possibility
   */
  const handleSemanticElement = useCallback(() => {
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
  }, [internalId])

  /**
   * Here we get our "target" / "targetSelector"
   */
  const componentWrapper = useMemo(() => {
    // we could also check against && target.props && !target.props.tooltip
    if (isValidElement(target)) {
      const params = isNotSemanticElement
        ? injectTooltipSemantic({ className: props.className })
        : {}

      return cloneElement(target, {
        ref: cloneRef,
        ...params,
        'aria-describedby': combineDescribedBy(
          target.props['aria-describedby'],
          omitDescribedBy ? null : internalId
        ),
      })
    } else {
      cloneRef.current = target
    }

    return null
  }, [
    internalId,
    isNotSemanticElement,
    omitDescribedBy,
    props.className,
    target,
  ])

  useHandleAria(targetRef.current, { internalId, omitDescribedBy })

  useLayoutEffect(() => {
    targetRef.current = getRefElement(cloneRef)
  }, [target])

  useLayoutEffect(() => {
    if (targetRef.current) {
      if (!isControlled) {
        addEvents(targetRef.current)
      }
    }

    return () => {
      clearTimers()
      removeEvents(targetRef.current)
    }
  }, [addEvents, isControlled, removeEvents])

  useLayoutEffect(() => {
    if (targetRef.current) {
      forceUpdate(active)
    }
  }, [active])

  useEffect(() => {
    if (isControlled) {
      setIsActive(active)
    }
  }, [active, isControlled])

  useEffect(() => {
    if (isActive) {
      handleSemanticElement()
    }
  }, [isActive, handleSemanticElement])

  const Element = skipPortal ? TooltipContainer : TooltipPortal

  return (
    <TooltipContext.Provider value={{ isControlled, omitDescribedBy }}>
      <Element
        {...restProps}
        active={isActive}
        targetElement={targetRef.current}
        keepInDOM={skipPortal ? undefined : true} // because of useHandleAria
      >
        {children}
      </Element>

      {componentWrapper}
    </TooltipContext.Provider>
  )
}

export default TooltipWithEvents
