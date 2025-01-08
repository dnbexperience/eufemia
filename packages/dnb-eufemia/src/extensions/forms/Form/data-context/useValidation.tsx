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
  const { data } = useSharedState<
    UseDataReturn & SharedAttachments<unknown>
  >(createReferenceKey(id, 'attachments'))

  const fallback = useCallback(() => false, [])

  // If no id is provided, use the context version
  const context = useContext(DataContext)
  const hasErrors =
    data?.hasErrors || (!id && context?.hasErrors) || fallback
  const hasFieldError =
    data?.hasFieldError || (!id && context?.hasFieldError) || fallback

  // Error handling
  const setSubmitState =
    data?.setSubmitState || (!id && context?.setSubmitState) || fallback
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
  const { get } = useSharedState<UseConnectionsSharedState>(
    createReferenceKey(id, 'attachments')
  )

  const dataContext = useContext(DataContext)
  const { fieldConnectionsRef } = dataContext || {}

  const getFieldConnections = useCallback(() => {
    const attachments = get()
    const connections =
      attachments?.fieldConnectionsRef || (!id && fieldConnectionsRef)

    return connections.current
  }, [fieldConnectionsRef, get, id])

  return useMemo(() => ({ getFieldConnections }), [getFieldConnections])
}
