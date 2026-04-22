/**
 * Web Modal Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import clsx from 'clsx'
import { SuffixContext } from '../../shared/helpers/Suffix'
import Context from '../../shared/Context'
import useId from '../../shared/helpers/useId'
import {
  warn,
  extendPropsWithContext,
  removeUndefinedProps,
  processChildren,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { applySpacing } from '../space/SpacingUtils'
import HelpButtonInstance from '../help-button/HelpButtonInstance'
import { getListOfModalRoots, getModalRoot } from './ModalHelpers'
import ModalInner from './parts/ModalInner'
import type { ModalProps } from './types'

import ModalHeader from './parts/ModalHeader'
import ModalHeaderBar from './parts/ModalHeaderBar'
import type { ScrollViewAllProps } from '../../fragments/scroll-view/ScrollView'
import CloseButton from './parts/CloseButton'
import ModalRoot from './ModalRoot'
import { ParagraphContext } from '../../elements/typography/P'
import type { SpacingProps } from '../../shared/types'
import type { ButtonProps } from '../button/Button'

export const ANIMATION_DURATION = 300

export type ModalAllProps = ModalProps &
  SpacingProps &
  Omit<ScrollViewAllProps, 'children'>

const modalDefaultProps: Partial<ModalAllProps> = {
  spacing: true,
  dialogTitle: 'Vindu',
  closeTitle: 'Lukk',
  hideCloseButton: false,
  preventClose: false,
  preventCoreStyle: false,
  animationDuration: ANIMATION_DURATION,
  noAnimation: false,
  noAnimationOnMobile: false,
  fullscreen: 'auto',
  containerPlacement: null,
  alignContent: 'left',
  directDomReturn: false,
  omitTriggerButton: false,
}

function getContent(props) {
  if (typeof props.modalContent === 'string') {
    return props.modalContent
  } else if (typeof props.modalContent === 'function') {
    return props.modalContent(props)
  }
  return processChildren(props)
}

function ModalComponent(ownProps: ModalAllProps) {
  const context = useContext(Context)
  const suffixContext = useContext(SuffixContext)

  const visualTestsPropsOverride =
    typeof window !== 'undefined' && window['IS_TEST']
      ? {
          animationDuration: 0,
          noAnimation: true,
        }
      : {}

  const props = extendPropsWithContext(
    {
      ...modalDefaultProps,
      ...removeUndefinedProps({ ...ownProps }),
    },
    modalDefaultProps,
    context.getTranslation(ownProps).Modal,
    context.Modal,
    visualTestsPropsOverride
  )

  const {
    contentId = null,
    disabled = null,
    labelledBy = null,
    focusSelector = null,
    headerContent = null,
    barContent = null,
    bypassInvalidationSelectors = null,
    verticalAlignment = 'center',

    id: idProp,
    openDelay,

    omitTriggerButton = false,
    trigger = null,
    triggerAttributes = null,
    ref: _ref,
    ...rest
  } = props

  const { open, openModal, closeModal, preventClose = false } = props

  const fallbackId = useId(idProp)
  const _id = useRef(fallbackId)
  const triggerRef = useRef<HTMLElement>(null)
  const modalContentCloseRef = useRef<
    ((event: Event, options: { triggeredBy?: string }) => void) | null
  >(null)
  const onUnmountRef = useRef<Array<() => void>>([])
  const activeElementRef = useRef<Element>(null)
  const isInTransitionRef = useRef(false)
  const openTimeoutRef = useRef<NodeJS.Timeout>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout>(null)
  const pendingSideEffectsRef = useRef<{
    isModalActive: boolean
    preventAutoFocus: boolean
  } | null>(null)

  const [hide, setHide] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [preventAutoFocus, setPreventAutoFocus] = useState(true)

  // Determine animation settings (test overrides)
  const animationDuration =
    typeof window !== 'undefined' && window['IS_TEST']
      ? 0
      : (props.animationDuration ?? ANIMATION_DURATION)
  const noAnimation =
    typeof window !== 'undefined' && window['IS_TEST']
      ? true
      : (props.noAnimation ?? false)

  // Refs for latest state values used in callbacks
  const stateRef = useRef({ hide, modalActive, preventAutoFocus })
  stateRef.current = { hide, modalActive, preventAutoFocus }
  const propsRef = useRef(props)
  propsRef.current = props

  const removeActiveState = useCallback(() => {
    const last = getModalRoot(-1)

    if (last?._id && last._id !== _id.current) {
      return setActiveState(last._id)
    }

    try {
      document.documentElement.removeAttribute('data-dnb-modal-active')
    } catch (e) {
      warn('Modal: Error on remove "data-dnb-modal-active"', e)
    }
  }, [])

  const setActiveState = useCallback((modalId: string) => {
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

  const handleSideEffects = useCallback(
    (isModalActive: boolean, currentPreventAutoFocus: boolean) => {
      if (isModalActive) {
        if (typeof closeModal === 'function') {
          const fn = closeModal(
            () => {
              toggleOpenCloseRef.current(null, false)
            },
            { _id: _id.current, props: propsRef.current }
          )
          if (fn) {
            onUnmountRef.current.push(fn)
          }
        }
        setActiveState(_id.current)
      } else if (isModalActive === false && !currentPreventAutoFocus) {
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

        if (triggerRef?.current) {
          focus(triggerRef.current as HTMLElement)
        }

        if (
          open === true &&
          activeElementRef.current instanceof HTMLElement
        ) {
          try {
            focus(activeElementRef.current).then(() => {
              activeElementRef.current = null
            })
          } catch (e) {
            //
          }
        }

        removeActiveState()
      }

      if (currentPreventAutoFocus) {
        setPreventAutoFocus(false)
      }
    },
    [
      closeModal,
      open,
      animationDuration,
      removeActiveState,
      setActiveState,
    ]
  )

  const toggleOpenCloseRef =
    useRef<(event?: Event | null, showModal?: boolean | null) => void>(
      null
    )

  const toggleOpenClose = useCallback(
    (event: Event | null = null, showModal: boolean | null = null) => {
      if (event && 'preventDefault' in event) {
        event.preventDefault()
      }

      const toggleNow = () => {
        const timeoutDuration =
          typeof animationDuration === 'string'
            ? parseFloat(animationDuration)
            : animationDuration

        const newModalActive =
          typeof showModal === 'boolean'
            ? showModal
            : !stateRef.current.modalActive

        isInTransitionRef.current = true

        const doItNow = () => {
          setHide(false)
          setModalActive(newModalActive)
          isInTransitionRef.current = false
          pendingSideEffectsRef.current = {
            isModalActive: newModalActive,
            preventAutoFocus: stateRef.current.preventAutoFocus,
          }
        }

        if (newModalActive === false && !noAnimation) {
          setHide(true)
          closeTimeoutRef.current = setTimeout(doItNow, timeoutDuration)
        } else {
          doItNow()
        }
      }

      const waitBeforeOpen = () => {
        const delay =
          typeof openDelay === 'string' ? parseFloat(openDelay) : openDelay
        if (delay > 0 && !noAnimation) {
          openTimeoutRef.current = setTimeout(toggleNow, delay)
        } else {
          toggleNow()
        }
      }

      clearTimeout(closeTimeoutRef.current)
      clearTimeout(openTimeoutRef.current)

      if (typeof openModal === 'function') {
        const fn = openModal(waitBeforeOpen, {
          _id: _id.current,
          props: propsRef.current,
        })
        if (fn) {
          onUnmountRef.current.push(fn)
        }
      } else {
        waitBeforeOpen()
      }
    },
    [
      animationDuration,
      noAnimation,
      openDelay,
      openModal,
      handleSideEffects,
    ]
  )

  // Keep the ref in sync
  toggleOpenCloseRef.current = toggleOpenClose

  const closeHandler = useCallback(
    (
      event: Event,
      {
        ifIsLatest,
        triggeredBy = 'handler',
      }: { ifIsLatest?: boolean; triggeredBy?: string } = {
        ifIsLatest: true,
      }
    ) => {
      modalContentCloseRef.current?.(event, { triggeredBy })

      if (preventClose) {
        const id = _id.current
        dispatchCustomElementEvent(propsRef.current, 'onClosePrevent', {
          id,
          event,
          triggeredBy,
          close: (e) => {
            toggleOpenCloseRef.current(e, false)
          },
        })
      } else {
        if (ifIsLatest) {
          const list = getListOfModalRoots()
          if (list.length > 1) {
            const last = getModalRoot(-1)
            if (last !== modalStackIdentityRef.current) {
              return // stop here
            }
          }
        }

        toggleOpenCloseRef.current(event, false)
      }
    },
    [preventClose]
  )

  // Create a stable identity for the modal stack
  const modalStackIdentityRef = useRef({
    _id: _id.current,
  })

  // Handle open prop changes (getDerivedStateFromProps equivalent)
  const prevOpenRef = useRef<typeof open>(undefined)
  if (open !== prevOpenRef.current) {
    if (open === true) {
      setHide(false)
      if (noAnimation) {
        setModalActive(true)
      }
    } else if (open === false) {
      setHide(true)
      if (noAnimation) {
        setModalActive(false)
      }
    }
    prevOpenRef.current = open
  }

  // openBasedOnStateUpdate — mirrors class componentDidMount + componentDidUpdate with prevProps guard
  const prevEffectOpenRef = useRef<typeof open>(undefined)
  const prevOwnPropsRef = useRef<ModalAllProps | undefined>(undefined)
  useEffect(() => {
    if (!activeElementRef.current && typeof document !== 'undefined') {
      activeElementRef.current = document.activeElement
    }

    // Detect if parent provided new props (equivalent to class `prevProps !== this.props`)
    const isNewProps =
      prevOwnPropsRef.current !== undefined &&
      prevOwnPropsRef.current !== ownProps
    prevOwnPropsRef.current = ownProps

    const openChanged = prevEffectOpenRef.current !== open
    prevEffectOpenRef.current = open

    if (!openChanged && !isNewProps) {
      return // stop here
    }

    if (isInTransitionRef.current) {
      return // stop here
    }

    if (!hide && open === true) {
      toggleOpenClose(null, true)
    } else if (hide && open === false) {
      toggleOpenClose(null, false)
    }
  })

  // Process side effects after render (equivalent to class setState callback)
  useEffect(() => {
    if (pendingSideEffectsRef.current) {
      const { isModalActive, preventAutoFocus } =
        pendingSideEffectsRef.current
      pendingSideEffectsRef.current = null
      handleSideEffects(isModalActive, preventAutoFocus)
    }
  })

  // Cleanup on unmount
  useMountEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current)
      clearTimeout(closeTimeoutRef.current)
      removeActiveState()

      onUnmountRef.current.forEach((fn) => {
        if (typeof fn === 'function') {
          fn()
        }
      })
    }
  })

  const modalContent = getContent(
    typeof ownProps.children === 'function'
      ? Object.freeze({
          ...ownProps,
          close: closeHandler,
        })
      : ownProps
  )

  const usedTriggerAttributes = {
    hidden: false,
    variant: 'secondary',
    iconPosition: 'left',
    ...triggerAttributes,
  } as ButtonProps

  if (disabled) {
    usedTriggerAttributes.disabled = true
  }

  if (usedTriggerAttributes.id) {
    _id.current = usedTriggerAttributes.id
  }

  let fallbackTitle: string
  if (usedTriggerAttributes.title) {
    fallbackTitle = usedTriggerAttributes.title
  } else if (suffixContext) {
    fallbackTitle = context.translation.HelpButton.title
  }

  const headerTitle = rest.title || fallbackTitle
  const title = (
    !usedTriggerAttributes?.text && headerTitle
      ? headerTitle || fallbackTitle
      : null
  ) as string

  const TriggerButton = trigger
    ? (trigger as () => React.JSX.Element)
    : HelpButtonInstance

  return (
    <>
      {TriggerButton && !omitTriggerButton && (
        <TriggerButton
          {...usedTriggerAttributes}
          {...applySpacing(rest as SpacingProps, {
            id: _id.current,
            title,
            onClick: (event: React.MouseEvent) =>
              toggleOpenClose(event.nativeEvent),
            ref: triggerRef,
            className: clsx(
              'dnb-modal__trigger',
              usedTriggerAttributes.className
            ),
          })}
        />
      )}

      {modalActive && modalContent && (
        <ParagraphContext value={{ isNested: false }}>
          <ModalRoot
            {...rest}
            id={_id.current}
            contentId={contentId || `dnb-modal-${_id.current}`}
            labelledBy={labelledBy}
            focusSelector={focusSelector}
            modalContent={modalContent}
            headerContent={headerContent}
            verticalAlignment={verticalAlignment}
            barContent={barContent}
            bypassInvalidationSelectors={bypassInvalidationSelectors}
            close={closeHandler}
            hide={hide}
            title={headerTitle}
            modalContentCloseRef={modalContentCloseRef}
          />
        </ParagraphContext>
      )}
    </>
  )
}

const Modal = React.memo(ModalComponent) as React.MemoExoticComponent<
  typeof ModalComponent
> & {
  Bar: typeof ModalHeaderBar
  Header: typeof ModalHeader
  Content: typeof ModalInner
}
Modal.Bar = ModalHeaderBar
Modal.Header = ModalHeader
Modal.Content = ModalInner

export { CloseButton, Modal as OriginalComponent }

export default Modal
