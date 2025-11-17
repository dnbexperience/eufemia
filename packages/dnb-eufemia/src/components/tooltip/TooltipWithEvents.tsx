/**
 * Web Tooltip Component
 *
 */

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import {
  getRefElement,
  injectTooltipSemantic,
  isTouch,
  useHandleAria,
} from './TooltipHelpers'
import Popover from '../popover/Popover'
import { TooltipProps } from './types'
import { TooltipContext } from './TooltipContext'

type TooltipWithEventsProps = {
  target: TooltipProps['targetElement']
  attributes?: React.HTMLAttributes<HTMLElement>
}

function TooltipWithEvents(props: TooltipProps & TooltipWithEventsProps) {
  const { children, attributes, ...restProps } = props
  const {
    active,
    target,
    skipPortal,
    noAnimation,
    showDelay,
    hideDelay,
    omitDescribedBy,
    arrow,
    position,
    align,
    fixedPosition,
    portalRootClass,
    contentRef,
    size,
  } = restProps

  const { internalId, isControlled } = useContext(TooltipContext)

  const [isActive, setIsActive] = useState(active)
  const [isNotSemanticElement, setIsNotSemanticElement] = useState(false)
  const [targetElementNode, setTargetElementNode] =
    useState<HTMLElement | null>(null)
  const [isOverlayHovered, setOverlayHovered] = useState(false)

  const delayTimeout = useRef<NodeJS.Timeout>()
  const overlayDelayTimeout = useRef<NodeJS.Timeout>()
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
   * Get our "target"
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
    }

    cloneRef.current = target as HTMLElement
    return null
  }, [
    internalId,
    isNotSemanticElement,
    omitDescribedBy,
    props.className,
    target,
  ])

  useHandleAria(targetElementNode)

  const updateTargetElement = useCallback(
    (element: HTMLElement | null) => {
      if (targetRef.current === element) {
        return
      }
      targetRef.current = element
      setTargetElementNode(element)
    },
    []
  )

  useLayoutEffect(() => {
    if (!target) {
      updateTargetElement(null)
      return
    }

    if (isValidElement(target)) {
      updateTargetElement(getRefElement(cloneRef))
      return
    }

    updateTargetElement(getRefElement(target as HTMLElement))
  }, [target, updateTargetElement])

  useLayoutEffect(() => {
    if (targetElementNode && !isControlled) {
      addEvents(targetElementNode)
    }

    return () => {
      clearTimers()
      if (targetElementNode) {
        removeEvents(targetElementNode)
      }
    }
  }, [addEvents, isControlled, removeEvents, targetElementNode])

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

  const clearOverlayTimers = () => {
    clearTimeout(overlayDelayTimeout.current)
  }

  useEffect(() => clearOverlayTimers, [])

  const handleOverlayMouseEnter = useCallback(() => {
    clearOverlayTimers()
    if (!isControlled) {
      setOverlayHovered(true)
    }
  }, [isControlled])

  const handleOverlayMouseLeave = useCallback(() => {
    if (isControlled) {
      return
    }
    const run = () => setOverlayHovered(false)
    clearOverlayTimers()
    if (skipPortal) {
      overlayDelayTimeout.current = setTimeout(
        run,
        parseFloat(String(hideDelay)) || 1
      )
    } else {
      run()
    }
  }, [hideDelay, isControlled, skipPortal])

  const overlayActive = isActive || isOverlayHovered

  const { className: attributeClassName, ...restAttributes } =
    attributes || {}

  return (
    <>
      <Popover
        baseClassName="dnb-tooltip"
        className={classnames(
          attributeClassName,
          'dnb-tooltip',
          size && `dnb-tooltip--${size}`
        )}
        theme="dark"
        {...(restAttributes as React.HTMLAttributes<HTMLElement>)}
        id={internalId}
        open={overlayActive}
        targetElement={targetElementNode || undefined}
        hideDelay={hideDelay}
        skipPortal={skipPortal}
        noAnimation={noAnimation}
        arrow={arrow}
        position={position}
        align={align}
        fixedPosition={fixedPosition}
        portalRootClass={portalRootClass}
        omitDescribedBy={omitDescribedBy}
        contentRef={contentRef}
        focusOnOpen={false}
        restoreFocus={false}
        closeOnOutsideClick={false}
        showCloseButton={false}
        hideCloseButton
        disableFocusTrap
        onMouseEnter={handleOverlayMouseEnter}
        onMouseLeave={handleOverlayMouseLeave}
      >
        {children}
      </Popover>

      {componentWrapper}
    </>
  )
}

export default TooltipWithEvents
