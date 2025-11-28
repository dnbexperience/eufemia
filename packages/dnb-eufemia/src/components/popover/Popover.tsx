/**
 * Web Popover Component
 */

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import Button from '../button/Button'
import useId from '../../shared/helpers/useId'
import useTranslation from '../../shared/useTranslation'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import PopoverPortal from './PopoverPortal'
import PopoverContainer from './PopoverContainer'
import type {
  PopoverProps,
  PopoverTriggerRenderProps,
  PopoverContentRenderProps,
  PopoverRenderable,
  TriggerAttributes,
  PopoverResolvedTargetElement,
  PopoverTargetElementObject,
} from './types'
export type * from './types'

export default function Popover(props: PopoverProps) {
  const {
    children,
    content,
    trigger,
    triggerAttributes,
    triggerClassName,
    title,
    placement = 'bottom',
    open: controlledOpenProp,
    openInitially: openInitiallyProp = false,
    onOpenChange,
    focusOnOpen = true,
    focusOnOpenElement,
    restoreFocus = true,
    preventClose = false,
    hideCloseButton = false,
    closeButtonProps,
    contentClassName,
    className,
    baseClassName,
    theme = 'light',
    disableFocusTrap = false,
    hideOutline = false,
    noInnerSpace = false,
    noMaxWidth = false,
    keepInDOM = false,
    triggerOffset,
    targetElement: externalTargetElement,
    targetSelector,
    portalRootClass,
    showDelay: showDelayProp,
    hideDelay: hideDelayProp,
    contentRef: externalContentRef,
    alignOnTarget = 'center',
    horizontalOffset,
    autoAlignMode = 'initial',
    arrowPosition = 'center',
    arrowPositionSelector,
    hideArrow = false,
    skipPortal = false,
    noAnimation = false,
    fixedPosition = false,
    arrowEdgeOffset,
    id: idProp,
    omitDescribedBy,
    ...restAttributes
  } = props

  const baseClassNames = useMemo(() => {
    const names = ['dnb-popover']
    if (baseClassName && baseClassName !== 'dnb-popover') {
      names.push(baseClassName)
    }
    return names
  }, [baseClassName])
  const tr = useTranslation().Popover

  const { isOpen, setOpenState } = usePopoverOpenState({
    open: controlledOpenProp,
    openInitially: openInitiallyProp,
    onOpenChange,
  })

  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const contentWrapperRef = useRef<HTMLSpanElement>(null)
  const previousTargetElementRef =
    useRef<PopoverResolvedTargetElement>(null)
  const focusRestoreAnimationRef = useRef<number>(null)
  const touchStartTargetRef = useRef<EventTarget>(null)
  const touchMovedRef = useRef(false)

  const tooltipId = useId(idProp)
  const descriptionId = `${tooltipId}-description`

  const showDelay = showDelayProp ?? 0
  const hideDelay = hideDelayProp ?? 0

  const hasExplicitTargetElement = Object.prototype.hasOwnProperty.call(
    props,
    'targetElement'
  )

  const shouldRenderTrigger =
    !hasExplicitTargetElement && typeof targetSelector !== 'string'

  const getCurrentTriggerElement = useCallback(() => {
    if (shouldRenderTrigger) {
      return triggerRef.current
    }
    if (isPopoverTargetElementObject(externalTargetElement)) {
      return (
        resolveTargetNode(externalTargetElement.verticalRef) ||
        resolveTargetNode(externalTargetElement.horizontalRef)
      )
    }
    if (externalTargetElement) {
      return resolveTargetNode(externalTargetElement)
    }
    if (
      typeof targetSelector === 'string' &&
      typeof document !== 'undefined'
    ) {
      return document.querySelector(targetSelector) as HTMLElement
    }
    return null
  }, [externalTargetElement, shouldRenderTrigger, targetSelector])

  const [targetElement, setTargetElement] =
    useState<PopoverResolvedTargetElement>(null)

  const resolveTargetElementForContainer = useCallback(() => {
    if (isPopoverTargetElementObject(externalTargetElement)) {
      const horizontalRef = resolveTargetNode(
        externalTargetElement.horizontalRef
      )
      const verticalRef = resolveTargetNode(
        externalTargetElement.verticalRef
      )

      return {
        horizontalRef,
        verticalRef,
      }
    }

    if (externalTargetElement) {
      return resolveTargetNode(externalTargetElement)
    }

    if (
      typeof targetSelector === 'string' &&
      typeof document !== 'undefined'
    ) {
      return document.querySelector(targetSelector) as HTMLElement
    }

    if (shouldRenderTrigger) {
      return triggerRef.current
    }

    return null
  }, [externalTargetElement, shouldRenderTrigger, targetSelector])

  useEffect(() => {
    const resolved = resolveTargetElementForContainer()
    const hadPreviousTarget = previousTargetElementRef.current !== null
    const hadValidPreviousTarget =
      hadPreviousTarget &&
      (previousTargetElementRef.current instanceof HTMLElement ||
        (typeof previousTargetElementRef.current === 'object' &&
          previousTargetElementRef.current !== null &&
          ('horizontalRef' in previousTargetElementRef.current ||
            'verticalRef' in previousTargetElementRef.current)))

    previousTargetElementRef.current = resolved
    setTargetElement(resolved)

    // Close if target becomes null after being set (not if it was initially null)
    if (!resolved && isOpen && hadValidPreviousTarget) {
      setOpenState(false)
    }
  }, [resolveTargetElementForContainer, isOpen, setOpenState])

  const resolveFocusTarget = useCallback(() => {
    if (!focusOnOpenElement) {
      return null
    }

    return typeof focusOnOpenElement === 'function'
      ? focusOnOpenElement()
      : focusOnOpenElement
  }, [focusOnOpenElement])

  const focusTrigger = useCallback(() => {
    if (!restoreFocus) {
      return
    }
    const element = getCurrentTriggerElement()
    if (!element) {
      return
    }

    if (focusRestoreAnimationRef.current !== null) {
      cancelAnimationFrame(focusRestoreAnimationRef.current)
    }

    focusRestoreAnimationRef.current = requestAnimationFrame(() => {
      element.focus({ preventScroll: true })
      focusRestoreAnimationRef.current = null
    })
  }, [getCurrentTriggerElement, restoreFocus])

  useEffect(() => {
    return () => {
      if (focusRestoreAnimationRef.current !== null) {
        cancelAnimationFrame(focusRestoreAnimationRef.current)
      }
    }
  }, [])

  const close = useCallback(() => {
    if (preventClose) {
      return // stop here
    }
    setOpenState(false)
    focusTrigger()
  }, [focusTrigger, setOpenState, preventClose])

  const openPopover = useCallback(() => {
    setOpenState(true)
  }, [setOpenState])

  const toggle = useCallback(
    (next?: boolean) => {
      const value = typeof next === 'boolean' ? next : !isOpen
      if (value) {
        openPopover()
      } else {
        close()
      }
    },
    [close, isOpen, openPopover]
  )

  const runTriggerClick = useCallback(
    (event?: MouseEvent | React.MouseEvent<HTMLElement>) => {
      if (event && 'preventDefault' in event) {
        event.preventDefault()
      }
      toggle()
    },
    [toggle]
  )

  useEffect(() => {
    if (!focusOnOpen || !isOpen) {
      return // stop here
    }

    const timers: Array<ReturnType<typeof setTimeout>> = []

    const focusContent = () => {
      const focusTarget =
        resolveFocusTarget() ||
        contentWrapperRef.current ||
        tooltipRef.current?.querySelector('.dnb-popover__content')

      setTimeout(() => {
        focusTarget?.focus({ preventScroll: true })
      }, 1) // Ensure focus happens after any potential rendering
      return Boolean(focusTarget)
    }

    const scheduleFocusAttempt = (delay: number, retries: number) => {
      timers.push(
        setTimeout(() => {
          if (!focusContent() && retries > 0) {
            scheduleFocusAttempt(delay, retries - 1)
          }
        }, delay)
      )
    }

    if (!focusContent()) {
      scheduleFocusAttempt(10, 3) // Wait until the Popover is rendered
    }

    return () => timers.forEach(clearTimeout)
  }, [focusOnOpen, isOpen, resolveFocusTarget])

  const handleDocumentInteraction = useCallback(
    (
      event: MouseEvent | TouchEvent | KeyboardEvent,
      overrideTarget?: EventTarget | null
    ) => {
      if (preventClose) {
        return // stop here
      }
      const target = overrideTarget ?? event.target
      if (!(target instanceof Node)) {
        return // stop here
      }

      const insideContent =
        !!tooltipRef.current && tooltipRef.current.contains(target)
      const triggerElement = getCurrentTriggerElement()
      const insideTrigger =
        !!triggerElement && triggerElement.contains(target as Node)

      if (!insideContent && !insideTrigger) {
        toggle(false)
      }
    },
    [preventClose, getCurrentTriggerElement, toggle]
  )

  const handleDocumentTouchStart = useCallback((event: TouchEvent) => {
    touchMovedRef.current = false
    touchStartTargetRef.current = event.target
  }, [])

  const handleDocumentTouchMove = useCallback(() => {
    touchMovedRef.current = true
  }, [])

  const handleDocumentTouchEnd = useCallback(
    (event: TouchEvent) => {
      const target = touchStartTargetRef.current
      const moved = touchMovedRef.current
      touchMovedRef.current = false
      touchStartTargetRef.current = null

      if (moved) {
        return // stop here
      }

      handleDocumentInteraction(event, target)
    },
    [handleDocumentInteraction]
  )

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.defaultPrevented || preventClose) {
        return // stop here
      }
      if (event.key === 'Escape') {
        // Check both event.target and document.activeElement to handle different event propagation scenarios
        const target = (event.target ||
          document.activeElement) as HTMLElement
        const triggerElement = getCurrentTriggerElement()
        const insideTrigger = triggerElement?.contains(target)
        const insideContent = tooltipRef.current?.contains(target)

        if (insideContent || insideTrigger) {
          event.preventDefault()
          event.stopPropagation() // Prevent Modal/Dialog/Drawer handlers from running
          event.stopImmediatePropagation?.() // Prevent Modal/Dialog/Drawer handlers from running
          toggle(false)
        }
      }
    },
    [preventClose, getCurrentTriggerElement, toggle]
  )

  useEffect(() => {
    if (!isOpen) {
      return // stop here
    }

    document.documentElement.addEventListener(
      'mousedown',
      handleDocumentInteraction
    )
    document.documentElement.addEventListener(
      'touchstart',
      handleDocumentTouchStart,
      { passive: true }
    )
    document.documentElement.addEventListener(
      'touchmove',
      handleDocumentTouchMove,
      { passive: true }
    )
    document.documentElement.addEventListener(
      'touchend',
      handleDocumentTouchEnd,
      { passive: true }
    )
    document.documentElement.addEventListener(
      'keyup',
      handleDocumentInteraction
    )
    // Use capture phase (true) to ensure we handle Escape before Modal/Dialog handlers
    document.addEventListener('keydown', handleDocumentKeyDown, true)

    return () => {
      document.documentElement.removeEventListener(
        'mousedown',
        handleDocumentInteraction
      )
      document.documentElement.removeEventListener(
        'touchstart',
        handleDocumentTouchStart
      )
      document.documentElement.removeEventListener(
        'touchmove',
        handleDocumentTouchMove
      )
      document.documentElement.removeEventListener(
        'touchend',
        handleDocumentTouchEnd
      )
      document.documentElement.removeEventListener(
        'keyup',
        handleDocumentInteraction
      )
      document.removeEventListener('keydown', handleDocumentKeyDown, true)
    }
  }, [
    handleDocumentInteraction,
    handleDocumentKeyDown,
    handleDocumentTouchEnd,
    handleDocumentTouchMove,
    handleDocumentTouchStart,
    isOpen,
  ])

  const handleTriggerKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLElement>,
      userHandler?: React.KeyboardEventHandler<HTMLElement>
    ) => {
      userHandler?.(event)
      if (event.defaultPrevented) {
        return // stop here
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        toggle()
      }
    },
    [toggle]
  )

  const mergedTriggerAttributes: TriggerAttributes =
    triggerAttributes || {}
  const {
    onClick: triggerOnClick,
    onKeyDown: triggerOnKeyDown,
    className: triggerAttrClassName,
    ref: triggerAttrRef,
    role: triggerAttrRole,
    tabIndex: triggerAttrTabIndex,
    title: triggerAttrTitle,
    ['aria-describedby']: triggerAttrDescribedBy,
    ...restTriggerAttrs
  } = mergedTriggerAttributes

  const assignTriggerRef = useCallback(
    (node: HTMLElement | null) => {
      triggerRef.current = node
      if (!triggerAttrRef) {
        return
      }
      if (typeof triggerAttrRef === 'function') {
        triggerAttrRef(node)
      } else if ('current' in triggerAttrRef) {
        triggerAttrRef.current = node
      }
    },
    [triggerAttrRef]
  )

  const statefulTitle = isOpen ? tr.closeTriggerTitle : tr.openTriggerTitle

  const triggerDomProps: React.HTMLAttributes<HTMLElement> & {
    ref: React.RefCallback<HTMLElement>
  } = {
    ...restTriggerAttrs,
    ref: assignTriggerRef,
    className: classnames(
      'dnb-popover__trigger',
      triggerAttrClassName,
      triggerClassName
    ),
    title: triggerAttrTitle || statefulTitle,
    role: triggerAttrRole || 'button',
    tabIndex:
      typeof triggerAttrTabIndex === 'number' ? triggerAttrTabIndex : 0,
    'aria-controls': tooltipId,
    'aria-expanded': isOpen,
    'aria-describedby': mergeDescribedBy(
      triggerAttrDescribedBy,
      descriptionId
    ),
    onClick: (event) => {
      triggerOnClick?.(event)
      if (event.defaultPrevented) {
        return
      }
      runTriggerClick(event)
    },
    onKeyDown: (event) => handleTriggerKeyDown(event, triggerOnKeyDown),
  }

  const triggerRenderProps = {
    ...triggerDomProps,
  } as PopoverTriggerRenderProps

  Object.defineProperties(triggerRenderProps, {
    active: { value: isOpen, enumerable: false },
    open: { value: openPopover, enumerable: false },
    close: { value: close, enumerable: false },
    toggle: { value: toggle, enumerable: false },
  })

  let triggerMarkup: React.ReactNode = null
  if (shouldRenderTrigger) {
    if (isRenderer(trigger)) {
      triggerMarkup = trigger(triggerRenderProps)
    } else if (isValidElement(trigger)) {
      triggerMarkup = cloneElement(trigger, triggerDomProps)
    } else if (trigger) {
      warn(
        'Popover: `trigger` must be a valid React element or render function when not using targetElement/targetSelector.'
      )
    } else {
      warn(
        'Popover: please provide a `trigger` prop or point to an existing element using `targetElement` / `targetSelector`.'
      )
    }
  }

  const hasInternalTrigger = shouldRenderTrigger && Boolean(triggerMarkup)

  const contentContext = useMemo<PopoverContentRenderProps>(
    () => ({
      active: isOpen,
      open: openPopover,
      close,
      toggle,
      id: tooltipId,
    }),
    [close, isOpen, openPopover, toggle, tooltipId]
  )

  const userContent = useMemo(() => {
    const source = typeof content !== 'undefined' ? content : children
    if (isRenderer(source)) {
      return source(contentContext)
    }
    return source
  }, [children, content, contentContext])

  const closeButton = !hideCloseButton && (
    <Button
      variant={closeButtonProps?.variant ?? 'tertiary'}
      icon={closeButtonProps?.icon ?? 'close'}
      {...closeButtonProps}
      className={classnames(
        'dnb-popover__close',
        closeButtonProps?.className
      )}
      title={closeButtonProps?.title || tr.closeButtonTitle}
      onClick={(event) => {
        closeButtonProps?.onClick?.(event)
        if (event?.defaultPrevented) {
          return
        }
        toggle(false)
      }}
    />
  )

  const popoverClassName = classnames(
    baseClassNames,
    theme && baseClassNames.map((name) => `${name}--theme-${theme}`),
    !hideOutline && baseClassNames.map((name) => `${name}--show-outline`),
    noInnerSpace &&
      baseClassNames.map((name) => `${name}--no-inner-space`),
    noMaxWidth && baseClassNames.map((name) => `${name}--no-max-width`),
    className
  )

  const popoverAttributes: React.HTMLAttributes<HTMLElement> = {
    ...(restAttributes as React.HTMLAttributes<HTMLElement>),
    className: popoverClassName,
  }

  const contentRef = externalContentRef || tooltipRef

  const overlayContent = (
    <>
      {!disableFocusTrap && (
        <button className="dnb-sr-only" aria-hidden onFocus={close}>
          Focus trap
        </button>
      )}

      <span
        className={classnames(
          'dnb-popover__content',
          'dnb-no-focus',
          contentClassName
        )}
        id={tooltipId}
        tabIndex={-1}
        ref={contentWrapperRef}
      >
        {title && (
          <span className={'dnb-popover__title'}>
            <strong className="dnb-h--basis">{title}</strong>
          </span>
        )}
        <span className={'dnb-popover__body'}>{userContent}</span>
      </span>

      {closeButton}

      {!disableFocusTrap && (
        <button className="dnb-sr-only" aria-hidden onFocus={close}>
          Focus trap
        </button>
      )}
    </>
  )

  if (targetElement === null) {
    return triggerMarkup
  }

  return (
    <>
      {triggerMarkup}
      {hasInternalTrigger && (
        <span
          className="dnb-sr-only"
          aria-hidden="true"
          id={descriptionId}
        >
          {statefulTitle}
        </span>
      )}
      {skipPortal ? (
        <PopoverContainer
          baseClassNames={baseClassNames}
          active={isOpen}
          showDelay={showDelay}
          attributes={popoverAttributes}
          targetElement={targetElement}
          hideDelay={hideDelay}
          keepInDOM={keepInDOM}
          autoAlignMode={autoAlignMode}
          noAnimation={noAnimation}
          arrowPosition={arrowPosition}
          placement={placement}
          alignOnTarget={alignOnTarget}
          horizontalOffset={horizontalOffset}
          arrowPositionSelector={arrowPositionSelector}
          fixedPosition={fixedPosition}
          skipPortal
          omitDescribedBy={omitDescribedBy}
          contentRef={contentRef}
          triggerOffset={triggerOffset}
          hideArrow={hideArrow}
          arrowEdgeOffset={arrowEdgeOffset}
        >
          {overlayContent}
        </PopoverContainer>
      ) : (
        <PopoverPortal
          baseClassNames={baseClassNames}
          active={isOpen}
          targetElement={targetElement}
          showDelay={showDelay}
          hideDelay={hideDelay}
          keepInDOM={keepInDOM}
          autoAlignMode={autoAlignMode}
          noAnimation={noAnimation}
          portalRootClass={portalRootClass}
          arrowPosition={arrowPosition}
          placement={placement}
          alignOnTarget={alignOnTarget}
          horizontalOffset={horizontalOffset}
          arrowPositionSelector={arrowPositionSelector}
          fixedPosition={fixedPosition}
          omitDescribedBy={omitDescribedBy}
          attributes={popoverAttributes}
          contentRef={contentRef}
          triggerOffset={triggerOffset}
          hideArrow={hideArrow}
          arrowEdgeOffset={arrowEdgeOffset}
        >
          {overlayContent}
        </PopoverPortal>
      )}
    </>
  )
}

type UsePopoverOpenStateProps = {
  open?: boolean
  openInitially?: boolean
  onOpenChange?: (open: boolean) => void
}

function usePopoverOpenState({
  open,
  openInitially,
  onOpenChange,
}: UsePopoverOpenStateProps) {
  const isControlled = typeof open === 'boolean'
  const [internalOpen, setInternalOpen] = useState(() => {
    if (typeof openInitially === 'boolean') {
      return openInitially
    }
    return false
  })

  const isOpen = isControlled ? (open as boolean) : internalOpen

  const setOpenState = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return { isOpen, setOpenState }
}

function isRenderer<T>(
  value: PopoverRenderable<T>
): value is (context: T) => React.ReactNode {
  return typeof value === 'function'
}

function mergeDescribedBy(
  existing: string | undefined,
  next: string
): string | undefined {
  return combineDescribedBy({ 'aria-describedby': existing }, next)
}

function isPopoverTargetElementObject(
  target: PopoverProps['targetElement']
): target is PopoverTargetElementObject {
  return (
    Boolean(target) &&
    typeof target === 'object' &&
    !('getBoundingClientRect' in target) &&
    ('verticalRef' in target || 'horizontalRef' in target)
  )
}

function resolveTargetNode(
  target?: PopoverProps['targetElement']
): HTMLElement | null {
  if (!target || isPopoverTargetElementObject(target)) {
    return null
  }
  if (target instanceof HTMLElement) {
    return target
  }
  if (typeof target === 'object' && 'current' in target) {
    return getRefElement(target as React.RefObject<HTMLElement>)
  }
  return null
}

export function getRefElement(
  target: PopoverProps['targetElement']
): HTMLElement | null {
  if (!target) {
    return null
  }
  const unknownTarget = target as unknown as React.RefObject<{
    _ref: React.RefObject<HTMLElement>
  }>
  let element: HTMLElement | React.RefObject<HTMLElement> | null =
    target as HTMLElement | React.RefObject<HTMLElement>

  // "_ref" is set inside e.g. the Button component (among many others)
  if (unknownTarget?.current?._ref) {
    element = getRefElement(unknownTarget.current._ref)
  }

  if (
    element &&
    Object.prototype.hasOwnProperty.call(element, 'current')
  ) {
    element = (element as React.RefObject<HTMLElement>).current
  }

  return element as HTMLElement | null
}

Popover._supportsSpacingProps = true
