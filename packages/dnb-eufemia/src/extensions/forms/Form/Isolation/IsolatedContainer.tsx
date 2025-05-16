import React, { useCallback, useContext } from 'react'
import DataContext from '../../DataContext/Context'
import IsolationContext from './IsolationContext'
import useDataContextSnapshot from './useDataContextSnapshot'

export default function IsolatedContainer({ children }) {
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

  return <>{children}</>
}

export const isolationError = new Error('Form.Isolation')
