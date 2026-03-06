/**
 * Web Modal Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import clsx from 'clsx'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from './bodyScrollLock'
import useId from '../../shared/helpers/useId'
import {
  warn,
  InteractionInvalidation,
  combineLabelledBy,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import ModalContext from './ModalContext'
import { IS_IOS, IS_SAFARI, IS_MAC, isAndroid } from '../../shared/helpers'
import type {
  ModalCloseHandlerParams,
  ModalContentProps,
  ModalTriggeredBy,
} from './types'
import {
  getListOfModalRoots,
  getModalRoot,
  addToIndex,
  removeFromIndex,
} from './helpers'
import { getThemeClasses } from '../../shared/Theme'
import { Context } from '../../shared'
import type { ContextProps } from '../../shared/Context'


declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __modalStack: any[]
  }
}

type CSSPropertiesWithVars = {
  '--modal-background-color': string
} & React.CSSProperties

export default function ModalContent(props: ModalContentProps) {
  const {
    hide,
    title,
    labelledBy,
    id: idProp,
    closeTitle = 'Lukk',
    dialogTitle = 'Vindu',
    hideCloseButton = false,
    closeButtonAttributes,
    noAnimation = false,
    noAnimationOnMobile = false,
    fullscreen = 'auto',
    containerPlacement = 'right',
    verticalAlignment = 'center',
    close,
    contentClass,
    overlayClass,
    contentId: contentIdProp,
    children,
    dialogRole = null,
    focusSelector = null,
    animationDuration = null,
    preventOverlayClose,
    open,
    contentRef: contentRefProp,
    scrollRef: scrollRefProp,
    modalContentCloseRef,
    bypassInvalidationSelectors,
    ...rest
  } = props

  const context = useContext(Context)
  const [color, setColor] = useState<string | null>(null)

  const internalContentRef = useRef<HTMLElement>(null)
  const contentRef = contentRefProp || internalContentRef
  const internalScrollRef = useRef<HTMLElement>(null)
  const scrollRef = scrollRefProp || internalScrollRef
  const overlayClickRef = useRef<HTMLElement | null>(null)
  const lockTimeoutRef = useRef<NodeJS.Timeout>(null)
  const focusTimeoutRef = useRef<NodeJS.Timeout>(null)
  const androidFocusTimeoutRef = useRef<NodeJS.Timeout>(null)
  const iiRef = useRef<InteractionInvalidation>(null)
  const mountedRef = useRef(0)
  const lastFocusTimeRef = useRef(0)
  const triggeredByRef = useRef<ModalTriggeredBy>(undefined)
  const triggeredByEventRef = useRef<React.SyntheticEvent>(undefined)

  // Stable identity for the modal stack
  const selfRef = useRef<any>(null)
  if (!selfRef.current) {
    selfRef.current = {
      _id: idProp,
      _scrollRef: scrollRef,
      _contentRef: contentRef,
      _iiLocal: undefined,
    }
  }
  // Keep refs in sync
  selfRef.current._id = idProp
  selfRef.current._scrollRef = scrollRef
  selfRef.current._contentRef = contentRef

  const setModalContentState = useCallback(
    (event: React.SyntheticEvent, { triggeredBy }: ModalCloseHandlerParams) => {
      triggeredByRef.current = triggeredBy
      triggeredByEventRef.current = event
    },
    []
  )

  // Sync modalContentCloseRef
  useEffect(() => {
    if (modalContentCloseRef) {
      const mutableRef = modalContentCloseRef as React.RefObject<any>
      mutableRef.current = setModalContentState
    }
  }, [modalContentCloseRef, setModalContentState])

  const usedContentId = useId(contentIdProp)

  const wasOpenedManually = useCallback(() => {
    if (triggeredByRef.current) {
      return true
    }

    if (typeof open === 'boolean') {
      if (process.env.NODE_ENV !== 'test') {
        const delay = Date.now() - mountedRef.current
        return delay > 30
      }

      return true
    }

    return false
  }, [open])

  const removeScrollPossibility = useCallback(() => {
    if (scrollRef.current) {
      disableBodyScroll(scrollRef.current)
    }
  }, [scrollRef])

  const revertScrollPossibility = useCallback(() => {
    enableBodyScroll(scrollRef.current)
    clearAllBodyScrollLocks()
  }, [scrollRef])

  const setFocus = useCallback(() => {
    const elem = contentRef.current
    const timeoutDuration: number =
      typeof animationDuration === 'string'
        ? parseFloat(animationDuration)
        : animationDuration

    if (elem) {
      if (
        lastFocusTimeRef.current &&
        Date.now() - lastFocusTimeRef.current > 2000
      ) {
        return // stop here
      }
      lastFocusTimeRef.current = Date.now()

      clearTimeout(focusTimeoutRef.current)
      focusTimeoutRef.current = setTimeout(
        () => {
          try {
            let focusElement = elem as HTMLElement

            const headerElem = elem.querySelector(
              '.dnb-drawer__header, .dnb-dialog__header'
            )
            const firstHeading = (headerElem?.querySelector(
              'h1, h2, h3'
            ) || elem.querySelector('h1, h2, h3')) as HTMLElement

            if (firstHeading) {
              if (firstHeading.tagName !== 'H1') {
                warn('A Dialog or Drawer needs a h1 as its first element!')
              }

              firstHeading.setAttribute('tabIndex', '-1')
              firstHeading.classList.add('dnb-no-focus')

              focusElement = firstHeading
            } else {
              const focusHelper = elem.querySelector(
                '.dnb-modal__close-button, .dnb-modal__focus-helper'
              ) as HTMLElement
              focusElement = focusHelper
            }

            if (typeof focusSelector === 'string') {
              focusElement = elem.querySelector(focusSelector)
            }

            if (focusElement !== document.activeElement) {
              focusElement?.focus({ preventScroll: true })
            }
          } catch (e) {
            warn(e)
          }
        },
        noAnimation ? 0 : timeoutDuration || 0
      )
    }
  }, [contentRef, animationDuration, focusSelector, noAnimation])

  const androidFocusHelper = useCallback(() => {
    const timeoutDuration: number =
      typeof animationDuration === 'string'
        ? parseFloat(animationDuration)
        : animationDuration

    clearTimeout(androidFocusTimeoutRef.current)
    androidFocusTimeoutRef.current = setTimeout(() => {
      try {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          document.activeElement.scrollIntoView()
        }
      } catch (e) {
        //
      }
    }, timeoutDuration / 2)
  }, [animationDuration])

  const closeModalContent = useCallback(
    (
      event: React.SyntheticEvent,
      {
        triggeredBy,
        ...params
      }: ModalCloseHandlerParams & { ifIsLatest?: boolean }
    ) => {
      event?.persist?.()

      close(event, {
        triggeredBy,
        ...params,
      })
    },
    [close]
  )

  const onCloseClickHandler = useCallback(
    (event: React.SyntheticEvent) => {
      closeModalContent(event, { triggeredBy: 'button' })
    },
    [closeModalContent]
  )

  const onContentMouseDownHandler = useCallback(
    (event: React.SyntheticEvent) => {
      overlayClickRef.current =
        event.target === event.currentTarget
          ? (event.target as HTMLElement)
          : null
    },
    []
  )

  const onContentClickHandler = useCallback(
    (event: React.SyntheticEvent) => {
      if (overlayClickRef.current !== event.target) {
        return // stop here
      }
      overlayClickRef.current = null

      if (!preventOverlayClose) {
        closeModalContent(event, {
          triggeredBy: 'overlay',
          ifIsLatest: false,
        })
      }
    },
    [preventOverlayClose, closeModalContent]
  )

  const onKeyDownHandlerRef = useRef<(event: KeyboardEvent) => void>(null)
  onKeyDownHandlerRef.current = (event) => {
    if (event.key === 'Escape') {
      const mostCurrent = getModalRoot(-1)

      if (mostCurrent === selfRef.current) {
        event.preventDefault()
        closeModalContent(event as unknown as React.SyntheticEvent, {
          triggeredBy: 'keyboard',
        })
      }
    }
  }

  // Stable function reference for addEventListener/removeEventListener
  // so removal always matches the registered listener.
  const stableOnKeyDownHandler = useCallback((event: KeyboardEvent) => {
    onKeyDownHandlerRef.current?.(event)
  }, [])

  const preventClick = useCallback((event) => {
    if (event) {
      event.stopPropagation()
    }
  }, [])

  const lockBody = useCallback(() => {
    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    if (firstLevel === selfRef.current) {
      const contentElement =
        contentRef.current || document.querySelector(`#${usedContentId}`)
      const parentElements = getParents(contentElement)

      const ii = new InteractionInvalidation()
      ii.setBypassElements(parentElements)
      ii.setBypassSelector(
        [
          '#eufemia-portal-root',
          '#eufemia-portal-root *',
          `#${usedContentId}`,
          `#${usedContentId} *`,
          '.dnb-modal--bypass-invalidation',
          '.dnb-modal--bypass-invalidation-deep *',
          ...(bypassInvalidationSelectors || []),
        ].filter(Boolean)
      )
      ii.activate()
      iiRef.current = ii
    } else {
      modalRoots.forEach((modal) => {
        if (
          modal !== selfRef.current &&
          typeof modal._iiLocal === 'undefined' &&
          typeof modal._scrollRef !== 'undefined'
        ) {
          modal._iiLocal = new InteractionInvalidation()
          modal._iiLocal.activate(modal._scrollRef.current)
        }
      })
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', stableOnKeyDownHandler)
    }
  }, [
    contentRef,
    usedContentId,
    bypassInvalidationSelectors,
    stableOnKeyDownHandler,
  ])

  const removeLocks = useCallback(() => {
    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    removeFromIndex(selfRef.current)

    if (firstLevel === selfRef.current) {
      iiRef.current?.revert()
      revertScrollPossibility()
    } else {
      try {
        const modal = modalRoots[modalRoots.length - 2]
        if (modal !== selfRef.current && modal._iiLocal) {
          modal._iiLocal.revert()
          delete modal._iiLocal
        }
      } catch (e) {
        warn(e)
      }
    }

    // Remove Android helper
    window.removeEventListener('resize', androidFocusHelper)
    clearTimeout(androidFocusTimeoutRef.current)

    if (wasOpenedManually()) {
      dispatchCustomElementEvent(props, 'onClose', {
        id: idProp,
        event: triggeredByEventRef.current,
        triggeredBy: triggeredByRef.current || 'unmount',
      })
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', stableOnKeyDownHandler)
    }
  }, [
    revertScrollPossibility,
    androidFocusHelper,
    wasOpenedManually,
    props,
    idProp,
    stableOnKeyDownHandler,
  ])

  // Keep latest removeLocks available for cleanup
  const removeLocksRef = useRef(removeLocks)
  removeLocksRef.current = removeLocks

  // Mount
  useMountEffect(() => {
    const timeoutDuration: number =
      typeof animationDuration === 'string'
        ? parseFloat(animationDuration)
        : animationDuration

    addToIndex(selfRef.current)

    removeScrollPossibility()
    setFocus()

    if (typeof window !== 'undefined' && isAndroid()) {
      window.addEventListener('resize', androidFocusHelper)
    }

    dispatchCustomElementEvent(props, 'onOpen', {
      id: idProp,
    })

    if (noAnimation || process.env.NODE_ENV === 'test') {
      lockBody()
    } else {
      lockTimeoutRef.current = setTimeout(lockBody, timeoutDuration * 1.2)
    }

    mountedRef.current = Date.now()

    return () => {
      clearTimeout(focusTimeoutRef.current)
      clearTimeout(lockTimeoutRef.current)
      removeLocksRef.current()
      mountedRef.current = 0
    }
  })

  // Re-focus when children change
  const prevChildrenRef = useRef(children)
  useEffect(() => {
    if (prevChildrenRef.current !== children) {
      prevChildrenRef.current = children
      setFocus()
    }
  }, [children, setFocus])

  const useDialogRole = !(IS_MAC || IS_SAFARI || IS_IOS)
  let role = dialogRole || 'dialog'
  if (!useDialogRole && role === 'dialog') {
    role = 'region'
  }

  const contentParams = {
    role,
    'aria-modal': useDialogRole ? true : undefined,
    'aria-labelledby': combineLabelledBy(
      props,
      title ? usedContentId + '-title' : null,
      labelledBy
    ),
    'aria-describedby': combineDescribedBy(
      props,
      usedContentId + '-content'
    ),
    'aria-label': !title && !labelledBy ? dialogTitle : undefined,
    className: clsx(
      'dnb-modal__content',
      fullscreen === true
        ? 'dnb-modal__content--fullscreen'
        : fullscreen === 'auto' && 'dnb-modal__content--auto-fullscreen',
      containerPlacement
        ? `dnb-modal__content--${containerPlacement || 'right'}`
        : null,
      `dnb-modal__vertical-alignment--${verticalAlignment}`,
      getThemeClasses(context?.theme),
      contentClass
    ),
    onMouseDown: onContentMouseDownHandler,
    onClick: onContentClickHandler,
  }

  const content =
    typeof children === 'function'
      ? children({ ...rest, close })
      : children

  return (
    <ModalContext
      value={{
        id: idProp,
        title,
        hideCloseButton,
        closeButtonAttributes,
        closeTitle,
        hide,
        setBackgroundColor: setColor,
        onCloseClickHandler,
        preventClick,
        onKeyDownHandler: stableOnKeyDownHandler,
        contentRef,
        scrollRef,
        contentId: usedContentId,
        close,
      }}
    >
      <div
        id={usedContentId}
        style={
          (color
            ? { '--modal-background-color': `var(--color-${color})` }
            : null) as CSSPropertiesWithVars
        }
        {...contentParams}
      >
        {content}
      </div>

      <span
        className={clsx(
          'dnb-modal__overlay',
          hide && 'dnb-modal__overlay--hide',
          noAnimation && 'dnb-modal__overlay--no-animation',
          noAnimationOnMobile &&
            'dnb-modal__overlay--no-animation-on-mobile',
          overlayClass
        )}
        aria-hidden={true}
      />
    </ModalContext>
  )
}

function getParents(elem?: HTMLElement | null) {
  if (!elem || typeof document === 'undefined') {
    return [] as HTMLElement[]
  }

  const parents: HTMLElement[] = []
  let current: HTMLElement | null = elem.parentElement

  while (current && current !== document.body) {
    parents.push(current)
    current = current.parentElement
  }

  return parents
}
