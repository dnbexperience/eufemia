/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { SuffixContext } from '../../shared/helpers/Suffix'
import Context, { ContextProps } from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
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
import { ScrollViewAllProps } from '../../fragments/scroll-view/ScrollView'
import CloseButton from './parts/CloseButton'
import ModalRoot from './ModalRoot'
import type { SpacingProps } from '../../shared/types'
import {
  classWithCamelCaseProps,
  ToCamelCasePartial,
} from '../../shared/helpers/withCamelCaseProps'
import type { ButtonProps } from '../button/Button'

export const ANIMATION_DURATION = 300

interface ModalState {
  hide: boolean
  modalActive: boolean
  preventAutoFocus: boolean
}

export type ModalPropTypes = ModalProps &
  SpacingProps &
  Omit<ScrollViewAllProps, 'children'>

class Modal extends React.PureComponent<
  ModalPropTypes & ToCamelCasePartial<ModalPropTypes>,
  ModalState
> {
  static contextType = Context

  context!: ContextProps

  static Bar = ModalHeaderBar
  static Header = ModalHeader
  static Content = ModalInner

  static getContent(props) {
    if (typeof props.modal_content === 'string') {
      return props.modal_content
    } else if (typeof props.modal_content === 'function') {
      return props.modal_content(props)
    }
    return processChildren(props)
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
  modalContentCloseRef: React.RefObject<any>

  state = {
    hide: false,
    modalActive: false,
    preventAutoFocus: true,
    animation_duration: ANIMATION_DURATION,
    no_animation: false,
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
    animation_duration: ANIMATION_DURATION,
    no_animation: false,
    no_animation_on_mobile: false,
    fullscreen: 'auto',
    min_width: null,
    max_width: null,
    align_content: 'left',
    container_placement: null,
    vertical_alignment: null,
    open_state: null,
    direct_dom_return: false,
    root_id: 'root',
    omit_trigger_button: false,

    className: null,
    children: null,

    on_open: null,
    on_close: null,
    on_close_prevent: null,
    open_modal: null,
    close_modal: null,

    trigger: null,
    trigger_attributes: null,

    overlay_class: null,
    content_class: null,

    modal_content: null,
    header_content: null,
    bar_content: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof window !== 'undefined' && window['IS_TEST']) {
      state.animation_duration = 0
      state.no_animation = true
    } else {
      state.animation_duration = props.animation_duration
      state.no_animation = props.no_animation
    }

    if (props.open_state !== state._open_state) {
      switch (props.open_state) {
        case 'opened':
        case true:
          state.hide = false
          if (isTrue(state.no_animation)) {
            state.modalActive = true
          }
          break
        case 'closed':
        case false:
          state.hide = true
          if (isTrue(state.no_animation)) {
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
    this.modalContentCloseRef = React.createRef()

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
      } = this.state
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
      const { open_delay } = this.props
      const { no_animation } = this.state
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
    const { modalActive, preventAutoFocus, animation_duration } =
      this.state
    const { close_modal, open_state } = this.props

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
    } else if (modalActive === false && !preventAutoFocus) {
      const focus = (elem: HTMLElement) => {
        // So we can omit showing a Tooltip on the trigger button
        elem.setAttribute('data-autofocus', 'true')
        elem.focus({ preventScroll: true })

        return new Promise<void>((resolve) => {
          setTimeout(
            () => {
              elem?.removeAttribute('data-autofocus')
              resolve()
            },
            parseFloat(String(animation_duration)) / 3
          )
        })
      }

      if (this._triggerRef?.current) {
        focus(this._triggerRef.current)
      }

      // because the open_state was set to opened, we force
      if (
        (open_state === 'opened' || open_state === true) &&
        this.activeElement instanceof HTMLElement
      ) {
        try {
          focus(this.activeElement).then(() => {
            this.activeElement = null
          })
        } catch (e) {
          //
        }
      }

      this.removeActiveState()
    }

    if (preventAutoFocus) {
      this.setState({ preventAutoFocus: false })
    }
  }

  open = (e: Event) => {
    this.toggleOpenClose(e, true)
  }

  close = (
    event: Event,
    { ifIsLatest, triggeredBy = 'handler' } = {
      ifIsLatest: true,
    }
  ) => {
    this.modalContentCloseRef.current?.(event, { triggeredBy })

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
      } catch (e) {
        warn('Modal: Error on set "data-dnb-modal-active"', e)
      }
    }
  }

  render() {
    const visualTestsPropsOverride =
      typeof window !== 'undefined' && window['IS_TEST']
        ? {
            animation_duration: 0,
            no_animation: true,
          }
        : {}

    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Modal.defaultProps,
      this.context.getTranslation(this.props).Modal,
      this.context.Modal,
      visualTestsPropsOverride
    )

    const {
      root_id = 'root',
      content_id = null,
      disabled = null,
      labelled_by = null,
      focus_selector = null,
      header_content = null,
      bar_content = null,
      bypass_invalidation_selectors = null,
      vertical_alignment = 'center',

      id, // eslint-disable-line
      open_delay, // eslint-disable-line

      omit_trigger_button = false,
      trigger = null,
      trigger_attributes = null,
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
        hidden: false,
        variant: 'secondary',
        icon_position: 'left',
        ...trigger_attributes,
      } as ButtonProps

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

      const TriggerButton = trigger
        ? (trigger as React.FC)
        : HelpButtonInstance

      const title = (
        !triggerAttributes.text ? rest.title || fallbackTitle : null
      ) as string

      return (
        <>
          {TriggerButton && !isTrue(omit_trigger_button) && (
            <TriggerButton
              {...triggerAttributes}
              id={this._id}
              title={title}
              onClick={this.toggleOpenClose}
              innerRef={this._triggerRef}
              className={classnames(
                'dnb-modal__trigger',
                createSpacingClasses(props),
                triggerAttributes.className,

                // @deprecated – can be removed in v11
                triggerAttributes.class
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
              vertical_alignment={vertical_alignment}
              bar_content={bar_content}
              bypass_invalidation_selectors={bypass_invalidation_selectors}
              close={this.close}
              hide={hide}
              title={rest.title || fallbackTitle}
              modalContentCloseRef={this.modalContentCloseRef}
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
