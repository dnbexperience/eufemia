import React, { useCallback, useContext } from 'react'
import { FormStatus } from '../../../../components'
import { useTranslation } from '../../hooks'
import useHandleStatus from './useHandleStatus'
import IsolationContext from './IsolationContext'
import useDataContextSnapshot from './useDataContextSnapshot'
import useEventListener from '../../DataContext/Provider/useEventListener'

export default function IsolatedContainer({ children }) {
  const { outerContext, preventUncommittedChanges } =
    useContext(IsolationContext)
  const { preventUncommittedChangesText } = useTranslation().Isolation
  const { showStatus: showCommitStatus } = useHandleStatus({
    outerContext,
    preventUncommittedChanges,
    error: isolationError,
    name: 'isolation-container',
  })

  const { resetDataAfterCommit } = useContext(IsolationContext)
  const { handleReset } = useDataContextSnapshot({
    enabled: resetDataAfterCommit,
  })

  const handleSubmit = useCallback(() => {
    if (resetDataAfterCommit) {
      handleReset()
    }
  }, [handleReset, resetDataAfterCommit])
  // Reset right after committing to ensure it does not affect what gets committed
  useEventListener('onAfterCommit', handleSubmit)

  return (
    <>
      {children}

      {preventUncommittedChanges && (
        <FormStatus
          noAnimation={false}
          shellSpace={{ top: true }}
          show={Boolean(showCommitStatus)}
        >
          {preventUncommittedChangesText}
        </FormStatus>
      )}
    </>
  )
}

export const isolationError = new Error('Form.Isolation')
