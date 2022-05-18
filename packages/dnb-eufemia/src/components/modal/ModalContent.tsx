/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import keycode from 'keycode'
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
} from '../../shared/component-helper'
import ModalContext from './ModalContext'
import { IS_IOS, IS_SAFARI, IS_MAC, isAndroid } from '../../shared/helpers'
import { ModalContentProps } from './types'
import {
  getListOfModalRoots,
  getModalRoot,
  addToIndex,
  removeFromIndex,
} from './helpers'
import DrawerContent from '../drawer/DrawerContent'
import DialogContent from '../dialog/DialogContent'

interface ModalContentState {
  triggeredBy: string
  triggeredByEvent: Event
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
  state = { triggeredBy: null, triggeredByEvent: null, color: null }

  _contentRef: React.RefObject<HTMLElement>
  _scrollRef: React.RefObject<HTMLElement>
  _id: string
  _lockTimeout: NodeJS.Timeout
  _focusTimeout: NodeJS.Timeout
  _androidFocusTimeout: NodeJS.Timeout
  _ii: InteractionInvalidation
  _iiLocal: InteractionInvalidation

  constructor(props: ModalContentProps) {
    super(props)
    this._contentRef = React.createRef()
    this._scrollRef = React.createRef()

    // NB: The ""._id" is used in the __modalStack as "last._id"
    this._id = props.id
  }

  componentDidMount() {
    const {
      id = null,
      no_animation = false,
      animation_duration = null,
    } = this.props

    const timeoutDuration: number =
      typeof animation_duration === 'string'
        ? parseFloat(animation_duration)
        : animation_duration

    // Add it to the index at first
    // we use it later with getListOfModalRoots
    addToIndex(this)

    // Because of nested modals/drawers, we run this regardless
    // has to be run at first – so the scrollbar gets removed
    this.removeScrollPossibility() // forces browser to re-paint

    this.setFocus()
    this.setAndroidFocusHelper()

    dispatchCustomElementEvent(this, 'on_open', {
      id,
    })

    if (isTrue(no_animation) || process.env.NODE_ENV === 'test') {
      this.lockBody() // forces browser to re-paint
    } else {
      this._lockTimeout = setTimeout(this.lockBody, timeoutDuration * 1.2) // a little over --modal-animation-duration
    }
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimeout)
    clearTimeout(this._lockTimeout)

    this.removeLocks()
  }

  lockBody = () => {
    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    if (firstLevel === this) {
      this._ii = new InteractionInvalidation()
      this._ii.setBypassSelector(
        [
          // Bypass modal content
          '.dnb-modal__content *',
          `#dnb-modal-${this.props.root_id || 'root'}`,
          `#dnb-modal-${this.props.root_id || 'root'} *`,

          // TODO: Eventually in future, make it possible to bypass invalidation from outside
          // '.dnb-modal--bypass_invalidation',
          // '.dnb-modal--bypass_invalidation_deep *',

          ...(this.props?.bypass_invalidation_selectors || []),
        ].filter(Boolean)
      )
      this._ii.activate()
    } else {
      modalRoots.forEach((modal) => {
        if (
          modal !== this &&
          typeof modal._iiLocal === 'undefined' &&
          typeof modal._contentRef !== 'undefined'
        ) {
          modal._iiLocal = new InteractionInvalidation()
          modal._iiLocal.activate(modal._contentRef.current)
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

    const id = this.props.id
    const { triggeredBy, triggeredByEvent } = this.state
    dispatchCustomElementEvent(this, 'on_close', {
      id,
      event: triggeredByEvent,
      triggeredBy: triggeredBy || 'unmount',
    })

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
    const { animation_duration = null } = this.props
    const timeoutDuration: number =
      typeof animation_duration === 'string'
        ? parseFloat(animation_duration)
        : animation_duration

    clearTimeout(this._androidFocusTimeout)
    this._androidFocusTimeout = setTimeout(() => {
      try {
        if (
          document.activeElement?.tagName == 'INPUT' ||
          document.activeElement?.tagName == 'TEXTAREA'
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
      focus_selector = null,
      no_animation = null,
      animation_duration = null,
    } = this.props
    const elem = this._contentRef.current
    const timeoutDuration: number =
      typeof animation_duration === 'string'
        ? parseFloat(animation_duration)
        : animation_duration

    if (elem) {
      clearTimeout(this._focusTimeout)
      this._focusTimeout = setTimeout(
        () => {
          try {
            let focusElement = elem

            // Try to use the "first-focus" method first
            if (typeof focus_selector === 'string') {
              focusElement = elem.querySelector(focus_selector)
            }

            focusElement.focus()

            const noH1Elem = elem.querySelector('h1, h2, h3')
            if (
              typeof noH1Elem?.tagName !== 'undefined' &&
              noH1Elem?.tagName !== 'H1'
            ) {
              warn(
                'You have to provide a h1 element at first – instead of:',
                noH1Elem
              )
            }
          } catch (e) {
            warn(e)
          }
        },
        isTrue(no_animation) ? 0 : timeoutDuration || 0
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

  onCloseClickHandler = (event) => {
    this.closeModalContent(event, { triggeredBy: 'button' })
  }

  onContentClickHandler = (event) => {
    const { prevent_overlay_close } = this.props

    if (!isTrue(prevent_overlay_close)) {
      this.closeModalContent(event, {
        triggeredBy: 'overlay',
        ifIsLatest: false,
      })
    }
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
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

  closeModalContent(event, { triggeredBy, ...params }) {
    event?.persist?.()
    this.setState({ triggeredBy, triggeredByEvent: event }, () => {
      this.props.close(event, {
        triggeredBy,
        ...params,
      })
    })
  }

  setBackgroundColor = (color: string) => {
    document.documentElement.style.setProperty(
      '--modal-background-color',
      color
    )
    this.setState({
      color,
    })
  }

  render() {
    const {
      mode = 'modal',
      hide,
      title,
      labelled_by,
      id: _id, // eslint-disable-line
      close_title = 'Lukk',
      dialog_title = 'Vindu',
      hide_close_button = false,
      close_button_attributes,
      animation_duration, // eslint-disable-line
      no_animation = false,
      no_animation_on_mobile = false,
      fullscreen = 'auto',
      align_content = 'left',
      container_placement = 'right',
      close, // eslint-disable-line
      content_class,
      overlay_class,
      content_id,
      children, // eslint-disable-line
      min_width,
      max_width,
      modal_content,
      header_content,
      bar_content,
      className,
      prevent_core_style,
      class: _className,
      dialog_role = null,
      ...rest
    } = this.props
    const { color } = this.state

    const contentId = content_id || makeUniqueId('modal-')

    const useDialogRole = !(IS_MAC || IS_SAFARI || IS_IOS)
    let role = dialog_role || 'dialog'
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
        title ? contentId + '-title' : null,
        labelled_by
      ),
      'aria-describedby': combineDescribedBy(
        this.props,
        contentId + '-content'
      ),

      /**
       * If no labelled_by and no title is given,
       * set a fallback "dialog_title"
       */
      'aria-label': !title && !labelled_by ? dialog_title : undefined,

      className: classnames(
        'dnb-modal__content',
        isTrue(fullscreen)
          ? 'dnb-modal__content--fullscreen'
          : fullscreen === 'auto' && 'dnb-modal__content--auto-fullscreen',
        container_placement || mode === 'drawer'
          ? `dnb-modal__content--${container_placement || 'right'}`
          : null,
        mode && `dnb-modal__content--${mode}`,

        content_class
      ),
      onClick: this.onContentClickHandler,
    }

    const modeParams = {
      minWidth: min_width,
      maxWidth: max_width,
      modalContent: modal_content,
      navContent: bar_content,
      headerContent: header_content,
      preventCoreStyle: prevent_core_style,
      className,
      class: _className,
      title,
      alignContent: align_content,
      noAnimation: no_animation,
      noAnimationOnMobile: no_animation_on_mobile,
      fullscreen,
      containerPlacement: container_placement,
      ...rest,
    }

    return (
      <ModalContext.Provider
        value={{
          id: this.props.id,
          title,
          hide_close_button,
          close_button_attributes,
          close_title,
          mode,
          hide,
          setBackgroundColor: this.setBackgroundColor,
          onCloseClickHandler: this.onCloseClickHandler,
          preventClick: this.preventClick,
          onKeyDownHandler: this.onKeyDownHandler,
          contentRef: this._contentRef,
          scrollRef: this._scrollRef,
          contentId,
          close,
        }}
      >
        <div
          id={contentId}
          style={
            (color
              ? { '--modal-background-color': `var(--color-${color})` }
              : null) as CSSPropertiesWithVars
          }
          {...contentParams}
        >
          {/* Deprecated: Only to provide backward compatibility */}
          {mode == 'drawer' && (
            <DrawerContent
              className="dnb-modal__content__inner" // backward compatibility
              {...modeParams}
            />
          )}
          {(mode == 'modal' || mode == 'dialog') && (
            <DialogContent
              className="dnb-modal__content__inner" // backward compatibility
              {...modeParams}
            />
          )}

          {/* New method of using Modal */}
          {mode == 'custom' && children}
        </div>

        <span
          className={classnames(
            'dnb-modal__overlay',
            hide && 'dnb-modal__overlay--hide',
            isTrue(no_animation) && 'dnb-modal__overlay--no-animation',
            isTrue(no_animation_on_mobile) &&
              'dnb-modal__overlay--no-animation-on-mobile',
            overlay_class
          )}
          aria-hidden="true"
        />
      </ModalContext.Provider>
    )
  }
}
