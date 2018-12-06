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
  type: PropTypes.oneOf(['button', 'text']),
  title: PropTypes.string,
  modal_trigger_text: PropTypes.string,
  modal_trigger_title: PropTypes.string,
  modal_trigger_icon: PropTypes.string,
  content_id: PropTypes.string,
  close_title: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  // Web Component props
  modal_content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

export const defaultProps = {
  type: 'button',
  title: null,
  modal_trigger_text: null,
  modal_trigger_title: 'Open Modal',
  modal_trigger_icon: 'question',
  content_id: null,
  close_title: 'Close',
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

let modalRoot // gets later '.dnb-modal-root'

export default class Modal extends PureComponent {
  static tagName = 'dnb-modal'
  static propTypes = propTypes
  static defaultProps = defaultProps

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

  state = {
    modalActive: false
  }

  constructor(props) {
    super(props)
    if (!props.preventSetTriggerRef) {
      this._triggerRef = React.createRef()
    }
  }

  toggleOpenClose = (event, showModal = null) => {
    const modalActive =
      showModal !== null ? showModal : !this.state.modalActive
    this.setState({
      modalActive
    })

    if (event) {
      event.preventDefault()
    }

    try {
      if (typeof document !== 'undefined')
        document
          .querySelector('body')
          .setAttribute(
            'data-modal-active',
            modalActive ? 'true' : 'false'
          )
    } catch (e) {
      console.log(
        'Error on set "data-modal-active" by using element.setAttribute()',
        e
      )
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
  componentDidMount() {
    if (!modalRoot) {
      modalRoot = document.getElementById('dnb-modal-root') // document.querySelector('.dnb-modal-root')
    }
  }
  componentWillUnmount() {
    this.toggleOpenClose(null, false)
  }
  render() {
    const {
      type,
      modal_trigger_text,
      modal_trigger_title,
      modal_trigger_icon,
      className,
      class: _className
    } = this.props

    const modal_content = Modal.getContent(this.props)

    const params = {
      className: classnames('dnb-modal', className, _className)
      // 'data-active': this.state.modalActive ? 'true' : 'false'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        {type === 'button' && (
          <span className="dnb-modal__trigger dnb-modal__trigger--button">
            <Button
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
            className="dnb-modal__trigger dnb-modal__trigger--text"
            variant="tertiary"
            title={modal_trigger_title}
            text={modal_trigger_text}
            on_click={this.toggleOpenClose}
            innerRef={this._triggerRef}
          />
        )}

        {this.state.modalActive && modal_content && (
          <ModalRoot
            {...this.props}
            toggleOpenClose={this.toggleOpenClose}
            hide={this.hide}
            modal_content={modal_content}
          />
        )}
      </div>
    )
  }
}

class ModalRoot extends PureComponent {
  constructor(props) {
    super(props)
    if (modalRoot) {
      this.node = document.createElement('div')
      this.node.className = 'dnb-modal-root__inner'
    }
  }
  componentDidMount() {
    if (modalRoot && this.node) {
      modalRoot.appendChild(this.node)
    }
  }
  componentWillUnmount() {
    if (modalRoot && this.node) {
      modalRoot.removeChild(this.node)
    }
  }
  render() {
    const { children, ...props } = this.props
    if (modalRoot) {
      return ReactDOM.createPortal(
        <ModalContent {...props}>{children}</ModalContent>,
        this.node
      )
    }
    return <ModalContent {...props}>{children}</ModalContent>
  }
}

class ModalContent extends PureComponent {
  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
  }
  componentDidMount() {
    this.removeFocusPossibility()
    if (this._contentRef.current) {
      this._contentRef.current.focus()
    }
  }
  componentWillUnmount() {
    this.reverseFocusPossibility()
  }

  removeFocusPossibility() {
    if (typeof document === 'undefined') return
    const modalNodes = Array.from(
      document.querySelectorAll('.dnb-modal__content *')
    )

    // by only finding elements that do not have tabindex="-1" we ensure we don't
    // corrupt the previous state of the element if a modal was already open
    this.nonModalNodes = document.querySelectorAll(
      'body *:not(.dnb-modal__content):not([tabindex="-1"])'
    )

    for (let i = 0, l = this.nonModalNodes.length; i < l; i++) {
      const node = this.nonModalNodes[i]

      if (!modalNodes.includes(node)) {
        // save the previous tabindex state so we can restore it on close
        node._prevTabindex = node.getAttribute('tabindex')
        node.setAttribute('tabindex', -1)

        // tabindex=-1 does not prevent the mouse from focusing the node (which
        // would show a focus outline around the element). prevent this by disabling
        // outline styles while the modal is open
        // @see https://www.sitepoint.com/when-do-elements-take-the-focus/
        node.style.outline = 'none'
      }
    }
  }
  reverseFocusPossibility() {
    if (!this.nonModalNodes) return
    // restore or remove tabindex from nodes
    for (let i = 0, l = this.nonModalNodes.length; i < l; i++) {
      const node = this.nonModalNodes[i]
      if (node._prevTabindex) {
        node.setAttribute('tabindex', node._prevTabindex)
        node._prevTabindex = null
      } else {
        node.removeAttribute('tabindex')
      }
      node.style.outline = null
    }
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
      content_id: id,
      modal_content,
      close_title,
      hide
    } = this.props

    const params = {
      id,
      'aria-labelledby': title
    }

    return (
      <Fragment>
        <div
          aria-hidden="true"
          className="dnb-modal__content"
          onClick={hide}
        >
          <div
            ref={this._contentRef}
            role="dialog"
            aria-hidden="true"
            aria-modal="true"
            tabIndex="-1"
            className="dnb-modal__content__inner dnb-no-focus dnb-style"
            onClick={this.preventClick}
            onKeyDown={this.onKeyDownHandler}
            {...params}
          >
            {modal_content}
            <CloseButton on_click={hide} close_title={close_title} />
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
    className={classnames('dnb-modal__close-button', className)}
    icon="close"
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
