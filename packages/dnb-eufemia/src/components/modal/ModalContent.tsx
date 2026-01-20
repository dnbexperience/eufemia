/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from './bodyScrollLock'
import {
  warn,
  isTrue,
  makeUniqueId,
  InteractionInvalidation,
  combineLabelledBy,
  combineDescribedBy,
  dispatchCustomElementEvent,
  keycode,
} from '../../shared/component-helper'
import ModalContext from './ModalContext'
import { IS_IOS, IS_SAFARI, IS_MAC, isAndroid } from '../../shared/helpers'
import {
  CloseHandlerParams,
  ModalContentProps,
  TriggeredBy,
} from './types'
import {
  getListOfModalRoots,
  getModalRoot,
  addToIndex,
  removeFromIndex,
} from './helpers'
import { getThemeClasses } from '../../shared/Theme'
import { Context } from '../../shared'
import { ContextProps } from '../../shared/Context'

interface ModalContentState {
  color: string
}

declare global {
  interface Window {
    __modalStack: any[]
  }
}

interface CSSPropertiesWithVars extends React.CSSProperties {
  '--modal-background-color': string
}

export default class ModalContent extends React.PureComponent<
  ModalContentProps,
  ModalContentState
> {
  state = { color: null }

  _contentRef: React.RefObject<HTMLElement>
  _scrollRef: React.RefObject<HTMLElement>
  _overlayClickRef: { current: null | HTMLElement }
  _id: string
  _lockTimeout: NodeJS.Timeout
  _focusTimeout: NodeJS.Timeout
  _androidFocusTimeout: NodeJS.Timeout
  _ii: InteractionInvalidation
  _iiLocal: InteractionInvalidation
  _triggeredBy: TriggeredBy
  _triggeredByEvent: React.SyntheticEvent
  _mounted = 0
  _lastFocusTime = 0

  static contextType = Context

  context!: ContextProps

  constructor(props: ModalContentProps) {
    super(props)
    this._contentRef = this.props.contentRef || React.createRef()
    this._scrollRef = this.props.scrollRef || React.createRef()
    this._overlayClickRef = React.createRef()
    if (this.props.modalContentCloseRef) {
      this.props.modalContentCloseRef.current = this.setModalContentState
    }

    // NB: The ""._id" is used in the __modalStack as "last._id"
    this._id = props.id
  }

  componentDidUpdate(prevProps: ModalContentProps) {
    if (prevProps.children !== this.props.children) {
      this.setFocus()
    }
  }

  componentDidMount() {
    const {
      id = null,
      noAnimation = false,
      animationDuration = null,
    } = this.props

    const timeoutDuration: number =
      typeof animationDuration === 'string'
        ? parseFloat(animationDuration)
        : animationDuration

    // Add it to the index at first
    // we use it later with getListOfModalRoots
    addToIndex(this)

    // Because of nested modals/drawers, we run this regardless
    // has to be run at first – so the scrollbar gets removed
    this.removeScrollPossibility() // forces browser to re-paint

    this.setFocus()
    this.setAndroidFocusHelper()

    dispatchCustomElementEvent(this, 'onOpen', {
      id,
    })

    if (isTrue(noAnimation) || process.env.NODE_ENV === 'test') {
      this.lockBody() // forces browser to re-paint
    } else {
      this._lockTimeout = setTimeout(this.lockBody, timeoutDuration * 1.2) // a little over --modal-animation-duration
    }

    this._mounted = Date.now()
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimeout)
    clearTimeout(this._lockTimeout)
    this.removeLocks()
    this._mounted = 0
  }

  wasOpenedManually() {
    if (this._triggeredBy) {
      return true
    }

    const { open } = this.props
    if (typeof open === 'boolean') {
      if (process.env.NODE_ENV !== 'test') {
        const delay = Date.now() - this._mounted
        return delay > 30 // E.g. ReactStrict mode will cause a short delay.
      }

      return true
    }

    return false
  }

  lockBody = () => {
    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    if (firstLevel === this) {
      // List all parent elements of the modal content
      // If contentRef is not available, use the modal root element
      const contentElement =
        this._contentRef.current ||
        document.querySelector(`#${this.props.contentId}`)
      const parentElements = getParents(contentElement)

      this._ii = new InteractionInvalidation()
      this._ii.setBypassElements(parentElements)
      this._ii.setBypassSelector(
        [
          // Bypass everything inside the portal root, so no aria-hidden is set all the way down to body.
          // This way VoiceOver is still able to navigate (with ctrl+option+arrows) inside the modal.
          '#eufemia-portal-root',
          '#eufemia-portal-root *',

          // The same as above, but when no portal is used
          `#${this.props.contentId}`,
          `#${this.props.contentId} *`,

          // Allow bypassing invalidation from outside
          '.dnb-modal--bypass_invalidation',
          '.dnb-modal--bypass_invalidation_deep *',

          ...(this.props?.bypassInvalidationSelectors || []),
        ].filter(Boolean)
      )
      this._ii.activate()
    } else {
      modalRoots.forEach((modal) => {
        if (
          modal !== this &&
          typeof modal._iiLocal === 'undefined' &&
          typeof modal._scrollRef !== 'undefined'
        ) {
          modal._iiLocal = new InteractionInvalidation()
          modal._iiLocal.activate(modal._scrollRef.current)
        }
      })
    }

    if (typeof document !== 'undefined') {
      /** To ensure, we have always a working keydown, we call it both on the element and document */
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }

  removeLocks() {
    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    removeFromIndex(this)

    if (firstLevel === this) {
      this._ii?.revert()
      this.revertScrollPossibility()
    } else {
      try {
        const modal = modalRoots[modalRoots.length - 2]
        if (modal !== this && modal._iiLocal) {
          modal._iiLocal.revert()
          delete modal._iiLocal
        }
      } catch (e) {
        warn(e)
      }
    }

    this.removeAndroidFocusHelper()

    if (this.wasOpenedManually()) {
      const id = this.props.id
      dispatchCustomElementEvent(this, 'onClose', {
        id,
        event: this._triggeredByEvent,
        triggeredBy: this._triggeredBy || 'unmount',
      })
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
    }
  }

  setAndroidFocusHelper() {
    if (typeof window !== 'undefined' && isAndroid()) {
      window.addEventListener('resize', this._androidFocusHelper)
    }
  }

  removeAndroidFocusHelper() {
    window.removeEventListener('resize', this._androidFocusHelper)
    clearTimeout(this._androidFocusTimeout)
  }

  _androidFocusHelper = () => {
    const { animationDuration = null } = this.props
    const timeoutDuration: number =
      typeof animationDuration === 'string'
        ? parseFloat(animationDuration)
        : animationDuration

    clearTimeout(this._androidFocusTimeout)
    this._androidFocusTimeout = setTimeout(() => {
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
    }, timeoutDuration / 2) // Older Android needs a delay here
  }

  setFocus() {
    const {
      focusSelector = null,
      noAnimation = null,
      animationDuration = null,
    } = this.props
    const elem = this._contentRef.current
    const timeoutDuration: number =
      typeof animationDuration === 'string'
        ? parseFloat(animationDuration)
        : animationDuration

    if (elem) {
      // Prevent focus if more than 2 seconds have passed
      if (this._lastFocusTime && Date.now() - this._lastFocusTime > 2000) {
        return // stop here
      }
      this._lastFocusTime = Date.now()

      clearTimeout(this._focusTimeout)
      this._focusTimeout = setTimeout(
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
              // Focus the hidden focus helper first so VoiceOver
              const focusHelper = elem.querySelector(
                '.dnb-modal__close-button, .dnb-modal__focus-helper'
              ) as HTMLElement
              focusElement = focusHelper
            }

            // Try to use the "first-focus" method first
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
        isTrue(noAnimation) ? 0 : timeoutDuration || 0
      ) // with this delay, the user can press esc without an focus action first
    }
  }

  removeScrollPossibility() {
    if (this._scrollRef.current) {
      disableBodyScroll(this._scrollRef.current)
    }
  }

  revertScrollPossibility() {
    enableBodyScroll(this._scrollRef.current)
    clearAllBodyScrollLocks()
  }

  preventClick = (event) => {
    if (event) {
      event.stopPropagation()
    }
  }

  onCloseClickHandler = (event: React.SyntheticEvent) => {
    this.closeModalContent(event, { triggeredBy: 'button' })
  }

  onContentMouseDownHandler = (event: React.SyntheticEvent) => {
    this._overlayClickRef.current =
      event.target === event.currentTarget
        ? (event.target as HTMLElement)
        : null
  }

  onContentClickHandler = (event: React.SyntheticEvent) => {
    /**
     * Prevent false-positive Modal close,
     * when e.g. selecting text inside and moving the mouse outside,
     * we would still get this event fired. There we check if the current click,
     * has the same target as where the click got initiated.
     */
    if (this._overlayClickRef.current !== event.target) {
      return // stop here
    }
    this._overlayClickRef.current = null

    const { preventOverlayClose } = this.props

    if (!isTrue(preventOverlayClose)) {
      this.closeModalContent(event, {
        triggeredBy: 'overlay',
        ifIsLatest: false,
      })
    }
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'escape':
      case 'esc': {
        const mostCurrent = getModalRoot(-1)

        if (mostCurrent === this) {
          event.preventDefault()
          this.closeModalContent(event, {
            triggeredBy: 'keyboard',
          })
        }

        break
      }
    }
  }

  setModalContentState = (
    event: React.SyntheticEvent,
    { triggeredBy }: CloseHandlerParams
  ) => {
    this._triggeredBy = triggeredBy
    this._triggeredByEvent = event
  }

  closeModalContent(
    event,
    {
      triggeredBy,
      ...params
    }: CloseHandlerParams & { ifIsLatest?: boolean }
  ) {
    event?.persist?.()

    this.props.close(event, {
      triggeredBy,
      ...params,
    })
  }

  setBackgroundColor = (color: string) => {
    this.setState({ color })
  }

  render() {
    const {
      hide,
      title,
      labelledBy,
      id: _id, // eslint-disable-line
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
      contentId,
      children, // eslint-disable-line
      dialogRole = null,
      ...rest
    } = this.props
    const { color } = this.state

    const usedContentId = contentId || makeUniqueId('modal-')

    const useDialogRole = !(IS_MAC || IS_SAFARI || IS_IOS)
    let role = dialogRole || 'dialog'
    if (!useDialogRole && role === 'dialog') {
      role = 'region'
    }

    const contentParams = {
      /**
       * Do not use role="dialog" on Safari
       *
       * VoiceOver has troubles with role="dialog" and "Modal in Modal",
       * the result is, only the first Modal gets focus (set by Safari)
       *
       * Tests have shown: Both VoiceOver are working fine with the:
       * "aria-labelledby" and "aria-describedby" approach
       *
       */
      role,
      'aria-modal': useDialogRole ? true : undefined,

      /**
       * ARIA references
       */
      'aria-labelledby': combineLabelledBy(
        this.props,
        title ? usedContentId + '-title' : null,
        labelledBy
      ),
      'aria-describedby': combineDescribedBy(
        this.props,
        usedContentId + '-content'
      ),

      /**
       * If no labelledBy and no title is given,
       * set a fallback "dialogTitle"
       */
      'aria-label': !title && !labelledBy ? dialogTitle : undefined,

      className: classnames(
        'dnb-modal__content',
        isTrue(fullscreen)
          ? 'dnb-modal__content--fullscreen'
          : fullscreen === 'auto' && 'dnb-modal__content--auto-fullscreen',
        containerPlacement
          ? `dnb-modal__content--${containerPlacement || 'right'}`
          : null,
        `dnb-modal__vertical-alignment--${verticalAlignment}`,
        getThemeClasses(this.context?.theme),
        contentClass
      ),
      onMouseDown: this.onContentMouseDownHandler,
      onClick: this.onContentClickHandler,
    }

    const content =
      typeof children === 'function'
        ? children({ ...rest, close })
        : children

    return (
      <ModalContext.Provider
        value={{
          id: this.props.id,
          title,
          hideCloseButton,
          closeButtonAttributes,
          closeTitle,
          hide,
          setBackgroundColor: this.setBackgroundColor,
          onCloseClickHandler: this.onCloseClickHandler,
          preventClick: this.preventClick,
          onKeyDownHandler: this.onKeyDownHandler,
          contentRef: this._contentRef,
          scrollRef: this._scrollRef,
          contentId: usedContentId,
          close,
        }}
      >
        <div
          id={usedContentId}
          /** Sets the color on scroll overflow (at the bottom) */
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
          className={classnames(
            'dnb-modal__overlay',
            hide && 'dnb-modal__overlay--hide',
            isTrue(noAnimation) && 'dnb-modal__overlay--no-animation',
            isTrue(noAnimationOnMobile) &&
              'dnb-modal__overlay--no-animation-on-mobile',
            overlayClass
          )}
          aria-hidden={true}
        />
      </ModalContext.Provider>
    )
  }
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
