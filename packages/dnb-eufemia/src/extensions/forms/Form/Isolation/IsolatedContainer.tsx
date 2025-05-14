import React, { useCallback, useContext } from 'react'
import DataContext from '../../DataContext/Context'
import IsolationContext from './IsolationContext'
import useDataContextSnapshot from './useDataContextSnapshot'

export default function IsolatedContainer({ children }) {
  const { setFieldEventListener } = useContext(DataContext)
  const { resetAfterCommit } = useContext(IsolationContext)
  const { handleReset } = useDataContextSnapshot({
    enabled: resetAfterCommit,
  })

  const handleSubmit = useCallback(() => {
    if (resetAfterCommit) {
      handleReset()
    }
  }, [handleReset, resetAfterCommit])
  setFieldEventListener?.(undefined, 'onBeforeCommit', handleSubmit)

  return <>{children}</>
}

export const isolationError = new Error('Form.Isolation')
