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
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Button from '../button/Button'
import Section from '../section/Section'
import HelpButtonInstance from '../help-button/HelpButtonInstance'
import ModalContent, {
  CloseButton,
  getListOfModalRoots
} from './ModalContent'

export default class Modal extends React.PureComponent {
  static tagName = 'dnb-modal'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    root_id: PropTypes.string,
    mode: PropTypes.oneOf(['modal', 'drawer']),
    labelled_by: PropTypes.string,
    title: PropTypes.node,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    animation_duration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation_on_mobile: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    fullscreen: PropTypes.oneOf(['auto', true, false, 'true', 'false']),
    align_content: PropTypes.oneOf([
      'left',
      'center',
      'centered',
      'right'
    ]),
    container_placement: PropTypes.oneOf([
      'left',
      'right',
      'top',
      'bottom'
    ]),
    open_state: PropTypes.oneOf(['opened', 'closed']),
    direct_dom_return: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    class: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    on_open: PropTypes.func,
    on_close: PropTypes.func,
    on_close_prevent: PropTypes.func,
    open_modal: PropTypes.func,
    close_modal: PropTypes.func,

    // All "trigger_" are deprecated
    trigger_attributes: PropTypes.object,
    trigger_hidden: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
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

    modal_content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    id: null,
    root_id: 'root',
    mode: 'modal',
    labelled_by: null,
    title: null,
    disabled: null,
    spacing: true,
    open_delay: null,
    content_id: null,
    close_title: 'Lukk', // Close Modal Window
    hide_close_button: false,
    prevent_close: false,
    prevent_core_style: false,
    animation_duration: 300, // Not documented!
    no_animation: false,
    no_animation_on_mobile: false,
    fullscreen: 'auto',
    align_content: 'left',
    container_placement: 'right',
    open_state: null,
    direct_dom_return: false,
    class: null,

    className: null,
    children: null,

    on_open: null,
    on_close: null,
    on_close_prevent: null,
    open_modal: null,
    close_modal: null,

    // All "trigger_" are deprecated
    trigger_attributes: null,
    trigger_hidden: false,
    trigger_disabled: null,
    trigger_variant: 'secondary',
    trigger_text: null,
    trigger_title: null,
    trigger_size: null,
    trigger_icon: null,
    trigger_icon_position: 'left',
    trigger_class: null,

    modal_content: null
  }

  static enableWebComponent() {
    registerElement(Modal.tagName, Modal, Modal.defaultProps)
  }

  static getContent(props) {
    if (typeof props.modal_content === 'string') {
      return props.modal_content
    } else if (typeof props.modal_content === 'function') {
      return props.modal_content(props)
    }
    return processChildren(props)
  }

  static insertModalRoot(id) {
    if (typeof window === 'undefined') {
      return false
    }

    try {
      id = `dnb-modal-${id || 'root'}`
      window.__modalRoot = document.getElementById(id)
      if (!window.__modalRoot) {
        window.__modalRoot = document.createElement('div')
        window.__modalRoot.setAttribute('id', id)
        document.body.insertBefore(
          window.__modalRoot,
          document.body.firstChild
        )
      }
    } catch (e) {
      warn('Modal: Could not insert dnb-modal-root', e)
    }

    return window.__modalRoot
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.open_state !== state._open_state) {
        switch (props.open_state) {
          case 'opened':
            state.modalActive = true
            break
          case 'closed':
            state.modalActive = false
            break
        }
      }
    }
    state._listenForPropChanges = true
    state._open_state = props.open_state

    return state
  }

  state = {
    hide: false,
    modalActive: false,
    currentActiveState: false,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId()

    this._triggerRef = React.createRef()

    this._onUnmount = []
  }

  componentDidMount() {
    const { open_modal } = this.props

    if (typeof open_modal === 'function') {
      const fn = open_modal(() => {
        this.toggleOpenClose(true)
      }, this)
      if (fn) {
        this._onUnmount.push(fn)
      }
    }

    this.handleSideEffects()
  }

  componentWillUnmount() {
    this._onUnmount.forEach((fn) => {
      if (typeof fn === 'function') {
        fn()
      }
    })

    clearTimeout(this._openTimeout)
    clearTimeout(this._closeTimeout)
    clearTimeout(this._sideEffectsTimeout)
    clearTimeout(this._tryToOpenTimeout)
  }

  componentDidUpdate(props) {
    const { modalActive, currentActiveState } = this.state

    if (modalActive !== currentActiveState) {
      // store the active element to set back the focus later on
      if (!this.activeElement && typeof document !== 'undefined') {
        this.activeElement = document.activeElement
      }

      if (isTrue(this.props.no_animation)) {
        this.handleSideEffects()
      } else {
        clearTimeout(this._sideEffectsTimeout)
        this._sideEffectsTimeout = setTimeout(
          () => this.handleSideEffects(),
          1
        )
        // delay the dispatch to make sure we are after the render cycles
        // this way have the content instead by the time we call this event
      }
    } else {
      if (
        !this.isClosing &&
        !modalActive &&
        props.open_state === 'opened'
      ) {
        this.toggleOpenClose(true)
      }
    }
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

  toggleOpenClose = (showModal = null, event = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    const toggleNow = () => {
      const modalActive =
        showModal !== null ? showModal : !this.state.modalActive

      this.isClosing = true

      const doItNow = () => {
        this.setState(
          {
            hide: false,
            modalActive,
            _listenForPropChanges: false
          },
          () => {
            clearTimeout(this._closeTimeout)
            this._closeTimeout = setTimeout(() => {
              this.isClosing = false
            }, 1) // delay because the hidden trigger, and close/open routine in "componentDidUpdate"
          }
        )
      }

      if (modalActive === false && !isTrue(this.props.no_animation)) {
        this.setState({
          hide: true,
          _listenForPropChanges: false
        })

        clearTimeout(this._closeTimeout)
        this._closeTimeout = setTimeout(
          doItNow,
          parseFloat(this.props.animation_duration)
        ) // delay because of the animation
      } else {
        doItNow()
      }
    }

    const delay = parseFloat(this.props.open_delay)
    if (delay > 0 && !isTrue(this.props.no_animation)) {
      clearTimeout(this._openTimeout)
      this._openTimeout = setTimeout(toggleNow, delay) // custom delay
    } else {
      toggleNow()
    }
  }

  handleSideEffects = () => {
    if (!isTrue(this.props.direct_dom_return)) {
      Modal.insertModalRoot(this.props.root_id)
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
            this.toggleOpenClose(false)
          }, this)
          if (fn) {
            this._onUnmount.push(fn)
          }
        }
      }

      const id = this._id
      const wasActive = this.wasActive
      this.wasActive = modalActive

      if (modalActive) {
        this.addToIndex()
        dispatchCustomElementEvent(this, 'on_open', { id })
      } else if (wasActive) {
        dispatchCustomElementEvent(this, 'on_close', { id })
        this.removeFromIndex()
      }

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
      () => runSideEffect()
    )
  }

  open = (e) => {
    this.toggleOpenClose(true, e)
  }

  close = (event, { ifIsLatest, triggeredBy } = { ifIsLatest: true }) => {
    const { prevent_close } = this.props

    if (isTrue(prevent_close)) {
      const id = this._id
      dispatchCustomElementEvent(this, 'on_close_prevent', {
        id,
        event,
        triggeredBy,
        close: (e) => {
          this.toggleOpenClose(false, e)
        }
      })
    } else {
      if (ifIsLatest && typeof window !== 'undefined') {
        try {
          const last = getListOfModalRoots(-1)
          if (last !== this) {
            return // stop here
          }
        } catch (e) {
          warn(e)
        }
      }

      this.toggleOpenClose(false, event)
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Modal.defaultProps,
      this.context.formRow,
      this.context.translation.Modal
    )

    const {
      root_id,
      content_id,
      id, // eslint-disable-line
      open_state, // eslint-disable-line
      open_delay, // eslint-disable-line
      disabled,
      spacing,
      labelled_by,

      // All "trigger_" are deprecated
      trigger_attributes,
      trigger_hidden,
      trigger_disabled, // eslint-disable-line
      trigger_variant, // eslint-disable-line
      trigger_text, // eslint-disable-line
      trigger_title, // eslint-disable-line
      trigger_size, // eslint-disable-line
      trigger_icon, // eslint-disable-line
      trigger_icon_position, // eslint-disable-line
      trigger_class, // eslint-disable-line

      ...rest
    } = props

    const { modalActive } = this.state
    const modal_content = Modal.getContent(this.props)

    const render = (suffixProps) => {
      const modalProps = {}
      const triggerAttributes = trigger_attributes
        ? { ...trigger_attributes }
        : {}

      // Deprecated - this is only to handle the legacy Modal trigger button
      for (let prop in props) {
        if (prop.includes('trigger_') && props[prop] !== null) {
          const name = String(prop).replace('trigger_', '')
          if (name !== 'props' && prop !== 'element') {
            triggerAttributes[name] = props[prop]
          }
        }
      }

      const isHelpButton =
        !isTrue(trigger_hidden) &&
        (!!suffixProps ||
          (!(trigger_text && trigger_variant !== 'tertiary') &&
            (!(triggerAttributes.icon || trigger_icon) ||
              ['question', 'information'].includes(
                triggerAttributes.icon || trigger_icon
              ))))

      if (isTrue(disabled)) {
        triggerAttributes.disabled = true
      }
      if (triggerAttributes.id) {
        this._id = triggerAttributes.id
      }

      if (!rest.title && triggerAttributes.title) {
        modalProps.title = triggerAttributes.title
      }
      // in case the modal is used in suffix and no title is given
      // suffixProps.label is also available, so we could use that too
      else if (!rest.title && isHelpButton && suffixProps) {
        modalProps.title = this.context.translation.HelpButton.title
      }

      if (isHelpButton) {
        triggerAttributes.title =
          props['aria-label'] ||
          triggerAttributes.title ||
          props.title ||
          modalProps.title
      } else {
        triggerAttributes['aria-roledescription'] = null
      }

      const TriggerButton = HelpButtonInstance

      return (
        <div className="dnb-modal">
          {TriggerButton && !isTrue(trigger_hidden) && (
            <TriggerButton
              id={this._id}
              onClick={this.toggleOpenClose}
              {...triggerAttributes}
              innerRef={this._triggerRef}
              className={classnames(
                'dnb-modal__trigger',
                createSpacingClasses(props),
                triggerAttributes.class,
                triggerAttributes.className
              )}
            />
          )}

          {modalActive && modal_content && (
            <ModalRoot
              {...rest}
              root_id={root_id}
              content_id={content_id || `dnb-modal-${this._id}`}
              labelled_by={labelled_by || this._id}
              modal_content={modal_content}
              spacing={spacing}
              closeModal={this.close}
              hide={this.state.hide}
              toggleOpenClose={this.toggleOpenClose}
              {...modalProps}
            />
          )}
        </div>
      )
    }

    return <SuffixContext.Consumer>{render}</SuffixContext.Consumer>
  }
}

class ModalRoot extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
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
    id: null,
    direct_dom_return: false,
    children: null
  }

  state = {
    isMounted: false
  }

  componentDidMount() {
    if (!isTrue(this.props.direct_dom_return)) {
      Modal.insertModalRoot(this.props.id)

      try {
        if (!this.portalElem) {
          this.portalElem = document.createElement('div')
          this.portalElem.className = 'dnb-modal-root__inner'
        }
        if (
          this.portalElem &&
          typeof window !== 'undefined' &&
          window.__modalRoot
        ) {
          window.__modalRoot.appendChild(this.portalElem)
        }
      } catch (e) {
        warn(e)
      }
      this.setState({ isMounted: true })
    }
  }

  componentWillUnmount() {
    try {
      if (
        this.portalElem &&
        typeof window !== 'undefined' &&
        window.__modalRoot &&
        window.__modalRoot.removeChild
      ) {
        window.__modalRoot.removeChild(this.portalElem)
        this.portalElem = null
      }
    } catch (e) {
      warn(e)
    }
  }

  render() {
    const { children, direct_dom_return, ...props } = this.props

    if (isTrue(direct_dom_return)) {
      return <ModalContent {...props}>{children}</ModalContent>
    }

    if (
      this.portalElem &&
      typeof window !== 'undefined' &&
      window.__modalRoot &&
      this.state.isMounted
    ) {
      return ReactDOM.createPortal(
        <ModalContent {...props}>{children}</ModalContent>,
        this.portalElem
      )
    }

    return null
  }
}

export { CloseButton }

function Inner({ className, ...props }) {
  return (
    <Section
      style_type="black-3"
      className={classnames('dnb-modal__wrapper__inner', className)}
      {...props}
    />
  )
}
Inner.propTypes = {
  className: PropTypes.string
}
Inner.defaultProps = {
  className: null
}
Modal.Inner = Inner
