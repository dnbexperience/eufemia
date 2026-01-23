/**
 * Web Modal Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import { SuffixContext } from '../../shared/helpers/Suffix'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
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
import { ParagraphContext } from '../../elements/typography/P'
import type { SpacingProps } from '../../shared/types'
import type { ButtonProps } from '../button/Button'

export const ANIMATION_DURATION = 300

export type ModalPropTypes = ModalProps &
  SpacingProps &
  Omit<ScrollViewAllProps, 'children'>

const defaultProps = {
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
  open: null,
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

function Modal(localProps: ModalPropTypes) {
  const context = React.useContext(Context)

  // Refs
  const _idRef = React.useRef(localProps.id || makeUniqueId('modal-'))
  const _triggerRef = React.useRef<HTMLElement>(null)
  const modalContentCloseRef =
    React.useRef<
      (event: Event, options: { triggeredBy?: string }) => void
    >(null)
  const _onUnmountRef = React.useRef<Array<() => void>>([])
  const _openTimeoutRef = React.useRef<NodeJS.Timeout>(null)
  const _closeTimeoutRef = React.useRef<NodeJS.Timeout>(null)
  const activeElementRef = React.useRef<Element>(null)
  const isInTransitionRef = React.useRef<boolean>(false)
  const prevOpenRef = React.useRef(localProps.open)
  const isFirstRenderRef = React.useRef(true)
  const prevModalActiveRef = React.useRef(false)
  const renderCountRef = React.useRef(0)
  const prevPropsRef = React.useRef(localProps)

  // Increment render count
  renderCountRef.current++

  // State
  const [state, setState] = React.useState(() => {
    const initialState: {
      hide: boolean
      modalActive: boolean
      preventAutoFocus: boolean
      animationDuration: string | number
      noAnimation: boolean
      _open: boolean
    } = {
      hide: false,
      modalActive: false,
      preventAutoFocus: true,
      animationDuration: ANIMATION_DURATION,
      noAnimation: false,
      _open: localProps.open,
    }

    if (typeof window !== 'undefined' && window['IS_TEST']) {
      initialState.animationDuration = 0
      initialState.noAnimation = true
    } else {
      initialState.animationDuration = localProps.animationDuration
      initialState.noAnimation = localProps.noAnimation
    }

    if (localProps.open === true) {
      initialState.hide = false
      if (isTrue(initialState.noAnimation)) {
        initialState.modalActive = true
      }
    } else if (localProps.open === false) {
      initialState.hide = true
      if (isTrue(initialState.noAnimation)) {
        initialState.modalActive = false
      }
    }

    return initialState
  })

  const removeActiveState = React.useCallback(() => {
    const last = getModalRoot(-1)

    if (last?._id && last._id !== _idRef.current) {
      return setActiveState(last._id)
    }

    try {
      document.documentElement.removeAttribute('data-dnb-modal-active')
    } catch (e) {
      warn('Modal: Error on remove "data-dnb-modal-active"', e)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setActiveState = React.useCallback((modalId: string) => {
    if (!modalId) {
      warn('Modal: A valid modalId is required')
    }
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
  }, [])

  const handleSideEffects = React.useCallback(() => {
    const { modalActive, preventAutoFocus, animationDuration } = state

    if (modalActive) {
      if (typeof localProps.closeModal === 'function') {
        const fn = localProps.closeModal(
          () => {
            toggleOpenClose(null, false)
          },
          { _id: _idRef.current }
        )
        if (fn) {
          _onUnmountRef.current.push(fn)
        }
      }
      setActiveState(_idRef.current)
    } else if (modalActive === false && !preventAutoFocus) {
      const focus = (elem: HTMLElement) => {
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

      if (_triggerRef?.current) {
        focus(_triggerRef.current)
      }

      if (
        localProps.open === true &&
        activeElementRef.current instanceof HTMLElement
      ) {
        try {
          focus(activeElementRef.current as HTMLElement).then(() => {
            activeElementRef.current = null
          })
        } catch (e) {
          //
        }
      }

      removeActiveState()
    }

    if (preventAutoFocus) {
      setState((prev) => ({ ...prev, preventAutoFocus: false }))
    }
  }, [
    state,
    localProps.closeModal,
    localProps.open,
    setActiveState,
    removeActiveState,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleOpenClose = React.useCallback(
    (event = null, showModal = null) => {
      if (event && event.preventDefault) {
        event.preventDefault()
      }

      const toggleNow = () => {
        const {
          animationDuration = ANIMATION_DURATION,
          noAnimation = false,
        } = state
        const timeoutDuration =
          typeof animationDuration === 'string'
            ? parseFloat(animationDuration)
            : animationDuration

        const modalActive =
          typeof showModal === 'boolean' ? showModal : !state.modalActive

        // If already in target state, just handle side effects without transition
        if (modalActive === state.modalActive) {
          handleSideEffects()
          return
        }

        isInTransitionRef.current = true

        const doItNow = () => {
          setState((prev) => ({
            ...prev,
            hide: false,
            modalActive,
          }))
        }

        if (modalActive === false && !isTrue(noAnimation)) {
          setState((prev) => ({
            ...prev,
            hide: true,
          }))

          _closeTimeoutRef.current = setTimeout(doItNow, timeoutDuration)
        } else {
          doItNow()
        }
      }

      const waitBeforeOpen = () => {
        const { openDelay } = localProps
        const { noAnimation } = state
        const delay =
          typeof openDelay === 'string' ? parseFloat(openDelay) : openDelay
        if (delay > 0 && !isTrue(noAnimation)) {
          _openTimeoutRef.current = setTimeout(toggleNow, delay)
        } else {
          toggleNow()
        }
      }

      clearTimeout(_closeTimeoutRef.current)
      clearTimeout(_openTimeoutRef.current)

      const { openModal } = localProps
      if (typeof openModal === 'function') {
        const fn = openModal(waitBeforeOpen, { _id: _idRef.current })
        if (fn) {
          _onUnmountRef.current.push(fn)
        }
      } else {
        waitBeforeOpen()
      }
    },
    [state, localProps]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const openBasedOnStateUpdate = React.useCallback(() => {
    const { hide } = state
    const { open } = localProps

    if (!activeElementRef.current && typeof document !== 'undefined') {
      activeElementRef.current = document.activeElement
    }

    if (!hide && open === true) {
      toggleOpenClose(null, true)
    } else if (hide && open === false) {
      toggleOpenClose(null, false)
    }
  }, [state, localProps.open]) // eslint-disable-line react-hooks/exhaustive-deps

  const open = React.useCallback(
    (e: Event) => {
      toggleOpenClose(e, true)
    },
    [toggleOpenClose]
  )

  const close = React.useCallback(
    (
      event: Event,
      { ifIsLatest, triggeredBy = 'handler' } = {
        ifIsLatest: true,
      }
    ) => {
      modalContentCloseRef.current?.(event, { triggeredBy })

      const { preventClose = false } = localProps

      if (isTrue(preventClose)) {
        const id = _idRef.current
        dispatchCustomElementEvent(
          { props: localProps, open, close },
          'onClosePrevent',
          {
            id,
            event,
            triggeredBy,
            close: (e) => {
              toggleOpenClose(e, false)
            },
          }
        )
      } else {
        if (ifIsLatest) {
          const list = getListOfModalRoots()
          if (list.length > 1) {
            const last = getModalRoot(-1)
            if (last?._id && last._id !== _idRef.current) {
              return
            }
          }
        }

        toggleOpenClose(event, false)
      }
    },
    [localProps, toggleOpenClose, open]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  // getDerivedStateFromProps equivalent
  React.useEffect(() => {
    const newState: any = {}
    let hasChanges = false

    if (typeof window !== 'undefined' && window['IS_TEST']) {
      if (state.animationDuration !== 0) {
        newState.animationDuration = 0
        hasChanges = true
      }
      if (state.noAnimation !== true) {
        newState.noAnimation = true
        hasChanges = true
      }
    } else {
      if (state.animationDuration !== localProps.animationDuration) {
        newState.animationDuration = localProps.animationDuration
        hasChanges = true
      }
      if (state.noAnimation !== localProps.noAnimation) {
        newState.noAnimation = localProps.noAnimation
        hasChanges = true
      }
    }

    if (localProps.open !== state._open) {
      if (localProps.open === true) {
        newState.hide = false
        if (isTrue(state.noAnimation)) {
          newState.modalActive = true
        }
        hasChanges = true
      } else if (localProps.open === false) {
        newState.hide = true
        if (isTrue(state.noAnimation)) {
          newState.modalActive = false
        }
        hasChanges = true
      }
      newState._open = localProps.open
    }

    if (hasChanges) {
      setState((prev) => ({ ...prev, ...newState }))
    }
  }, [
    localProps.open,
    localProps.animationDuration,
    localProps.noAnimation,
    state.animationDuration,
    state.noAnimation,
    state._open,
  ])

  // componentDidUpdate equivalent - call openBasedOnStateUpdate when state._open changes (after getDerivedStateFromProps)
  // OR when props object reference changes (mimicking class component's prevProps !== this.props check)
  React.useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      prevPropsRef.current = localProps
      return
    }
    if (isInTransitionRef.current) {
      return
    }

    // Check if props reference changed (like class component did with prevProps !== this.props)
    const propsChanged = prevPropsRef.current !== localProps

    // Only call if state._open actually changed OR props changed
    if (state._open !== prevOpenRef.current || propsChanged) {
      openBasedOnStateUpdate()
    }

    prevOpenRef.current = state._open
    prevPropsRef.current = localProps
  }, [state._open, localProps, openBasedOnStateUpdate])

  // componentDidMount equivalent
  React.useEffect(() => {
    openBasedOnStateUpdate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // componentWillUnmount equivalent
  React.useEffect(() => {
    return () => {
      clearTimeout(_openTimeoutRef.current)
      clearTimeout(_closeTimeoutRef.current)

      removeActiveState()

      _onUnmountRef.current.forEach((fn) => {
        if (typeof fn === 'function') {
          fn()
        }
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle side effects when modalActive changes
  React.useEffect(() => {
    // Skip on first render
    if (isFirstRenderRef.current) {
      prevModalActiveRef.current = state.modalActive
      return
    }

    // Only handle side effects if modalActive actually changed
    if (state.modalActive !== prevModalActiveRef.current) {
      prevModalActiveRef.current = state.modalActive

      if (isInTransitionRef.current) {
        isInTransitionRef.current = false
      }
      handleSideEffects()
    }
  }, [state.modalActive, handleSideEffects])

  // Render
  const render = React.useCallback(
    (suffixProps) => {
      const visualTestsPropsOverride =
        typeof window !== 'undefined' && window['IS_TEST']
          ? {
              animationDuration: 0,
              noAnimation: true,
            }
          : {}

      const props = extendPropsWithContext(
        localProps,
        defaultProps,
        context.getTranslation(localProps).Modal,
        context.Modal,
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
        bypassInvalidationSelectors = null,
        verticalAlignment = 'center',

        id, // eslint-disable-line
        openDelay, // eslint-disable-line

        omitTriggerButton = false,
        trigger = null,
        triggerAttributes = null,
        ...rest
      } = props

      const { hide, modalActive } = state
      const modalContent = getContent(
        typeof localProps.children === 'function'
          ? Object.freeze({
              ...localProps,
              close,
            })
          : localProps
      )

      const usedTriggerAttributes = {
        hidden: false,
        variant: 'secondary',
        iconPosition: 'left',
        ...triggerAttributes,
      } as ButtonProps

      if (isTrue(disabled)) {
        usedTriggerAttributes.disabled = true
      }

      if (usedTriggerAttributes.id) {
        _idRef.current = usedTriggerAttributes.id
      }

      let fallbackTitle: string
      if (usedTriggerAttributes.title) {
        fallbackTitle = usedTriggerAttributes.title
      } else if (suffixProps) {
        fallbackTitle = context.translation.HelpButton.title
      }

      const headerTitle = rest.title || fallbackTitle
      const title = (
        !usedTriggerAttributes?.text && headerTitle
          ? headerTitle || fallbackTitle
          : null
      ) as string

      const TriggerButton = trigger
        ? (trigger as React.FC)
        : HelpButtonInstance

      return (
        <>
          {TriggerButton && !isTrue(omitTriggerButton) && (
            <TriggerButton
              {...usedTriggerAttributes}
              id={_idRef.current}
              title={title}
              onClick={toggleOpenClose}
              innerRef={_triggerRef}
              className={clsx(
                'dnb-modal__trigger',
                createSpacingClasses(rest as SpacingProps),
                usedTriggerAttributes.className
              )}
            />
          )}

          {modalActive && modalContent && (
            <ParagraphContext.Provider value={{ isNested: false }}>
              <ModalRoot
                {...rest}
                id={_idRef.current}
                rootId={rootId}
                contentId={contentId || `dnb-modal-${_idRef.current}`}
                labelledBy={labelledBy}
                focusSelector={focusSelector}
                modalContent={modalContent}
                headerContent={headerContent}
                verticalAlignment={verticalAlignment}
                barContent={barContent}
                bypassInvalidationSelectors={bypassInvalidationSelectors}
                close={close}
                hide={hide}
                title={headerTitle}
                modalContentCloseRef={modalContentCloseRef}
              />
            </ParagraphContext.Provider>
          )}
        </>
      )
    },
    [state, localProps, context, toggleOpenClose, close]
  )

  return <SuffixContext.Consumer>{render}</SuffixContext.Consumer>
}

// Static properties
Modal.Bar = ModalHeaderBar
Modal.Header = ModalHeader
Modal.Content = ModalInner
Modal.defaultProps = defaultProps

const getContent = (props) => {
  if (typeof props.modalContent === 'string') {
    return props.modalContent
  } else if (typeof props.modalContent === 'function') {
    return props.modalContent(props)
  }
  return processChildren(props)
}

export { CloseButton, Modal as OriginalComponent }

export default Modal
