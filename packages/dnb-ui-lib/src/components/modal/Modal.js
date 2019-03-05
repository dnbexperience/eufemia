/**
 * Web Modal Component
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import {
  isTouchDevice,
  registerElement,
  processChildren,
  validateDOMAttributes
} from '../../shared/component-helper'
import Button from '../button/Button'
// import './style/dnb-modal.scss' // no good solution to import the style here

const renderProps = {
  modal_content: null
}

export const propTypes = {
  id: PropTypes.string,
  labelled_by: PropTypes.string,
  type: PropTypes.oneOf(['button', 'text']),
  title: PropTypes.string,
  modal_trigger_text: PropTypes.string,
  modal_trigger_title: PropTypes.string,
  modal_trigger_icon: PropTypes.string,
  content_id: PropTypes.string,
  close_title: PropTypes.string,
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
  modal_content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

export const defaultProps = {
  id: null,
  labelled_by: null,
  type: 'button',
  title: null,
  modal_trigger_text: null,
  modal_trigger_title: 'Open Modal',
  modal_trigger_icon: 'question',
  content_id: null,
  close_title: 'Close Modal Window',
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
  }

  toggleOpenClose = (event, showModal = null) => {
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

    if (event) {
      event.preventDefault()
    }

    if (modalActive === false) {
      if (this._triggerRef.current) {
        this._triggerRef.current.focus()
      }
    }
  }
  show = e => {
    this.toggleOpenClose(e, true)
  }
  hide = e => {
    this.toggleOpenClose(e, false)
  }
  componentWillUnmount() {
    this.toggleOpenClose(null, false)
  }
  render() {
    const {
      id, // eslint-disable-line
      labelled_by,
      type,
      modal_trigger_text,
      modal_trigger_title,
      modal_trigger_icon,
      className,
      class: _className,
      ...rest
    } = this.props

    const { modalActive } = this.state

    const modal_content = Modal.getContent(this.props)

    const params = {
      className: classnames('dnb-modal', className, _className)
      // 'data-active': modalActive ? 'true' : 'false'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        {type === 'button' && (
          <span className="dnb-modal__trigger dnb-modal__trigger--button">
            <Button
              id={this._id}
              type="button"
              variant="secondary"
              text={modal_trigger_text}
              title={modal_trigger_title}
              icon={
                modal_trigger_text &&
                modal_trigger_icon === defaultProps.modal_trigger_icon
                  ? null
                  : modal_trigger_icon
              }
              on_click={this.toggleOpenClose}
              innerRef={this._triggerRef}
            />
          </span>
        )}

        {type === 'text' && (
          <Button
            id={this._id}
            className="dnb-modal__trigger dnb-modal__trigger--text"
            variant="tertiary"
            title={modal_trigger_title}
            text={modal_trigger_text}
            on_click={this.toggleOpenClose}
            innerRef={this._triggerRef}
          />
        )}

        {modalActive && modal_content && (
          <ModalRoot
            {...rest}
            hide={this.hide}
            labelled_by={labelled_by || this._id}
            modal_content={modal_content}
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
    hide: PropTypes.func
  }

  static defaultProps = {
    labelled_by: null,
    content_id: null,
    title: null,
    close_title: null,
    hide: null
  }

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
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
          this._contentRef.current
            .querySelector('.dnb-modal__close-button')
            .focus()
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
    e.preventDefault()
    e.stopPropagation()
  }

  onKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'esc':
        this.props.hide(e)
        e.preventDefault()
        break
    }
  }

  render() {
    const {
      title,
      labelled_by,
      content_id: id,
      modal_content,
      close_title,
      hide
    } = this.props

    const contentParams = {
      className: 'dnb-modal__content',
      onClick: hide
    }

    const innerParams = {
      id,
      rol: 'dialog',
      'aria-modal': 'true',
      tabIndex: -1,
      className: classnames(
        'dnb-modal__content__inner',
        'dnb-no-focus'
        // 'dnb-spacing'
      ),
      onClick: this.preventClick,
      onTouchStart: this.preventClick,
      onKeyDown: this.onKeyDownHandler
    }
    if (labelled_by) {
      innerParams['aria-labelledby'] = labelled_by
    }

    return (
      <Fragment>
        <div {...contentParams}>
          <div ref={this._contentRef} {...innerParams}>
            <CloseButton on_click={hide} close_title={close_title} />
            {title && <h1 className="dnb-h2 dnb-modal__title">{title}</h1>}
            {modal_content}
          </div>
        </div>
        <span className="dnb-modal__overlay" aria-hidden="true" />
      </Fragment>
    )
  }
}

export const CloseButton = ({
  on_click,
  close_title,
  className = null
}) => (
  <Button
    type="button"
    variant="secondary"
    size="medium"
    className={classnames('dnb-modal__close-button', className)}
    icon="close"
    icon_size="medium"
    title={close_title}
    on_click={on_click}
  />
)
CloseButton.propTypes = {
  on_click: PropTypes.func.isRequired,
  className: PropTypes.string,
  close_title: PropTypes.string
}
CloseButton.defaultProps = {
  className: null,
  close_title: 'Close'
}
