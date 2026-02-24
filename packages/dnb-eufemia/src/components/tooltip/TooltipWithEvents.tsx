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
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import { isTouch } from './TooltipHelpers'
import Popover from '../popover/Popover'
import getRefElement from '../../shared/internal/getRefElement'
import { TooltipProps } from './types'
import { TooltipContext } from './TooltipContext'
import AriaLive from '../AriaLive'

type TooltipWithEventsProps = {
  target: TooltipProps['targetElement']
  attributes?: React.HTMLAttributes<HTMLElement>
  targetRefreshKey?: TooltipProps['targetRefreshKey']
  forceOpen?: TooltipProps['forceOpen']
}

function TooltipWithEvents(props: TooltipProps & TooltipWithEventsProps) {
  const { children, attributes, ...restProps } = props
  const {
    open,
    target,
    skipPortal,
    noAnimation,
    showDelay,
    hideDelay,
    arrow,
    position,
    align,
    fixedPosition,
    portalRootClass,
    triggerOffset,
    contentRef,
    size,
    keepInDOM = false,
    targetRefreshKey,
    forceOpen,
  } = restProps

  const { internalId, isControlled } = useContext(TooltipContext)

  const [isOpen, setIsOpen] = useState(open)
  const [isOverlayHovered, setOverlayHovered] = useState(false)

  const delayTimeout = useRef<NodeJS.Timeout>(undefined)
  const overlayDelayTimeout = useRef<NodeJS.Timeout>(undefined)
  const cloneRef = useRef<HTMLElement>(undefined)
  const previousDescribedByIdRef = useRef<string | null>(null)

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
        setIsOpen(true)
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
      if (open) {
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
        setIsOpen(false)
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
    [open, hideDelay, skipPortal]
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
      if (!(element instanceof HTMLElement)) {
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

  const overlayOpen = Boolean(isOpen || isOverlayHovered || forceOpen)

  // const fallbackDescriptionId = `${internalId}-sr`
  const describedById = overlayOpen ? internalId : null

  /**
   * Get our "target"
   */
  const componentWrapper = useMemo(() => {
    if (isValidElement<any>(target)) {
      return cloneElement(target as React.ReactElement<any>, {
        ref: cloneRef,
        'aria-describedby': combineDescribedBy(
          target.props['aria-describedby'],
          describedById
        ),
      })
    }

    cloneRef.current = target as HTMLElement
    return null
  }, [describedById, target])

  useEffect(() => {
    if (!target) {
      return () => clearTimers()
    }

    const element = getRefElement(cloneRef)

    if (!(element instanceof HTMLElement) || isControlled) {
      return () => clearTimers()
    }

    addEvents(element)

    return () => {
      clearTimers()
      removeEvents(element)
    }
  }, [addEvents, removeEvents, isControlled, target])

  useEffect(() => {
    if (isControlled) {
      setIsOpen(open)
    }
  }, [open, isControlled])

  useEffect(() => {
    const targetElement = getRefElement(cloneRef)
    if (!(targetElement instanceof HTMLElement)) {
      previousDescribedByIdRef.current = null
      return
    }

    const updateAriaDescribedBy = (nextId: string | null) => {
      const existingValues =
        targetElement
          .getAttribute('aria-describedby')
          ?.split(/\s+/)
          .map((value) => value.trim())
          .filter(Boolean) ?? []

      const withoutPrevious =
        previousDescribedByIdRef.current !== null
          ? existingValues.filter(
              (value) => value !== previousDescribedByIdRef.current
            )
          : existingValues

      let nextValues = withoutPrevious
      if (nextId) {
        nextValues = nextValues.filter((value) => value !== nextId)
        nextValues = [...nextValues, nextId]
      }

      if (nextValues.length > 0) {
        targetElement.setAttribute(
          'aria-describedby',
          nextValues.join(' ')
        )
      } else {
        targetElement.removeAttribute('aria-describedby')
      }

      previousDescribedByIdRef.current = nextId
    }

    updateAriaDescribedBy(describedById)

    return () => {
      updateAriaDescribedBy(null)
    }
  }, [cloneRef, describedById, target])

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

  const { className: attributeClassName, ...restAttributes } =
    attributes || {}

  return (
    <>
      <Popover
        baseClassName="dnb-tooltip"
        className={clsx(
          attributeClassName,
          'dnb-tooltip',
          size && size !== 'default' && `dnb-tooltip--${size}`
        )}
        theme="dark"
        id={internalId}
        open={overlayOpen}
        targetElement={cloneRef}
        arrowEdgeOffset={4}
        hideDelay={hideDelay}
        skipPortal={skipPortal}
        keepInDOM={keepInDOM}
        noAnimation={noAnimation}
        triggerOffset={triggerOffset}
        targetRefreshKey={targetRefreshKey}
        arrowPosition={arrow}
        placement={position}
        alignOnTarget={align}
        fixedPosition={fixedPosition}
        portalRootClass={portalRootClass}
        contentClassName="dnb-tooltip__content"
        contentRef={contentRef}
        focusOnOpen={false}
        restoreFocus={false}
        preventClose={false}
        noInnerSpace
        noMaxWidth
        hideOutline
        hideCloseButton
        disableFocusTrap
        onMouseEnter={handleOverlayMouseEnter}
        onMouseLeave={handleOverlayMouseLeave}
        role="tooltip"
        {...(restAttributes as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Popover>

      <AriaLive element="span" priority="low">
        {overlayOpen ? children : null}
      </AriaLive>

      {componentWrapper}
    </>
  )
}

export default TooltipWithEvents
