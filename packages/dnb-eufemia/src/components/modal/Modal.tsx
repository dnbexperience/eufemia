/**
 * Web Modal Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
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
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import HelpButtonInstance from '../help-button/HelpButtonInstance'
import ModalContent, {
  getListOfModalRoots,
  getModalRoot,
} from './ModalContent'
import ModalContext from './ModalContext'
import ModalInner from './ModalInner'
import ModalHeader, { ModalHeaderBar, CloseButton } from './ModalHeader'
import { ModalProps, ModalRootProps } from './types'

export const ANIMATION_DURATION = 300

interface ModalState {
  hide: boolean
  modalActive: boolean
}

export default class Modal extends React.PureComponent<
  ModalProps & React.HTMLProps<HTMLElement>,
  ModalState
> {
  static tagName = 'dnb-modal'
  static contextType = Context
  static Bar = ModalHeaderBar
  static Header = ModalHeader
  static Content = ModalInner
  static Inner = ModalInner // deprecated

  _id: string
  _triggerRef: React.RefObject<any>
  _onUnmount: Array<() => void>
  _openTimeout: NodeJS.Timeout
  _closeTimeout: NodeJS.Timeout
  _sideEffectsTimeout: NodeJS.Timeout
  _tryToOpenTimeout: NodeJS.Timeout
  activeElement: Element
  isInTransition: boolean

  state = {
    hide: false,
    modalActive: false,
  }

  static defaultProps = {
    id: null,
    root_id: 'root',
    mode: 'modal',
    focus_selector: null,
    labelled_by: null,
    title: null,
    disabled: null,
    spacing: true,
    open_delay: null,
    content_id: null,
    dialog_title: 'Vindu',
    close_title: 'Lukk', // Close Modal Window
    hide_close_button: false,
    close_button_attributes: null,
    prevent_close: false,
    prevent_core_style: false,
    animation_duration: ANIMATION_DURATION, // Not documented!
    no_animation: false,
    no_animation_on_mobile: false,
    fullscreen: 'auto',
    min_width: null,
    max_width: null,
    align_content: null,
    container_placement: null,
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
    trigger: null,
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

    overlay_class: null,
    content_class: null,

    modal_content: null,
    header_content: null,
    bar_content: null,
  }

  static enableWebComponent() {
    registerElement(Modal?.tagName, Modal, Modal.defaultProps)
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
    if (props.open_state !== state._open_state) {
      switch (props.open_state) {
        case 'opened':
        case true:
          state.hide = false
          if (isTrue(props.no_animation)) {
            state.modalActive = true
          }
          break
        case 'closed':
        case false:
          state.hide = true
          if (isTrue(props.no_animation)) {
            state.modalActive = false
          }
          break
      }
    }
    state._open_state = props.open_state

    return state
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId('modal-')

    this._triggerRef = React.createRef()

    this._onUnmount = []
  }

  componentDidMount() {
    this.openBasedOnStateUpdate()
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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.openBasedOnStateUpdate()
    }
  }

  openBasedOnStateUpdate() {
    const { hide, modalActive } = this.state
    const { open_state } = this.props

    if (!this.activeElement && typeof document !== 'undefined') {
      this.activeElement = document.activeElement
    }

    if (
      !hide &&
      !modalActive &&
      (open_state === 'opened' || open_state === true)
    ) {
      this.toggleOpenClose(null, true)
    } else if (
      hide &&
      modalActive &&
      (open_state === 'closed' || open_state === false)
    ) {
      this.toggleOpenClose(null, false)
    }
  }

  toggleOpenClose = (event = null, showModal = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    const toggleNow = () => {
      const { animation_duration, no_animation } = this.props
      const timeoutDuration =
        typeof animation_duration === 'string'
          ? parseFloat(animation_duration)
          : animation_duration

      const modalActive =
        typeof showModal === 'boolean'
          ? showModal
          : !this.state.modalActive

      this.isInTransition = true

      const doItNow = () => {
        this.setState(
          {
            hide: false,
            modalActive,
          },
          () => {
            this.isInTransition = false
            this.handleSideEffects()
          }
        )
      }

      if (modalActive === false && !isTrue(no_animation)) {
        this.setState({
          hide: true,
        })

        clearTimeout(this._closeTimeout)
        this._closeTimeout = setTimeout(doItNow, timeoutDuration) // delay because of the animation
      } else {
        doItNow()
      }
    }

    const waitBeforeOpen = () => {
      const { open_delay, no_animation } = this.props
      const delay =
        typeof open_delay === 'string'
          ? parseFloat(open_delay)
          : open_delay
      if (delay > 0 && !isTrue(no_animation)) {
        clearTimeout(this._openTimeout)
        this._openTimeout = setTimeout(toggleNow, delay) // custom delay
      } else {
        toggleNow()
      }
    }

    const { open_modal } = this.props
    if (typeof open_modal === 'function') {
      const fn = open_modal(waitBeforeOpen, this)
      if (fn) {
        this._onUnmount.push(fn)
      }
    } else {
      waitBeforeOpen()
    }
  }

  handleSideEffects = () => {
    const { modalActive } = this.state
    const { close_modal } = this.props

    if (modalActive) {
      if (typeof close_modal === 'function') {
        const fn = close_modal(() => {
          this.toggleOpenClose(null, false)
        }, this)
        if (fn) {
          this._onUnmount.push(fn)
        }
      }

      this.setActiveState(this._id)
    } else if (modalActive === false) {
      if (this._triggerRef && this._triggerRef.current) {
        this._triggerRef.current.focus({ preventScroll: true })
      }

      // because the open_state was set to opened, we force
      if (
        (this.props.open_state === 'opened' ||
          this.props.open_state === true) &&
        this.activeElement &&
        this.activeElement instanceof HTMLElement
      ) {
        try {
          this.activeElement.focus({ preventScroll: true })
          this.activeElement = null
        } catch (e) {
          //
        }
      }

      const last = getModalRoot(-1)
      if (last) {
        this.setActiveState(last._id)
      } else if (getListOfModalRoots().length <= 1) {
        this.setActiveState(undefined)
      }
    }
  }

  open = (e: Event) => {
    this.toggleOpenClose(e, true)
  }

  close = (
    event: Event,
    { ifIsLatest, triggeredBy = null } = { ifIsLatest: true }
  ) => {
    const { prevent_close } = this.props

    if (isTrue(prevent_close)) {
      const id = this._id
      dispatchCustomElementEvent(this, 'on_close_prevent', {
        id,
        event,
        triggeredBy,
        close: (e) => {
          this.toggleOpenClose(e, false)
        },
      })
    } else {
      if (ifIsLatest) {
        const list = getListOfModalRoots()
        if (list.length > 1) {
          const last = getModalRoot(-1)
          if (last !== this) {
            return // stop here
          }
        }
      }

      this.toggleOpenClose(event, false)
    }
  }

  setActiveState(modalId: string) {
    // prevent scrolling on the background
    if (typeof document !== 'undefined') {
      try {
        if (modalId) {
          document.documentElement.setAttribute(
            'data-dnb-modal-active',
            modalId
          )
        } else {
          document.documentElement.removeAttribute('data-dnb-modal-active')
        }

        // Deprecated
        document.body.setAttribute(
          'data-dnb-modal-active',
          modalId ? 'true' : 'false'
        )
      } catch (e) {
        warn(
          'Modal: Error on set "data-dnb-modal-active" by using element.setAttribute()',
          e
        )
      }
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Modal.defaultProps,
      this.context.getTranslation(this.props).Modal,
      this.context.FormRow,
      this.context.Modal
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
      focus_selector,
      header_content,
      bar_content,

      // All "trigger_" are deprecated
      trigger,
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

    const { hide, modalActive } = this.state
    const modal_content = Modal.getContent(
      typeof this.props.children === 'function'
        ? Object.freeze({ ...this.props, close: this.close })
        : this.props
    )

    const render = (suffixProps) => {
      const modalProps: { title?: string } = {}
      const triggerAttributes = { ...trigger_attributes }

      // Deprecated - this is only to handle the legacy Modal trigger button
      //eslint-disable-next-line
      for (let prop in props) {
        if (prop.includes('trigger_') && props[prop] !== null) {
          const name = String(prop).replace('trigger_', '')
          if (
            name !== 'attributes' &&
            name !== 'props' &&
            prop !== 'element'
          ) {
            triggerAttributes[name] = props[prop]
          }
        }
      }

      if (triggerAttributes.id) {
        this._id = triggerAttributes.id
      }

      if (!rest.title && triggerAttributes.title) {
        modalProps.title = triggerAttributes.title
      }
      // in case the modal is used in suffix and no title is given
      // suffixProps.label is also available, so we could use that too
      else if (!rest.title && suffixProps) {
        modalProps.title = this.context.translation.HelpButton.title
      }

      if (isTrue(disabled)) {
        triggerAttributes.disabled = true
      }

      const TriggerButton = trigger ? trigger : HelpButtonInstance

      return (
        <ModalContext.Provider value={{ id: this._id, ...rest }}>
          {TriggerButton && !isTrue(trigger_hidden) && (
            <TriggerButton
              id={this._id}
              title={
                !triggerAttributes.text
                  ? props.title || modalProps.title
                  : null
              }
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
              id={this._id}
              root_id={root_id}
              content_id={content_id || `dnb-modal-${this._id}`}
              labelled_by={labelled_by}
              focus_selector={focus_selector}
              modal_content={modal_content}
              header_content={header_content}
              bar_content={bar_content}
              spacing={spacing}
              closeModal={this.close}
              hide={hide}
              toggleOpenClose={this.toggleOpenClose}
              {...modalProps}
            />
          )}
        </ModalContext.Provider>
      )
    }

    return <SuffixContext.Consumer>{render}</SuffixContext.Consumer>
  }
}

interface ModalRootState {
  isMounted: boolean
}
class ModalRoot extends React.PureComponent<
  ModalRootProps & React.HTMLProps<HTMLElement>,
  ModalRootState
> {
  portalElem: HTMLDivElement | null
  static defaultProps = {
    id: null,
    root_id: null,
    direct_dom_return: false,
    children: null,
  }

  state = {
    isMounted: false,
  }

  componentDidMount() {
    const { direct_dom_return, root_id } = this.props
    if (!isTrue(direct_dom_return)) {
      Modal.insertModalRoot(root_id)

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
    const {
      children,
      direct_dom_return,
      ref, //eslint-disable-line
      ...props
    } = this.props

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
