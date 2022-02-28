/**
 * Web Modal Component
 *
 */

import React from 'react'
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
import { getListOfModalRoots, getModalRoot } from './helpers'
import ModalInner from './parts/ModalInner'
import { ModalProps } from './types'

import ModalHeader from './parts/ModalHeader'
import ModalHeaderBar from './parts/ModalHeaderBar'
import { ScrollViewProps } from '../../fragments/scroll-view/ScrollView'
import CloseButton from './parts/CloseButton'
import ModalRoot from './ModalRoot'
import { ISpacingProps } from '../../shared/interfaces'
import {
  classWithCamelCaseProps,
  ToCamelCasePartial,
} from '../../shared/helpers/withCamelCaseProps'

export const ANIMATION_DURATION = 300

interface ModalState {
  hide: boolean
  modalActive: boolean
}

export type ModalPropTypes = ModalProps & ISpacingProps & ScrollViewProps

class Modal extends React.PureComponent<
  ModalPropTypes & ToCamelCasePartial<ModalPropTypes>,
  ModalState
> {
  static contextType = Context
  static tagName = 'dnb-modal'
  static Bar = ModalHeaderBar
  static Header = ModalHeader
  static Content = ModalInner
  static Inner = ModalInner // deprecated

  static getContent(props) {
    if (typeof props.modal_content === 'string') {
      return props.modal_content
    } else if (typeof props.modal_content === 'function') {
      return props.modal_content(props)
    }
    return processChildren(props)
  }
  static enableWebComponent() {
    registerElement(Modal?.tagName, Modal, Modal.defaultProps)
  }

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
    align_content: 'left',
    container_placement: null,
    open_state: null,
    direct_dom_return: false,
    class: null,
    root_id: 'root',

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
    clearTimeout(this._openTimeout)
    clearTimeout(this._closeTimeout)

    this.removeActiveState()

    this._onUnmount.forEach((fn) => {
      if (typeof fn === 'function') {
        fn()
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.openBasedOnStateUpdate()
    }
  }

  openBasedOnStateUpdate() {
    const { hide } = this.state
    const { open_state } = this.props

    if (!this.activeElement && typeof document !== 'undefined') {
      this.activeElement = document.activeElement
    }

    if (!hide && (open_state === 'opened' || open_state === true)) {
      this.toggleOpenClose(null, true)
    } else if (hide && (open_state === 'closed' || open_state === false)) {
      this.toggleOpenClose(null, false)
    }
  }

  toggleOpenClose = (event = null, showModal = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    const toggleNow = () => {
      const {
        animation_duration = ANIMATION_DURATION,
        no_animation = false,
      } = this.props
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
        this._openTimeout = setTimeout(toggleNow, delay) // custom delay
      } else {
        toggleNow()
      }
    }

    clearTimeout(this._closeTimeout)
    clearTimeout(this._openTimeout)

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

      this.removeActiveState()
    }
  }

  open = (e: Event) => {
    this.toggleOpenClose(e, true)
  }

  close = (
    event: Event,
    { ifIsLatest, triggeredBy = null } = { ifIsLatest: true }
  ) => {
    const { prevent_close = false } = this.props

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

  removeActiveState() {
    const last = getModalRoot(-1)

    // If this instance is not the last one,
    // make the current one to as the active one
    if (last?._id && last._id !== this._id) {
      return this.setActiveState(last._id)
    }

    try {
      document.documentElement.removeAttribute('data-dnb-modal-active')

      // Deprecated
      document.body.setAttribute('data-dnb-modal-active', 'false')
    } catch (e) {
      warn('Modal: Error on remove "data-dnb-modal-active"', e)
    }
  }

  /**
   * Prevent scrolling on the background
   * But checks if this instance was the last one or not
   *
   * @param {string} modalId Will remove the attribute if false is given
   */
  setActiveState(modalId: string) {
    if (!modalId) {
      warn('Modal: A valid modalId is required')
    }
    // prevent scrolling on the background
    if (typeof document !== 'undefined') {
      try {
        document.documentElement.setAttribute(
          'data-dnb-modal-active',
          modalId
        )

        // Deprecated
        document.body.setAttribute('data-dnb-modal-active', 'true')
      } catch (e) {
        warn('Modal: Error on set "data-dnb-modal-active"', e)
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
      root_id = 'root',
      content_id = null,
      disabled = null,
      labelled_by = null,
      focus_selector = null,
      header_content = null,
      bar_content = null,

      id, // eslint-disable-line
      open_state, // eslint-disable-line
      open_delay, // eslint-disable-line

      // All "trigger_" are deprecated
      trigger = null,
      trigger_attributes = null,
      trigger_hidden = 'false',
      trigger_disabled = null,
      trigger_variant = 'secondary',
      trigger_text = null,
      trigger_title = null,
      trigger_size = null,
      trigger_icon,
      trigger_icon_position = 'left',
      trigger_class = null,

      ...rest
    } = props

    const { hide, modalActive } = this.state
    const modal_content = Modal.getContent(
      typeof this.props.children === 'function'
        ? Object.freeze({ ...this.props, close: this.close })
        : this.props
    )

    const render = (suffixProps) => {
      const triggerAttributes = {
        hidden: trigger_hidden,
        disabled: trigger_disabled,
        variant: trigger_variant,
        text: trigger_text,
        title: trigger_title,
        size: trigger_size,
        icon: trigger_icon,
        icon_position: trigger_icon_position,
        class: trigger_class,
        ...trigger_attributes,
      }
      if (isTrue(disabled)) {
        triggerAttributes.disabled = true
      }

      if (triggerAttributes.id) {
        this._id = triggerAttributes.id
      }

      let fallbackTitle: string
      if (triggerAttributes.title) {
        fallbackTitle = triggerAttributes.title
      }
      // in case the modal is used in suffix and no title is given
      // suffixProps.label is also available, so we could use that too
      else if (suffixProps) {
        fallbackTitle = this.context.translation.HelpButton.title
      }

      const TriggerButton = trigger ? trigger : HelpButtonInstance

      return (
        <>
          {TriggerButton && !isTrue(trigger_hidden) && (
            <TriggerButton
              {...triggerAttributes}
              id={this._id}
              title={
                !triggerAttributes.text
                  ? rest.title || fallbackTitle
                  : null
              }
              onClick={this.toggleOpenClose}
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
              close={this.close}
              hide={hide}
              title={rest.title || fallbackTitle}
            />
          )}
        </>
      )
    }

    return <SuffixContext.Consumer>{render}</SuffixContext.Consumer>
  }
}

export { CloseButton, Modal as OriginalComponent }

export default classWithCamelCaseProps(Modal)
