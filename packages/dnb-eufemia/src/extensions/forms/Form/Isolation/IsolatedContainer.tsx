import React, { useContext } from 'react'
import { FormStatus } from '../../../../components'
import { useTranslation } from '../../hooks'
import useHandleStatus from './useHandleStatus'
import IsolationContext from './IsolationContext'

export default function IsolatedContainer({ children }) {
  const { outerContext, requireCommit } = useContext(IsolationContext)
  const { requireCommitText } = useTranslation().Isolation
  const { showStatus: showCommitStatus } = useHandleStatus({
    outerContext,
    requireCommit,
    error: isolationError,
  })

  return (
    <>
      {children}

      {requireCommit && (
        <FormStatus
          no_animation={false}
          shellSpace={{
            top: true,
          }}
          show={Boolean(showCommitStatus)}
        >
          {requireCommitText}
        </FormStatus>
      )}
    </>
  )
}

export const isolationError = new Error('Form.Isolation')
