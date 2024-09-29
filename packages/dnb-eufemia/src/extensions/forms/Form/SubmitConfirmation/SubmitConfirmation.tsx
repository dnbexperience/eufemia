import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import DataContext from '../../DataContext/Context'
import SharedProvider from '../../../../shared/Provider'
import { ContextProps } from '../../../../shared/Context'
import { HeightAnimation } from '../../../../components'
import {
  DialogContentProps,
  DialogProps,
} from '../../../../components/dialog/types'
import { EventStateObject } from '../../types'
import { removeUndefinedProps } from '../../../../shared/component-helper'

export type ConfirmationState =
  | 'idle'
  | 'readyToBeSubmitted'
  | 'submitInProgress'
  | 'submissionComplete'

export type ConfirmParams = {
  data: unknown
  confirmationState: ConfirmationState
  submitState: EventStateObject | undefined
  connectWithDialog: Pick<
    DialogProps & DialogContentProps,
    'openState' | 'onConfirm' | 'onDecline' | 'onClose'
  >
  setConfirmationState: (state: ConfirmationState) => void
  submitHandler: () => void | Promise<void>
  cancelHandler: () => void | Promise<void>
}

export type ConfirmProps = {
  preventSubmitWhen?: (params: ConfirmParams) => boolean
  onStateChange?: (params: ConfirmParams) => void | Promise<void>
  onSubmitResult?: (params: ConfirmParams) => void
  renderWithState?: (params: ConfirmParams) => React.ReactNode
  children?: React.ReactNode
}

function SubmitConfirmation(props: ConfirmProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const {
    preventSubmitWhen,
    onStateChange,
    onSubmitResult,
    renderWithState,
    children,
  } = props

  const {
    setFormState,
    setHandleSubmit,
    handleSubmit: handleFinalSubmit,
    submitState,
    formElementRef,
    internalDataRef,
  } = useContext(DataContext)

  const confirmationStateRef = useRef<ConfirmationState>('idle')
  const submitStateRef = useRef<EventStateObject>()
  const preventSubmitRef = useRef<boolean>(undefined)

  const validatePreventSubmit = useCallback(() => {
    return (preventSubmitRef.current = preventSubmitWhen?.(
      getParamsRef.current()
    ))
  }, [preventSubmitWhen])

  const setConfirmationState = useCallback(
    async (state: ConfirmationState) => {
      confirmationStateRef.current = state
      await onStateChange?.(getParamsRef.current())
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          switch (state) {
            case 'idle':
              setFormState('complete', { keepPending: false })
              break
            case 'readyToBeSubmitted':
              setFormState('pending', { keepPending: true })
              break
            case 'submitInProgress':
              setFormState('pending', { keepPending: true })
              break
            case 'submissionComplete':
              setFormState('complete', { keepPending: false })
              break
            default:
              forceUpdate()
          }
        })
      }
    },
    [onStateChange, setFormState]
  )

  const getParamsRef = useRef(() => {
    const confirmationState = confirmationStateRef.current

    const connectWithDialog = {
      openState: confirmationState === 'readyToBeSubmitted',
      onConfirm: submitHandler,
      onDecline: cancelHandler,
      onClose: ({ triggeredBy }) => {
        if (triggeredBy === 'keyboard') {
          cancelHandler()
        }
      },
    }

    return {
      data: internalDataRef.current,
      confirmationState,
      setConfirmationState,
      submitHandler,
      cancelHandler,
      connectWithDialog,
      submitState: submitStateRef.current,
    } satisfies ConfirmParams
  })

  useMemo(() => {
    if (Object.keys(removeUndefinedProps(submitState)).length > 0) {
      submitStateRef.current = {
        ...submitState,
      } as EventStateObject
      onSubmitResult?.(getParamsRef.current())
    }
  }, [submitState, onSubmitResult])

  const setFocusOnButton = useCallback(() => {
    try {
      const form = formElementRef.current
      const element = (form.querySelector('.dnb-forms-submit-button') ||
        form) as HTMLElement
      element.focus()
    } catch (e) {
      //
    }
  }, [formElementRef])

  const cancelHandler = useCallback(async () => {
    await setConfirmationState('idle')
    setFocusOnButton()
  }, [setFocusOnButton, setConfirmationState])

  const handleSubmit = useCallback(
    async ({ preventSubmit }) => {
      if (confirmationStateRef.current === 'submitInProgress') {
        return // stop here
      }

      if (validatePreventSubmit() !== true) {
        await setConfirmationState('submitInProgress')
        return // stop here
      }

      submitStateRef.current = undefined

      // Prevent the form form from being submitted
      preventSubmit()

      await setConfirmationState('readyToBeSubmitted')
    },
    [setConfirmationState, validatePreventSubmit]
  )
  setHandleSubmit?.(handleSubmit)

  const submitHandler = useCallback(async () => {
    setHandleSubmit?.(handleSubmit, { remove: true })

    await setConfirmationState('submitInProgress')
    await handleFinalSubmit()
    await setConfirmationState('submissionComplete')

    setFocusOnButton()
  }, [
    handleFinalSubmit,
    handleSubmit,
    setFocusOnButton,
    setHandleSubmit,
    setConfirmationState,
  ])

  const sharedProviderParams: ContextProps = {
    formElement: {
      disabled: false,
    },
  }

  return (
    <>
      {children}

      <SharedProvider {...sharedProviderParams}>
        <HeightAnimation>
          {renderWithState?.(getParamsRef.current())}
        </HeightAnimation>
      </SharedProvider>
    </>
  )
}

SubmitConfirmation._supportsSpacingProps = 'children'
export default SubmitConfirmation
