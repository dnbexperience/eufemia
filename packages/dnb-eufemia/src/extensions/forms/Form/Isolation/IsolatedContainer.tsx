import React, { useCallback, useContext } from 'react'
import { FormStatus } from '../../../../components'
import { useTranslation } from '../../hooks'
import useHandleStatus from './useHandleStatus'
import IsolationContext from './IsolationContext'
import DataContext from '../../DataContext/Context'
import useDataContextSnapshot from './useDataContextSnapshot'

export default function IsolatedContainer({ children }) {
  const { outerContext, preventUncommitedChangesText } =
    useContext(IsolationContext)
  const { preventUncommitedChangesTextText } = useTranslation().Isolation
  const { showStatus: showCommitStatus } = useHandleStatus({
    outerContext,
    preventUncommitedChangesText,
    error: isolationError,
  })

  const { setFieldEventListener } = useContext(DataContext)
  const { resetDataAfterCommit } = useContext(IsolationContext)
  const { handleReset } = useDataContextSnapshot({
    enabled: resetDataAfterCommit,
  })

  const handleSubmit = useCallback(() => {
    if (resetDataAfterCommit) {
      handleReset()
    }
  }, [handleReset, resetDataAfterCommit])
  setFieldEventListener?.(undefined, 'onBeforeCommit', handleSubmit)

  return (
    <>
      {children}

      {preventUncommitedChangesText && (
        <FormStatus
          no_animation={false}
          shellSpace={{ top: true }}
          show={Boolean(showCommitStatus)}
        >
          {preventUncommitedChangesTextText}
        </FormStatus>
      )}
    </>
  )
}

export const isolationError = new Error('Form.Isolation')
