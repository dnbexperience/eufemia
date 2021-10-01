/**
 * Web Modal Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
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
  findElementInChildren,
  combineLabelledBy,
  combineDescribedBy,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import ModalContext from './ModalContext'
import ModalHeader, { ModalHeaderBar } from './ModalHeader'
import { IS_IOS, IS_SAFARI, IS_MAC } from '../../shared/helpers'

export default class ModalContent extends React.PureComponent {
  static propTypes = {
    modal_content: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(['modal', 'drawer']),
    bar_content: PropTypes.node,
    header_content: PropTypes.node,
    hide: PropTypes.bool,
    id: PropTypes.string,
    root_id: PropTypes.string,
    labelled_by: PropTypes.string,
    focus_selector: PropTypes.string,
    content_id: PropTypes.string,
    title: PropTypes.node,
    close_title: PropTypes.string,
    dialog_title: PropTypes.string,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    close_button_attributes: PropTypes.object,
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_core_style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    animation_duration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation_on_mobile: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    min_width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max_width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fullscreen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    align_content: PropTypes.string,
    container_placement: PropTypes.string,
    class: PropTypes.string,
    content_class: PropTypes.string,
    overlay_class: PropTypes.string,

    closeModal: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    mode: null,
    bar_content: null,
    header_content: null,
    hide: null,
    id: null,
    root_id: null,
    labelled_by: null,
    focus_selector: null,
    content_id: null,
    title: null,
    close_title: null,
    dialog_title: null,
    hide_close_button: null,
    close_button_attributes: null,
    spacing: null,
    prevent_close: null,
    prevent_core_style: null,
    animation_duration: null,
    no_animation: null,
    no_animation_on_mobile: null,
    min_width: null,
    max_width: null,
    fullscreen: null,
    align_content: null,
    container_placement: null,
    class: null,
    overlay_class: null,
    content_class: null,

    closeModal: null,
    className: null,
    children: null,
  }

  state = { triggeredBy: null, triggeredByEvent: null }

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
    this._id = makeUniqueId()
    this._ii = new InteractionInvalidation()
    this._ii.setBypassSelector([
      '.dnb-modal__content',
      `#dnb-modal-${props.root_id || 'root'}`,
    ])
  }

  componentDidMount() {
    this.addToIndex()

    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    // remove it every time, because of nested modals
    this.removeScrollPossibility()

    if (firstLevel === this) {
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

    this.setAndroidFocusHelper()
    this.setFocus()

    const id = this.props.id
    dispatchCustomElementEvent(this, 'on_open', {
      id,
    })

    if (typeof document !== 'undefined') {
      /** To ensure, we have always a working keydown, we call it both on the element and document */
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimeout)

    const modalRoots = getListOfModalRoots()
    const firstLevel = modalRoots[0]

    this.removeFromIndex()

    if (firstLevel === this) {
      this._ii.revert()
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
    if (
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      /Android/.test(navigator.appVersion)
    ) {
      window.addEventListener('resize', this._androidFocusHelper)
    }
  }

  removeAndroidFocusHelper() {
    window.removeEventListener('resize', this._androidFocusHelper)
    clearTimeout(this._androidFocusTimeout)
  }

  _androidFocusHelper = () => {
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
    }, 100) // Older Android needs a delay here
  }

  addToIndex() {
    if (typeof window !== 'undefined') {
      try {
        window.__modalStack = window.__modalStack || []
        window.__modalStack.push(this)
      } catch (e) {
        warn(e)
      }
    }
  }

  removeFromIndex() {
    if (typeof window !== 'undefined') {
      try {
        window.__modalStack = window.__modalStack || []
        window.__modalStack = window.__modalStack.filter(
          (cur) => cur !== this
        )
        if (!window.__modalStack.length) {
          delete window.__modalStack
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  setFocus() {
    const { focus_selector, no_animation, animation_duration } = this.props
    const elem = this._contentRef.current

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
        isTrue(no_animation) ? 0 : parseFloat(animation_duration) || 0
      ) // with this delay, the user can press esc without an focus action first
    }
  }

  removeScrollPossibility() {
    if (this._contentRef.current) {
      disableBodyScroll(this._contentRef.current)
    }
  }

  revertScrollPossibility() {
    enableBodyScroll(this._contentRef.current)
    clearAllBodyScrollLocks()
  }

  preventClick = (e) => {
    if (e) {
      e.stopPropagation()
    }
  }

  onCloseClickHandler = (e) => {
    this.closeModal(e, { triggeredBy: 'button' })
  }

  onContentClickHandler = (e) => {
    this.closeModal(e, { triggeredBy: 'overlay', ifIsLatest: false })
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'esc': {
        const mostCurrent = [...getListOfModalRoots()].pop()

        if (mostCurrent === this) {
          e.preventDefault()
          this.closeModal(e, {
            triggeredBy: 'keyboard',
          })
        }

        break
      }
    }
  }

  closeModal(event, { triggeredBy, ...params }) {
    event?.persist?.()
    this.setState({ triggeredBy, triggeredByEvent: event }, () => {
      this.props.closeModal(event, {
        triggeredBy,
        ...params,
      })
    })
  }

  setBackgroundColor = (color) => {
    this.setState({
      color,
    })
  }

  render() {
    const {
      mode,
      hide,
      title,
      labelled_by,
      header_content,
      modal_content,
      bar_content,
      id: _id, // eslint-disable-line
      close_title, // eslint-disable-line
      dialog_title, // eslint-disable-line
      hide_close_button, // eslint-disable-line
      close_button_attributes, // eslint-disable-line
      spacing,
      prevent_close, // eslint-disable-line
      open_delay, // eslint-disable-line
      prevent_core_style,
      animation_duration, // eslint-disable-line
      no_animation,
      no_animation_on_mobile,
      min_width,
      max_width,
      fullscreen,
      align_content,
      container_placement,
      closeModal, // eslint-disable-line
      className,
      class: _className,
      content_class,
      overlay_class,
      content_id,
      toggleOpenClose, // eslint-disable-line
      children, // eslint-disable-line
      ...rest
    } = this.props

    const id = content_id || this._id
    const style = this.state.color
      ? { '--modal-background-color': `var(--color-${this.state.color})` }
      : null

    // ensure the min/max don't conflict
    let minWidth = min_width
    let maxWidth = max_width
    if (minWidth && !maxWidth && parseFloat(minWidth) > 0) {
      maxWidth = 0
    } else if (maxWidth && !minWidth && parseFloat(maxWidth) > 0) {
      minWidth = 0
    }

    const useDialogRole = !(IS_MAC || IS_SAFARI || IS_IOS)

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
      role: useDialogRole ? 'dialog' : 'region',
      'aria-modal': useDialogRole ? 'true' : undefined,

      /**
       * ARIA references
       */
      'aria-labelledby': combineLabelledBy(
        this.props,
        title ? id + '-title' : null,
        labelled_by
      ),
      'aria-describedby': combineDescribedBy(this.props, id + '-content'),

      /**
       * If no labelled_by and no title is given,
       * set a fallback "dialog_title"
       */
      'aria-label':
        !title && !labelled_by ? this.props.dialog_title : undefined,

      className: classnames(
        'dnb-modal__content',
        mode && `dnb-modal__content--${mode}`,
        hide && 'dnb-modal__content--hide',
        isTrue(spacing) && 'dnb-modal__content--spacing',
        align_content && `dnb-modal__content__align--${align_content}`,
        container_placement || mode === 'drawer'
          ? `dnb-modal__content--${container_placement || 'right'}`
          : null,
        isTrue(fullscreen)
          ? 'dnb-modal__content--fullscreen'
          : fullscreen === 'auto' && 'dnb-modal__content--auto-fullscreen',
        isTrue(no_animation) && 'dnb-modal__content--no-animation',
        isTrue(no_animation_on_mobile) &&
          'dnb-modal__content--no-animation-on-mobile',
        content_class
      ),
      onClick: this.onContentClickHandler,
    }

    const innerParams = {
      className: classnames(
        'dnb-modal__content__inner',
        !isTrue(prevent_core_style) && 'dnb-core-style',
        className,
        _className
      ),
      style: (minWidth || maxWidth) && { minWidth, maxWidth },
      onClick: this.preventClick,
      onTouchStart: this.preventClick,
      onKeyDown: this.onKeyDownHandler,
      ...rest,
    }

    const overlayParams = {
      className: classnames(
        'dnb-modal__overlay',
        hide && 'dnb-modal__overlay--hide',
        mode && `dnb-modal__overlay--${mode}`,
        isTrue(no_animation) && 'dnb-modal__overlay--no-animation',
        isTrue(no_animation_on_mobile) &&
          'dnb-modal__overlay--no-animation-on-mobile',
        overlay_class
      ),
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, innerParams)

    const bar = findElementInChildren(
      modal_content,
      (cur) => cur.type === ModalHeaderBar
    ) ? null : (
      <ModalHeaderBar>{bar_content}</ModalHeaderBar>
    )

    const header = findElementInChildren(
      modal_content,
      (cur) => cur.type === ModalHeader
    ) ? null : (
      <ModalHeader title={title}>{header_content}</ModalHeader>
    )

    const content = (
      <div id={id + '-content'} className="dnb-modal__content__wrapper">
        {modal_content}
      </div>
    )

    return (
      <ModalContext.Provider
        value={{
          id,
          setBackgroundColor: this.setBackgroundColor,
          ...this.props,
          onCloseClickHandler: this.onCloseClickHandler,
        }}
      >
        <div id={id} {...contentParams}>
          <ScrollView {...innerParams}>
            <div
              tabIndex="-1"
              className="dnb-modal__content__spacing dnb-no-focus"
              style={style}
              ref={this._contentRef}
            >
              {bar}
              {header}
              {content}
            </div>
          </ScrollView>
        </div>
        <span {...overlayParams} aria-hidden="true" />
      </ModalContext.Provider>
    )
  }
}

export function getListOfModalRoots(index = null) {
  if (typeof window !== 'undefined') {
    try {
      const stack = window.__modalStack || []
      if (index !== null) {
        if (index === -1 && stack.length) {
          return stack[stack.length - 1]
        } else if (index > -1) {
          return stack[index]
        }
      }

      return stack
    } catch (e) {
      warn(e)
    }
  }

  return []
}
