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
import Button, { ButtonProps } from '../button/Button'
import Tooltip from '../tooltip/Tooltip'
import type { TooltipAllProps } from '../tooltip/types'
import useId from '../../shared/helpers/useId'
import useTranslation from '../../shared/useTranslation'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { getRefElement } from '../tooltip/TooltipHelpers'

export type PopoverTriggerRenderProps =
  React.HTMLAttributes<HTMLElement> & {
    ref: React.RefCallback<HTMLElement>
    active: boolean
    open: () => void
    close: () => void
    toggle: (next?: boolean) => void
  }

export type PopoverContentRenderProps = {
  active: boolean
  open: () => void
  close: () => void
  toggle: (next?: boolean) => void
  id: string
}

export type PopoverRenderable<T> =
  | React.ReactNode
  | ((context: T) => React.ReactNode)

type TooltipPropsForPopover = Omit<
  TooltipAllProps,
  'children' | 'active' | 'content' | 'title'
>

type TriggerAttributes = React.HTMLAttributes<HTMLElement> & {
  ref?: React.MutableRefObject<HTMLElement> & React.Ref<HTMLElement>
}

export type PopoverProps = TooltipPropsForPopover & {
  children?: PopoverRenderable<PopoverContentRenderProps>
  content?: PopoverRenderable<PopoverContentRenderProps>
  trigger?: PopoverRenderable<PopoverTriggerRenderProps>
  triggerAttributes?: TriggerAttributes
  triggerClassName?: string
  position?: TooltipAllProps['position']
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  focusOnOpen?: boolean
  restoreFocus?: boolean
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
  hideCloseButton?: boolean
  closeButtonProps?: Partial<ButtonProps>
  contentClassName?: string
  title?: React.ReactNode
}

export default function Popover(props: PopoverProps) {
  const {
    children,
    content,
    trigger,
    triggerAttributes,
    triggerClassName,
    title,
    position = 'bottom',
    open: controlledOpenProp,
    defaultOpen: defaultOpenProp = false,
    onOpenChange,
    focusOnOpen = true,
    restoreFocus = true,
    closeOnOutsideClick = true,
    showCloseButton = true,
    hideCloseButton = false,
    closeButtonProps,
    contentClassName,
    className,
    targetElement: externalTargetElement,
    targetSelector,
    portalRootClass,
    showDelay: showDelayProp,
    hideDelay: hideDelayProp,
    contentRef: externalContentRef,
    ...tooltipRest
  } = props

  const spacingClasses = createSpacingClasses(props)
  const tr = useTranslation().Popover

  const { isOpen, setOpenState } = usePopoverOpenState({
    open: controlledOpenProp,
    defaultOpen: defaultOpenProp,
    onOpenChange,
  })

  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const contentWrapperRef = useRef<HTMLSpanElement>(null)

  const tooltipId = useId(tooltipRest.id)
  const descriptionId = `${tooltipId}-description`

  const showDelay = showDelayProp ?? 0
  const hideDelay = hideDelayProp ?? 0

  const shouldRenderTrigger =
    !externalTargetElement && typeof targetSelector !== 'string'

  const getCurrentTriggerElement = useCallback(() => {
    if (shouldRenderTrigger) {
      return triggerRef.current
    }
    if (externalTargetElement) {
      if (externalTargetElement instanceof HTMLElement) {
        return externalTargetElement
      }
      if (
        typeof externalTargetElement === 'object' &&
        'current' in externalTargetElement
      ) {
        return getRefElement(
          externalTargetElement as React.RefObject<HTMLElement>
        )
      }
    }
    if (
      typeof targetSelector === 'string' &&
      typeof document !== 'undefined'
    ) {
      return document.querySelector(targetSelector)
    }
    return null
  }, [externalTargetElement, shouldRenderTrigger, targetSelector])

  const focusTrigger = useCallback(() => {
    if (!restoreFocus) {
      return
    }
    const element = getCurrentTriggerElement()
    element?.focus({ preventScroll: true })
  }, [getCurrentTriggerElement, restoreFocus])

  const close = useCallback(() => {
    setOpenState(false)
    focusTrigger()
  }, [focusTrigger, setOpenState])

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
      return undefined
    }

    const timeout = setTimeout(() => {
      const wrapper =
        contentWrapperRef.current ||
        (tooltipRef.current?.querySelector(
          '.dnb-popover__content'
        ) as HTMLElement | null)
      wrapper?.focus({ preventScroll: true })
    }, 10) // Wait until the Popover is rendered

    return () => clearTimeout(timeout)
  }, [focusOnOpen, isOpen])

  const handleDocumentInteraction = useCallback(
    (event: MouseEvent | TouchEvent | KeyboardEvent) => {
      if (!closeOnOutsideClick) {
        return
      }
      if (!(event.target instanceof Node)) {
        return
      }

      const insideContent =
        !!tooltipRef.current && tooltipRef.current.contains(event.target)
      const triggerElement = getCurrentTriggerElement()
      const insideTrigger =
        !!triggerElement && triggerElement.contains(event.target as Node)

      if (!insideContent && !insideTrigger) {
        toggle(false)
      }
    },
    [closeOnOutsideClick, getCurrentTriggerElement, toggle]
  )

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    document.documentElement.addEventListener(
      'mousedown',
      handleDocumentInteraction
    )
    document.documentElement.addEventListener(
      'touchstart',
      handleDocumentInteraction,
      { passive: true }
    )
    document.documentElement.addEventListener(
      'keyup',
      handleDocumentInteraction
    )

    return () => {
      document.documentElement.removeEventListener(
        'mousedown',
        handleDocumentInteraction
      )
      document.documentElement.removeEventListener(
        'touchstart',
        handleDocumentInteraction
      )
      document.documentElement.removeEventListener(
        'keyup',
        handleDocumentInteraction
      )
    }
  }, [handleDocumentInteraction, isOpen])

  const handleContentKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (event.defaultPrevented) {
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation() // To make Modal/Dialog/Drawer not close as well
        toggle(false)
      }
    },
    [toggle]
  )

  const handleTriggerKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLElement>,
      userHandler?: React.KeyboardEventHandler<HTMLElement>
    ) => {
      userHandler?.(event)
      if (event.defaultPrevented) {
        return
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
      spacingClasses,
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

  const closeButton = !hideCloseButton && showCloseButton && (
    <Button
      type="button"
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

  const tooltipTarget =
    externalTargetElement || (hasInternalTrigger ? triggerRef : undefined)

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
      <Tooltip
        {...tooltipRest}
        id={tooltipId}
        contentRef={externalContentRef || tooltipRef}
        portalRootClass={classnames(
          'dnb-popover__portal',
          portalRootClass
        )}
        showDelay={showDelay}
        hideDelay={hideDelay}
        targetSelector={targetSelector}
        targetElement={tooltipTarget}
        position={position}
        active={isOpen}
        omitDescribedBy
        className={classnames('dnb-popover', className)}
      >
        <span
          className={classnames(
            'dnb-popover__content',
            'dnb-no-focus',
            contentClassName
          )}
          tabIndex={-1}
          ref={contentWrapperRef}
          {...{ onKeyDown: handleContentKeyDown }}
        >
          {title && (
            <span className="dnb-popover__title">
              <strong className="dnb-h--basis">{title}</strong>
            </span>
          )}
          <span className="dnb-popover__body">{userContent}</span>
        </span>
        {closeButton}

        {/* When screen reader focus reaches this button,
        close the popover and set focus back to the trigger. */}
        <button className="dnb-sr-only" onFocus={close}>
          Focus trap
        </button>
      </Tooltip>
    </>
  )
}

type UsePopoverOpenStateProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function usePopoverOpenState({
  open,
  defaultOpen,
  onOpenChange,
}: UsePopoverOpenStateProps) {
  const isControlled = typeof open === 'boolean'
  const [internalOpen, setInternalOpen] = useState(() => {
    if (typeof defaultOpen === 'boolean') {
      return defaultOpen
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

Popover._supportsSpacingProps = true
