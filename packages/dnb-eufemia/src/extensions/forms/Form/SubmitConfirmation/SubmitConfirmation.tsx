import React, { useCallback, useContext, useReducer, useRef } from 'react'
import DataContext from '../../DataContext/Context'
import SharedProvider from '../../../../shared/Provider'
import { ContextProps } from '../../../../shared/Context'
import { HeightAnimation } from '../../../../components'
import {
  DialogContentProps,
  DialogProps,
} from '../../../../components/dialog/types'

export type SubmitState =
  | 'idle'
  | 'beforeSubmit'
  | 'submitInProgress'
  | 'submissionComplete'
export type ConfirmParams = {
  submitState: SubmitState
  setSubmitState: (state: SubmitState) => void
  submitHandler: () => Promise<void>
  cancelHandler: () => void
  connectWithDialog: Pick<
    DialogProps & DialogContentProps,
    'openState' | 'onConfirm' | 'onDecline' | 'onClose'
  >
}

export type ConfirmProps = {
  onStateChange?: (getConfirmParams: ConfirmParams) => void
  renderWithState?: (getConfirmParams: ConfirmParams) => React.ReactNode
  children?: React.ReactNode
}

function SubmitConfirmation(props: ConfirmProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const { onStateChange, renderWithState, children } = props

  const dataContext = useContext(DataContext)
  const setFormState = dataContext?.setFormState
  const setHandleSubmit = dataContext?.setHandleSubmit
  const handleFinalSubmit = dataContext?.handleSubmit

  const submitStateRef = useRef<SubmitState>('idle')

  const setSubmitState = useCallback(
    (state: SubmitState) => {
      submitStateRef.current = state
      forceUpdate()
      onStateChange?.(getParamsRef.current())
    },
    [onStateChange]
  )

  const getParamsRef = useRef(() => {
    const submitState = submitStateRef.current

    const connectWithDialog = {
      openState: submitState === 'beforeSubmit',
      onConfirm: submitHandler,
      onDecline: cancelHandler,
      onClose: ({ triggeredBy }) => {
        if (triggeredBy === 'keyboard') {
          cancelHandler()
        }
      },
    }

    return {
      submitState,
      setSubmitState,
      submitHandler,
      cancelHandler,
      connectWithDialog,
    }
  })

  const cancelHandler = useCallback(() => {
    setFormState('complete', { keepPending: false })
    setSubmitState('idle')
  }, [setFormState, setSubmitState])

  const handleSubmit = useCallback(
    ({ preventSubmit }) => {
      if (submitStateRef.current === 'submitInProgress') {
        return // stop here
      }
      preventSubmit()

      setFormState('pending', { keepPending: true })
      setSubmitState('beforeSubmit')
    },
    [setFormState, setSubmitState]
  )
  setHandleSubmit?.(handleSubmit)

  const submitHandler = useCallback(async () => {
    setHandleSubmit?.(handleSubmit, { remove: true })

    setFormState('pending', { keepPending: false })
    setSubmitState('submitInProgress')

    await handleFinalSubmit()

    setFormState('complete')
    setSubmitState('submissionComplete')
  }, [
    handleFinalSubmit,
    handleSubmit,
    setFormState,
    setHandleSubmit,
    setSubmitState,
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
