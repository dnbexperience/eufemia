/**
 * Web Modal Component
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import * as bodyScrollLock from 'body-scroll-lock'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  isTouchDevice,
  registerElement,
  processChildren,
  dispatchCustomElementEvent,
  validateDOMAttributes
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Button, { propTypes as ButtonPropTypes } from '../button/Button'

const { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } =
  bodyScrollLock && bodyScrollLock.default
    ? bodyScrollLock.default
    : bodyScrollLock

const renderProps = {
  on_open: null,
  on_close: null,
  on_close_prevent: null,
  open_modal: null,
  close_modal: null,
  modal_content: null
}

export const propTypes = {
  id: PropTypes.string,
  labelled_by: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trigger_hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trigger_disabled: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  trigger_variant: ButtonPropTypes.variant,
  trigger_text: PropTypes.string,
  trigger_title: PropTypes.string,
  trigger_icon: PropTypes.string,
  trigger_icon_position: PropTypes.string,
  trigger_class: PropTypes.string,
  content_id: PropTypes.string,
  close_title: PropTypes.string,
  hide_close_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  fullscreen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  open_state: PropTypes.oneOf(['opened', 'closed']),
  direct_dom_return: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Events and functions
  on_open: PropTypes.func,
  on_close: PropTypes.func,
  on_close_prevent: PropTypes.func,
  open_modal: PropTypes.func,
  close_modal: PropTypes.func,

  // Web Component props
  preventSetTriggerRef: PropTypes.bool,
  modal_content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

export const defaultProps = {
  id: null,
  labelled_by: null,
  title: null,
  disabled: null,
  trigger_hidden: false,
  trigger_disabled: null,
  trigger_variant: 'secondary',
  trigger_text: null,
  trigger_title: null,
  trigger_icon: 'question',
  trigger_icon_position: 'left',
  trigger_class: null,
  content_id: null,
  close_title: 'Lukk', // Close Modal Window
  hide_close_button: false,
  prevent_close: false,
  fullscreen: false,
  open_state: null,
  direct_dom_return: false,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  preventSetTriggerRef: false,
  ...renderProps
}

export default class Modal extends PureComponent {
  static tagName = 'dnb-modal'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static modalRoot = null // gets later '.dnb-modal-root'

  static enableWebComponent() {
    registerElement(Modal.tagName, Modal, defaultProps)
  }

  static getContent(props) {
    if (typeof props.modal_content === 'string') {
      return props.modal_content
    } else if (typeof props.modal_content === 'function') {
      return props.modal_content(props)
    }
    return processChildren(props)
  }

  static insertModalRoot() {
    if (!Modal.modalRoot && typeof document !== 'undefined') {
      try {
        Modal.modalRoot = document.getElementById('dnb-modal-root') // document.querySelector('.dnb-modal-root')
        if (!Modal.modalRoot) {
          Modal.modalRoot = document.createElement('div')
          Modal.modalRoot.setAttribute('id', 'dnb-modal-root')
          document.body.appendChild(Modal.modalRoot)
        }
      } catch (e) {
        console.warn('Modal: Could not insert dnb-modal-root', e)
      }
    }

    return Modal.modalRoot
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      switch (props.open_state) {
        case 'opened':
          state.modalActive = true
          break
        case 'closed':
          state.modalActive = false
          break
      }
    }
    state._listenForPropChanges = true
    return state
  }

  state = {
    _listenForPropChanges: true,
    currentActiveState: false,
    modalActive: false
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId()

    if (!props.preventSetTriggerRef) {
      this._triggerRef = React.createRef()
    }
  }

  componentDidMount() {
    const { open_modal } = this.props

    if (typeof open_modal === 'function') {
      open_modal(() => {
        this.toggleOpenClose(null, true)
      }, this)
    }
  }
  componentWillUnmount() {
    this.toggleOpenClose(null, false)
  }

  toggleOpenClose = (event = null, showModal = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    const modalActive =
      showModal !== null ? showModal : !this.state.modalActive
    this.setState({
      modalActive,
      _listenForPropChanges: false
    })
  }
  handleSideEffects = () => {
    if (!isTrue(this.props.direct_dom_return)) {
      Modal.insertModalRoot()
    }

    const modalActive = this.state.modalActive
    const currentActiveState = modalActive

    const runSideEffect = () => {
      // prevent scrolling on the background
      if (typeof document !== 'undefined') {
        try {
          document.body.setAttribute(
            'data-dnb-modal-active',
            modalActive ? 'true' : 'false'
          )
        } catch (e) {
          console.warn(
            'Modal: Error on set "data-dnb-modal-active" by using element.setAttribute()',
            e
          )
        }
      }

      if (modalActive) {
        if (typeof this.props.close_modal === 'function') {
          this.props.close_modal(() => {
            this.isClosing = false
            this.toggleOpenClose(null, false)
          }, this)
        }
      }

      const id = this._id
      if (modalActive) {
        dispatchCustomElementEvent(this, 'on_open', { id })
      } else if (this.wasActive) {
        dispatchCustomElementEvent(this, 'on_close', { id })
      }

      this.wasActive = modalActive

      if (modalActive === false) {
        if (this._triggerRef && this._triggerRef.current) {
          this._triggerRef.current.focus()
        }
      }
    }

    this.setState(
      {
        currentActiveState,
        _listenForPropChanges: false
      },
      runSideEffect
    )
  }
  open = e => {
    this.toggleOpenClose(e, true)
  }
  close = e => {
    const { prevent_close } = this.props
    if (isTrue(prevent_close)) {
      if (!this.isClosing) {
        const id = this._id
        this.isClosing = true
        dispatchCustomElementEvent(this, 'on_close_prevent', {
          id,
          close: e => {
            this.isClosing = false
            this.toggleOpenClose(e, false)
          }
        })
      }
    } else {
      this.toggleOpenClose(e, false)
    }
  }
  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      id, // eslint-disable-line
      open_state, // eslint-disable-line
      preventSetTriggerRef, // eslint-disable-line
      disabled,
      labelled_by,
      trigger_hidden,
      trigger_disabled,
      trigger_variant,
      trigger_text,
      trigger_title,
      trigger_icon,
      trigger_icon_position,
      trigger_class,
      ...rest
    } = props

    const { modalActive, currentActiveState } = this.state
    const modal_content = Modal.getContent(this.props)

    if (modalActive !== currentActiveState) {
      setTimeout(this.handleSideEffects, 1)
      // delay the dispatch to make sure we are after the render cyclus
      // this way have the content insted by the time we call this event
    }

    return (
      <div className="dnb-modal">
        {!isTrue(trigger_hidden) && (
          <Button
            id={this._id}
            type="button"
            variant={trigger_variant}
            text={trigger_text}
            title={trigger_title || props.title}
            disabled={isTrue(disabled) || isTrue(trigger_disabled)}
            icon={
              trigger_icon !== 'question'
                ? trigger_icon
                : (!trigger_text || trigger_variant === 'tertiary') &&
                  trigger_icon
            }
            icon_position={trigger_icon_position}
            on_click={this.toggleOpenClose}
            className={classnames(
              'dnb-modal__trigger',
              createSpacingClasses(props),
              trigger_class
            )}
            innerRef={this._triggerRef}
          />
        )}

        {modalActive && modal_content && (
          <ModalRoot
            {...rest}
            labelled_by={labelled_by || this._id}
            modal_content={modal_content}
            closeModal={this.close}
            toggleOpenClose={this.toggleOpenClose}
          />
        )}
      </div>
    )
  }
}

class ModalRoot extends PureComponent {
  static propTypes = {
    direct_dom_return: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }
  static defaultProps = {
    direct_dom_return: false,
    children: null
  }

  state = {
    isMonted: false
  }

  componentDidMount() {
    if (!isTrue(this.props.direct_dom_return)) {
      Modal.insertModalRoot()

      try {
        if (!this.node) {
          this.node = document.createElement('div')
          this.node.className = 'dnb-modal-root__inner'
        }
        if (Modal.modalRoot && this.node) {
          Modal.modalRoot.appendChild(this.node)
        }
      } catch (e) {
        console.warn(e)
      }
      this.setState({ isMonted: true })
    }
  }

  componentWillUnmount() {
    if (Modal.modalRoot && this.node) {
      this.setState({ isMonted: false })
      Modal.modalRoot.removeChild(this.node)
      this.node = null
    }
  }
  render() {
    const { children, direct_dom_return, ...props } = this.props
    if (isTrue(direct_dom_return)) {
      return <ModalContent {...props}>{children}</ModalContent>
    }
    if (this.state.isMonted && Modal.modalRoot && this.node) {
      return ReactDOM.createPortal(
        <ModalContent {...props}>{children}</ModalContent>,
        this.node
      )
    }
    return null
  }
}

class ModalContent extends PureComponent {
  static propTypes = {
    modal_content: PropTypes.node.isRequired,
    labelled_by: PropTypes.string,
    content_id: PropTypes.string,
    title: PropTypes.string,
    close_title: PropTypes.string,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    min_width: PropTypes.string,
    max_width: PropTypes.string,
    fullscreen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    // React props
    closeModal: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    labelled_by: null,
    content_id: null,
    title: null,
    close_title: null,
    hide_close_button: false,
    prevent_close: null,
    min_width: null,
    max_width: null,
    fullscreen: null,
    class: null,

    // React props
    closeModal: null,
    className: null,
    children: null
  }

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
    this._id = props.content_id || makeUniqueId()
  }
  componentDidMount() {
    // since touch devices works diffrent, and we also use preventScreenReaderPossibility
    // we dont set the tabindex by using removeFocusPossibility
    this.isTouchDevice = isTouchDevice()
    this.removeScrollPossibility()
    this.preventScreenReaderPossibility()
    this.removeFocusPossibility()
    this.setFocus()
  }
  componentWillUnmount() {
    clearTimeout(this._setFocusId)
    this.revertScrollPossibility()
    this.revertScreenReaderPossibility()
    this.revertFocusPossibility()
  }

  setFocus() {
    if (this._contentRef.current) {
      clearTimeout(this._setFocusId)
      this._setFocusId = setTimeout(() => {
        try {
          this._contentRef.current.focus() // in case the button is disabled
          const focusElement = this._contentRef.current.querySelector(
            'h1:first-of-type, h2:first-of-type, .dnb-modal__close-button'
          )
          if (focusElement) {
            focusElement.focus()
          }
        } catch (e) {
          console.warn(e)
        }
      }, 300) // with this delay, the user can  press esc without an focus action first
    }
  }

  preventScreenReaderPossibility() {
    this.nonScreenReaderNodes = Array.from(
      document.querySelectorAll('body > div:not(#dnb-modal-root)')
    )
    this.nonScreenReaderNodes.forEach(node => {
      node.setAttribute('aria-hidden', true)
    })
  }

  revertScreenReaderPossibility() {
    if (this.nonScreenReaderNodes) {
      this.nonScreenReaderNodes.forEach(node => {
        node.removeAttribute('aria-hidden')
      })
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

  removeFocusPossibility() {
    if (typeof document === 'undefined' || this.isTouchDevice) {
      return
    }
    const modalNodes = Array.from(
      document.querySelectorAll('.dnb-modal__content *')
    )

    // by only finding elements that do not have tabindex="-1" we ensure we don't
    // corrupt the previous state of the element if a modal was already open
    this.nonModalNodes = Array.from(
      document.querySelectorAll(
        'body *:not(.dnb-modal__content):not([tabindex="-1"]):not(script)'
      )
    ).filter(node => !modalNodes.includes(node))

    this.nonModalNodes.forEach(node => {
      try {
        // save the previous tabindex state so we can restore it on close
        node._prevTabindex = node.getAttribute('tabindex')
        node.setAttribute('tabindex', -1)

        // tabindex=-1 does not prevent the mouse from focusing the node (which
        // would show a focus outline around the element). prevent this by disabling
        // outline styles while the modal is open
        // @see https://www.sitepoint.com/when-do-elements-take-the-focus/
        node.style.outline = 'none'
      } catch (e) {
        console.warn(e)
      }
    })
  }

  revertFocusPossibility() {
    if (!this.nonModalNodes || this.isTouchDevice) {
      return
    }
    // restore or remove tabindex from nodes
    this.nonModalNodes.forEach(node => {
      try {
        if (node && node._prevTabindex) {
          node.setAttribute('tabindex', node._prevTabindex)
          node._prevTabindex = null
          delete node._prevTabindex
        } else {
          node.removeAttribute('tabindex')
        }
        node.style.outline = null
      } catch (e) {
        console.warn(e)
      }
    })
    this.nonModalNodes = null
  }

  preventClick = e => {
    if (e) {
      e.stopPropagation()
    }
  }

  onKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'esc':
        this.props.closeModal(e)
        e.preventDefault()
        break
    }
  }

  render() {
    const {
      title,
      labelled_by,
      modal_content,
      close_title,
      hide_close_button,
      prevent_close, // eslint-disable-line
      min_width: minWidth,
      max_width: maxWidth,
      fullscreen, // eslint-disable-line
      closeModal,
      className,
      class: _className,
      content_id, // eslint-disable-line
      toggleOpenClose, // eslint-disable-line
      children, // eslint-disable-line
      ...rest
    } = this.props

    const id = this._id

    const contentParams = {
      role: 'dialog',
      'aria-modal': 'true',
      className: classnames(
        'dnb-modal__content',
        fullscreen && 'dnb-modal__content--fullscreen'
      ),
      onClick: closeModal
    }

    const innerParams = {
      id,
      tabIndex: -1,
      className: classnames(
        'dnb-modal__content__inner',
        'dnb-no-focus',
        className,
        _className
      ),
      style: (minWidth || maxWidth) && { minWidth, maxWidth },
      onClick: this.preventClick,
      onTouchStart: this.preventClick,
      onKeyDown: this.onKeyDownHandler,
      ...rest
    }

    if (labelled_by) {
      contentParams['aria-labelledby'] = labelled_by
      contentParams['aria-describedby'] = labelled_by
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, innerParams)

    return (
      <Fragment>
        <div {...contentParams}>
          <div {...innerParams} ref={this._contentRef}>
            {title && <h1 className="dnb-modal__title dnb-h2">{title}</h1>}
            {isTrue(hide_close_button) !== true && (
              <CloseButton on_click={closeModal} title={close_title} />
            )}
            <div className="dnb-modal__wrapper">{modal_content}</div>
          </div>
        </div>
        <span className="dnb-modal__overlay" aria-hidden="true" />
      </Fragment>
    )
  }
}

export const CloseButton = ({ on_click, title, className = null }) => (
  <Button
    type="button"
    variant="secondary"
    size="medium"
    className={classnames('dnb-modal__close-button', className)}
    icon="close"
    icon_size="medium"
    aria-label={title}
    on_click={on_click}
  />
)
CloseButton.propTypes = {
  on_click: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}
CloseButton.defaultProps = {
  className: null,
  title: 'Lukk'
}
