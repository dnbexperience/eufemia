/**
 * Web Modal Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SuffixContext } from '../../shared/helpers/Suffix'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  processChildren,
  dispatchCustomElementEvent,
  convertJsxToString
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Button from '../button/Button'
import HelpButton from '../help-button/HelpButton'
import ModalContent, { CloseButton } from './ModalContent'

const renderProps = {
  on_open: null,
  on_close: null,
  on_close_prevent: null,
  open_modal: null,
  close_modal: null,
  modal_content: null
}

const propTypes = {
  id: PropTypes.string,
  mode: PropTypes.oneOf(['modal', 'drawer']),
  labelled_by: PropTypes.string,
  title: PropTypes.node,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trigger_hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trigger_disabled: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  trigger_variant: Button.propTypes.variant,
  trigger_text: PropTypes.string,
  trigger_title: PropTypes.string,
  trigger_size: PropTypes.string,
  trigger_icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  trigger_icon_position: PropTypes.string,
  trigger_class: PropTypes.string,
  open_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content_id: PropTypes.string,
  close_title: PropTypes.string,
  hide_close_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_core_style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_animation_on_mobile: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  fullscreen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  align_content: PropTypes.oneOf(['left', 'center', 'centered', 'right']),
  container_placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  open_state: PropTypes.oneOf(['opened', 'closed']),
  direct_dom_return: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

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

const defaultProps = {
  id: null,
  mode: 'modal',
  labelled_by: null,
  title: null,
  disabled: null,
  trigger_hidden: false,
  trigger_disabled: null,
  trigger_variant: 'secondary',
  trigger_text: null,
  trigger_title: null,
  trigger_size: null,
  trigger_icon: 'question',
  trigger_icon_position: 'left',
  trigger_class: null,
  open_delay: null,
  content_id: null,
  close_title: 'Lukk', // Close Modal Window
  hide_close_button: false,
  prevent_close: false,
  prevent_core_style: false,
  no_animation: false,
  no_animation_on_mobile: false,
  fullscreen: false,
  align_content: 'left',
  container_placement: 'right',
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

export default class Modal extends React.PureComponent {
  static tagName = 'dnb-modal'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context
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
    if (typeof window === 'undefined') {
      return false
    }

    try {
      window.modalRoot = document.getElementById('dnb-modal-root') // document.querySelector('.dnb-modal-root')
      if (!window.modalRoot) {
        window.modalRoot = document.createElement('div')
        window.modalRoot.setAttribute('id', 'dnb-modal-root')
        document.body.insertBefore(
          window.modalRoot,
          document.body.firstChild
        )
      }
    } catch (e) {
      warn('Modal: Could not insert dnb-modal-root', e)
    }

    return window.modalRoot
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
    hide: false,
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

    this._onUnmount = []
  }

  componentDidMount() {
    const { open_modal } = this.props

    if (typeof open_modal === 'function') {
      const fn = open_modal(() => {
        this.toggleOpenClose(null, true)
      }, this)
      if (fn) {
        this._onUnmount.push(fn)
      }
    }
  }
  componentWillUnmount() {
    this._onUnmount.forEach((fn) => {
      if (typeof fn === 'function') {
        fn()
      }
    })
    this.setState({
      hide: true,
      modalActive: false,
      _listenForPropChanges: false
    })
    clearTimeout(this._openTimeout)
    clearTimeout(this._closeTimeout)
    clearTimeout(this._sideEffectsTimeout)
  }

  toggleOpenClose = (event = null, showModal = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    const toggleNow = () => {
      const doItNow = () => {
        this.setState({
          hide: false,
          modalActive,
          _listenForPropChanges: false
        })
      }

      const modalActive =
        showModal !== null ? showModal : !this.state.modalActive

      if (!isTrue(this.props.no_animation) && modalActive === false) {
        this.setState({
          hide: true,
          _listenForPropChanges: false
        })

        clearTimeout(this._closeTimeout)
        this._closeTimeout = setTimeout(doItNow, 300)
      } else {
        doItNow()
      }
    }

    const delay = parseFloat(this.props.open_delay)
    if (delay > 0) {
      clearTimeout(this._openTimeout)
      this._openTimeout = setTimeout(toggleNow, delay)
    } else {
      toggleNow()
    }
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
          warn(
            'Modal: Error on set "data-dnb-modal-active" by using element.setAttribute()',
            e
          )
        }
      }

      if (modalActive) {
        if (typeof this.props.close_modal === 'function') {
          const fn = this.props.close_modal(() => {
            this.isClosing = false
            this.toggleOpenClose(null, false)
          }, this)
          if (fn) {
            this._onUnmount.push(fn)
          }
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

        // because the open_state was set to opened, we force
        if (this.props.open_state === 'opened' && this.activeElement) {
          try {
            this.activeElement.focus()
            this.activeElement = null
          } catch (e) {
            //
          }
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

  open = (e) => {
    this.toggleOpenClose(e, true)
  }

  close = (e) => {
    const { prevent_close } = this.props
    if (isTrue(prevent_close)) {
      if (!this.isClosing) {
        const id = this._id
        this.isClosing = true
        dispatchCustomElementEvent(this, 'on_close_prevent', {
          id,
          close: (e) => {
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
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.Modal
    )

    const {
      id, // eslint-disable-line
      open_state, // eslint-disable-line
      open_delay, // eslint-disable-line
      preventSetTriggerRef, // eslint-disable-line
      disabled,
      labelled_by,
      trigger_hidden,
      trigger_disabled,
      trigger_variant,
      trigger_text,
      trigger_title,
      trigger_size,
      trigger_icon,
      trigger_icon_position,
      trigger_class,
      ...rest
    } = props

    const { modalActive, currentActiveState } = this.state
    const modal_content = Modal.getContent(this.props)

    if (modalActive !== currentActiveState) {
      // store the active element to set back the focus later on
      if (!this.activeElement && typeof document !== 'undefined') {
        this.activeElement = document.activeElement
      }

      clearTimeout(this._sideEffectsTimeout)
      this._sideEffectsTimeout = setTimeout(this.handleSideEffects, 1)
      // delay the dispatch to make sure we are after the render cycles
      // this way have the content instead by the time we call this event
    }

    return (
      <SuffixContext.Consumer>
        {(suffixProps) => {
          const trigger_attributes = {}
          const additional = {}

          const icon =
            trigger_icon !== 'question'
              ? trigger_icon
              : (!trigger_text || trigger_variant === 'tertiary') &&
                trigger_icon

          const useHelpButton =
            (icon === 'question' || icon === 'information') &&
            !isTrue(trigger_hidden)

          // in case the modal is used in suffix and no title is given
          // suffixProps.label is also available, so we could use that too
          if (!rest.title && useHelpButton && suffixProps) {
            additional.title = this.context.translation.Modal.more_info
          }

          let ariaLabel = null
          if (useHelpButton) {
            ariaLabel =
              props['aria-label'] ||
              trigger_title ||
              props.title ||
              additional.title

            if (React.isValidElement(ariaLabel)) {
              ariaLabel = convertJsxToString(ariaLabel)
            }
          }

          return (
            <div className="dnb-modal">
              {!isTrue(trigger_hidden) && (
                <HelpButton
                  id={this._id}
                  variant={trigger_variant}
                  text={trigger_text}
                  title={ariaLabel}
                  disabled={disabled || trigger_disabled}
                  icon={icon}
                  size={trigger_size}
                  icon_position={trigger_icon_position}
                  on_click={this.toggleOpenClose}
                  className={classnames(
                    'dnb-modal__trigger',
                    createSpacingClasses(props),
                    trigger_class
                  )}
                  innerRef={this._triggerRef}
                  {...trigger_attributes}
                />
              )}
              {modalActive && modal_content && (
                <ModalRoot
                  {...rest}
                  labelled_by={labelled_by || this._id}
                  modal_content={modal_content}
                  closeModal={this.close}
                  hide={this.state.hide}
                  toggleOpenClose={this.toggleOpenClose}
                  {...additional}
                />
              )}
            </div>
          )
        }}
      </SuffixContext.Consumer>
    )
  }
}

Modal.HelpButton = HelpButton

class ModalRoot extends React.PureComponent {
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
        if (window.modalRoot && this.node) {
          window.modalRoot.appendChild(this.node)
        }
      } catch (e) {
        warn(e)
      }
      this.setState({ isMonted: true })
    }
  }

  componentWillUnmount() {
    if (window.modalRoot && this.node) {
      this.setState({ isMonted: false })
      window.modalRoot.removeChild(this.node)
      this.node = null
    }
  }
  render() {
    const { children, direct_dom_return, ...props } = this.props
    if (isTrue(direct_dom_return)) {
      return <ModalContent {...props}>{children}</ModalContent>
    }
    if (this.state.isMonted && window.modalRoot && this.node) {
      return ReactDOM.createPortal(
        <ModalContent {...props}>{children}</ModalContent>,
        this.node
      )
    }
    return null
  }
}

export { CloseButton }
