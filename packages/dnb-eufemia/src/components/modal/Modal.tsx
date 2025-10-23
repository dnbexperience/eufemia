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

class Modal extends React.PureComponent<ModalPropTypes, ModalState> {
  static contextType = Context

  context!: ContextProps

  static Bar = ModalHeaderBar
  static Header = ModalHeader
  static Content = ModalInner

  static getContent(props) {
    if (typeof props.modalContent === 'string') {
      return props.modalContent
    } else if (typeof props.modalContent === 'function') {
      return props.modalContent(props)
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
    animationDuration: ANIMATION_DURATION,
    noAnimation: false,
  }

  static defaultProps = {
    id: null,
    focusSelector: null,
    labelledBy: null,
    title: null,
    disabled: null,
    spacing: true,
    openDelay: null,
    contentId: null,
    dialogTitle: 'Vindu',
    closeTitle: 'Lukk', // Close Modal Window
    hideCloseButton: false,
    closeButtonAttributes: null,
    preventClose: false,
    preventCoreStyle: false,
    animationDuration: ANIMATION_DURATION,
    noAnimation: false,
    noAnimationOnMobile: false,
    fullscreen: 'auto',
    minWidth: null,
    maxWidth: null,
    alignContent: 'left',
    containerPlacement: null,
    verticalAlignment: null,
    openState: null,
    directDomReturn: false,
    rootId: 'root',
    omitTriggerButton: false,

    className: null,
    children: null,

    onOpen: null,
    onClose: null,
    onClosePrevent: null,
    openModal: null,
    closeModal: null,

    trigger: null,
    triggerAttributes: null,

    overlayClass: null,
    contentClass: null,

    modalContent: null,
    headerContent: null,
    barContent: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof window !== 'undefined' && window['IS_TEST']) {
      state.animationDuration = 0
      state.noAnimation = true
    } else {
      state.animationDuration = props.animationDuration
      state.noAnimation = props.noAnimation
    }

    if (props.openState !== state._openState) {
      switch (props.openState) {
        case 'opened':
        case true:
          state.hide = false
          if (isTrue(state.noAnimation)) {
            state.modalActive = true
          }
          break
        case 'closed':
        case false:
          state.hide = true
          if (isTrue(state.noAnimation)) {
            state.modalActive = false
          }
          break
      }
    }
    state._openState = props.openState

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
    const { openState } = this.props

    if (!this.activeElement && typeof document !== 'undefined') {
      this.activeElement = document.activeElement
    }

    if (!hide && (openState === 'opened' || openState === true)) {
      this.toggleOpenClose(null, true)
    } else if (hide && (openState === 'closed' || openState === false)) {
      this.toggleOpenClose(null, false)
    }
  }

  toggleOpenClose = (event = null, showModal = null) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    const toggleNow = () => {
      const {
        animationDuration = ANIMATION_DURATION,
        noAnimation = false,
      } = this.state
      const timeoutDuration =
        typeof animationDuration === 'string'
          ? parseFloat(animationDuration)
          : animationDuration

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

      if (modalActive === false && !isTrue(noAnimation)) {
        this.setState({
          hide: true,
        })

        this._closeTimeout = setTimeout(doItNow, timeoutDuration) // delay because of the animation
      } else {
        doItNow()
      }
    }

    const waitBeforeOpen = () => {
      const { openDelay } = this.props
      const { noAnimation } = this.state
      const delay =
        typeof openDelay === 'string' ? parseFloat(openDelay) : openDelay
      if (delay > 0 && !isTrue(noAnimation)) {
        this._openTimeout = setTimeout(toggleNow, delay) // custom delay
      } else {
        toggleNow()
      }
    }

    clearTimeout(this._closeTimeout)
    clearTimeout(this._openTimeout)

    const { openModal } = this.props
    if (typeof openModal === 'function') {
      const fn = openModal(waitBeforeOpen, this)
      if (fn) {
        this._onUnmount.push(fn)
      }
    } else {
      waitBeforeOpen()
    }
  }

  handleSideEffects = () => {
    const { modalActive, preventAutoFocus, animationDuration } = this.state
    const { closeModal, openState } = this.props

    if (modalActive) {
      if (typeof closeModal === 'function') {
        const fn = closeModal(() => {
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
            parseFloat(String(animationDuration)) / 3
          )
        })
      }

      if (this._triggerRef?.current) {
        focus(this._triggerRef.current)
      }

      // because the openState was set to opened, we force
      if (
        (openState === 'opened' || openState === true) &&
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

    const { preventClose = false } = this.props

    if (isTrue(preventClose)) {
      const id = this._id
      dispatchCustomElementEvent(this, 'onClosePrevent', {
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
            animationDuration: 0,
            noAnimation: true,
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
      rootId = 'root',
      contentId = null,
      disabled = null,
      labelledBy = null,
      focusSelector = null,
      headerContent = null,
      barContent = null,
      bypass_invalidation_selectors = null,
      verticalAlignment = 'center',

      id, // eslint-disable-line
      openDelay, // eslint-disable-line

      omitTriggerButton = false,
      trigger = null,
      triggerAttributes = null,
      ...rest
    } = props

    const { hide, modalActive } = this.state
    const modalContent = Modal.getContent(
      typeof this.props.children === 'function'
        ? (Object.freeze({
            ...(this.props as any),
            close: this.close,
          }) as any)
        : (this.props as any)
    )

    const render = (suffixProps) => {
      const usedTriggerAttributes = {
        hidden: false,
        variant: 'secondary',
        icon_position: 'left',
        ...triggerAttributes,
      } as ButtonProps

      if (isTrue(disabled)) {
        usedTriggerAttributes.disabled = true
      }

      if (usedTriggerAttributes.id) {
        this._id = usedTriggerAttributes.id
      }

      let fallbackTitle: string
      if (usedTriggerAttributes.title) {
        fallbackTitle = usedTriggerAttributes.title
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
        !usedTriggerAttributes.text ? rest.title || fallbackTitle : null
      ) as string

      return (
        <>
          {TriggerButton && !isTrue(omitTriggerButton) && (
            <TriggerButton
              {...usedTriggerAttributes}
              id={this._id}
              title={title}
              onClick={this.toggleOpenClose}
              innerRef={this._triggerRef}
              className={classnames(
                'dnb-modal__trigger',
                createSpacingClasses(rest as any),
                usedTriggerAttributes.className
              )}
            />
          )}

          {modalActive && modalContent && (
            <ModalRoot
              {...rest}
              id={this._id}
              rootId={rootId}
              contentId={contentId || `dnb-modal-${this._id}`}
              labelledBy={labelledBy}
              focusSelector={focusSelector}
              modalContent={modalContent}
              headerContent={headerContent}
              verticalAlignment={verticalAlignment}
              barContent={barContent}
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

export default Modal
