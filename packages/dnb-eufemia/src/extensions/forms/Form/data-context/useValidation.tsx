import { useCallback, useContext, useMemo } from 'react'
import {
  SharedStateId,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import DataContext, { ContextState } from '../../DataContext/Context'
import { SharedAttachments } from '../../DataContext/Provider'
import { EventStateObject, Path } from '../../types'
import { FormError } from '../../utils'

type UseDataReturn = {
  hasErrors: ContextState['hasErrors']
  hasFieldError: ContextState['hasFieldError']
  setFormError: (error: Error | FormError | undefined | null) => void
  setFieldStatus: (path: Path, status: EventStateObject) => void
}

export default function useValidation(
  id: SharedStateId = undefined
): UseDataReturn {
  const { data: sharedDataContext } = useSharedState<ContextState>(
    id ? createReferenceKey(id, 'data-context') : undefined
  )

  const { data } = useSharedState<
    UseDataReturn & SharedAttachments<unknown>
  >(id ? createReferenceKey(id, 'attachments') : undefined)

  const fallback = useCallback(() => false, [])

  // If no id is provided, use the context version
  const context = useContext(DataContext)
  const sharedContext = id ? sharedDataContext : undefined
  const hasErrors =
    sharedContext?.hasErrors ||
    data?.hasErrors ||
    (!id && context?.hasErrors) ||
    fallback
  const hasFieldError =
    sharedContext?.hasFieldError ||
    data?.hasFieldError ||
    (!id && context?.hasFieldError) ||
    fallback

  // Error handling
  const setSubmitState =
    sharedContext?.setSubmitState ||
    data?.setSubmitState ||
    (!id && context?.setSubmitState) ||
    fallback
  const setFormError = useCallback(
    (error: Error) => {
      setSubmitState?.({ error })
    },
    [setSubmitState]
  )

  // Field status
  const { getFieldConnections } = useConnections(id)
  const setFieldStatus = useCallback(
    (path: Path, status: EventStateObject) => {
      const connections = getFieldConnections()
      connections?.[path]?.setEventResult?.(status)
    },
    [getFieldConnections]
  )

  return useMemo(
    () => ({ hasErrors, hasFieldError, setFormError, setFieldStatus }),
    [hasErrors, hasFieldError, setFormError, setFieldStatus]
  )
}

type UseConnectionsSharedState = {
  fieldConnectionsRef: ContextState['fieldConnectionsRef']
}

function useConnections(id: SharedStateId = undefined) {
  const { data: sharedDataContext } = useSharedState<ContextState>(
    id ? createReferenceKey(id, 'data-context') : undefined
  )

  const { get } = useSharedState<UseConnectionsSharedState>(
    id ? createReferenceKey(id, 'attachments') : undefined
  )

  const dataContext = useContext(DataContext)
  const { fieldConnectionsRef } = dataContext || {}
  const sharedFieldConnectionsRef = sharedDataContext?.fieldConnectionsRef

  const getFieldConnections = useCallback(() => {
    const attachments = get()
    const connections =
      sharedFieldConnectionsRef ||
      attachments?.fieldConnectionsRef ||
      (!id && fieldConnectionsRef)

    return connections?.current
  }, [fieldConnectionsRef, get, id, sharedFieldConnectionsRef])

  return useMemo(() => ({ getFieldConnections }), [getFieldConnections])
}
