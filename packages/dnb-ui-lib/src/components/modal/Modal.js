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
  isTouchDevice,
  registerElement,
  processChildren,
  dispatchCustomElementEvent,
  validateDOMAttributes
} from '../../shared/component-helper'
import Button, { propTypes as ButtonPropTypes } from '../button/Button'

const { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } =
  bodyScrollLock && bodyScrollLock.default
    ? bodyScrollLock.default
    : bodyScrollLock

const renderProps = {
  on_open: null,
  on_close: null,
  on_close_prevent: null,
  modal_content: null
}

export const propTypes = {
  id: PropTypes.string,
  labelled_by: PropTypes.string,
  title: PropTypes.string,
  trigger_variant: ButtonPropTypes.variant,
  trigger_text: PropTypes.string,
  trigger_title: PropTypes.string,
  trigger_icon: PropTypes.string,
  trigger_class: PropTypes.string,
  content_id: PropTypes.string,
  close_title: PropTypes.string,
  hide_close_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  preventSetTriggerRef: PropTypes.bool,
  on_open: PropTypes.func,
  on_close: PropTypes.func,
  on_close_prevent: PropTypes.func,
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
  trigger_variant: 'secondary',
  trigger_text: null,
  trigger_title: 'Open Modal',
  trigger_icon: 'question',
  trigger_class: null,
  content_id: null,
  close_title: 'Close Modal Window',
  hide_close_button: false,
  prevent_close: false,
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
        console.log('Could not insert dnb-modal-root', e)
      }
    }
  }

  state = {
    modalActive: false
  }

  constructor(props) {
    super(props)
    this._id = props.id || `modal-${Math.round(Math.random() * 999)}`

    if (!props.preventSetTriggerRef) {
      this._triggerRef = React.createRef()
    }

    // TODO: Remove warning in v4.
    if (process.env.NODE_ENV === 'development') {
      Object.entries(props).forEach(([k, v]) => {
        if (['modal_trigger_text', 'modal_trigger_title'].includes(k)) {
          console.warn(
            `Using '${k}' is deprecated. Use ${k.replace(
              /modal_/g,
              ''
            )}="${v}" instead!`
          )
        }
      })
    }
  }

  toggleOpenClose = (event = null, showModal = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    Modal.insertModalRoot()

    const modalActive =
      showModal !== null ? showModal : !this.state.modalActive
    this.setState({
      modalActive
    })

    // prevent scrolling on the background
    try {
      document.body.setAttribute(
        'data-dnb-modal-active',
        modalActive ? 'true' : 'false'
      )
    } catch (e) {
      console.log(
        'Error on set "data-dnb-modal-active" by using element.setAttribute()',
        e
      )
    }

    const id = this._id
    if (modalActive) {
      dispatchCustomElementEvent(this, 'on_open', { id })
    } else {
      dispatchCustomElementEvent(this, 'on_close', { id })
    }

    if (modalActive === false) {
      if (this._triggerRef.current) {
        this._triggerRef.current.focus()
      }
    }
  }
  open = e => {
    this.toggleOpenClose(e, true)
  }
  close = e => {
    const { prevent_close } = this.props
    if (prevent_close === true || prevent_close === 'true') {
      const id = this._id
      dispatchCustomElementEvent(this, 'on_close_prevent', {
        id,
        close: e => this.toggleOpenClose(e, false)
      })
      return
    }
    this.toggleOpenClose(e, false)
  }
  componentWillUnmount() {
    this.toggleOpenClose(null, false)
  }
  render() {
    const {
      id, // eslint-disable-line
      preventSetTriggerRef, // eslint-disable-line
      labelled_by,
      trigger_variant,
      trigger_text,
      trigger_title,
      trigger_icon,
      trigger_class,
      ...rest
    } = this.props

    const { modalActive } = this.state
    const modal_content = Modal.getContent(this.props)

    return (
      <div className="dnb-modal">
        {trigger_variant && (
          <Button
            id={this._id}
            type="button"
            variant={trigger_variant}
            text={trigger_text}
            title={trigger_title}
            icon={
              trigger_text && trigger_icon === defaultProps.trigger_icon
                ? null
                : trigger_icon
            }
            on_click={this.toggleOpenClose}
            className={classnames('dnb-modal__trigger', trigger_class)}
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
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }
  static defaultProps = {
    children: null
  }

  constructor(props) {
    super(props)
    if (Modal.modalRoot) {
      this.node = document.createElement('div')
      this.node.className = 'dnb-modal-root__inner'
    }
  }
  componentDidMount() {
    if (Modal.modalRoot && this.node) {
      Modal.modalRoot.appendChild(this.node)
    }
  }
  componentWillUnmount() {
    if (Modal.modalRoot && this.node) {
      Modal.modalRoot.removeChild(this.node)
    }
  }
  render() {
    const { children, ...props } = this.props
    if (Modal.modalRoot) {
      return ReactDOM.createPortal(
        <ModalContent {...props}>{children}</ModalContent>,
        this.node
      )
    }
    return <ModalContent {...props}>{children}</ModalContent>
  }
}

class ModalContent extends PureComponent {
  static propTypes = {
    modal_content: PropTypes.oneOfType([PropTypes.node]).isRequired,
    labelled_by: PropTypes.string,
    content_id: PropTypes.string,
    title: PropTypes.string,
    close_title: PropTypes.string,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    class: null,

    // React props
    closeModal: null,
    className: null,
    children: null
  }

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
    this._id =
      props.content_id ||
      `modal-content-${Math.round(Math.random() * 999)}`
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
    clearTimeout(this.focusTimeout)
    this.revertScrollPossibility()
    this.revertScreenReaderPossibility()
    this.revertFocusPossibility()
  }

  setFocus() {
    if (this._contentRef.current) {
      clearTimeout(this.focusTimeout)
      this.focusTimeout = setTimeout(() => {
        try {
          this._contentRef.current.focus() // in case the button is disabled
          const closeElement = this._contentRef.current.querySelector(
            '.dnb-modal__close-button'
          )
          if (closeElement) {
            closeElement.focus()
          }
        } catch (e) {
          console.log(e)
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
        console.log(e)
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
        console.log(e)
      }
    })
    this.nonModalNodes = null
  }

  preventClick = e => {
    if (e) {
      e.preventDefault()
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
      'aria-describedby': id,
      className: 'dnb-modal__content',
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
      onClick: this.preventClick,
      onTouchStart: this.preventClick,
      onKeyDown: this.onKeyDownHandler,
      ...rest
    }

    if (labelled_by) {
      contentParams['aria-labelledby'] = labelled_by
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, innerParams)

    return (
      <Fragment>
        <div {...contentParams}>
          <div ref={this._contentRef} {...innerParams}>
            {title && <h1 className="dnb-h2 dnb-modal__title">{title}</h1>}
            {hide_close_button !== true &&
              hide_close_button !== 'true' && (
                <CloseButton on_click={closeModal} title={close_title} />
              )}
            {modal_content}
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
    title={title}
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
  title: 'Close'
}
