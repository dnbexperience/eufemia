import { useEffect, useRef, useState } from 'react'
import { ContextState } from '../../DataContext'
import useHasContentChanged from './useHasContentChanged'
import useReportError from './useReportError'

export default function useHandleStatus({
  outerContext,
  requireCommit,
  error,
}: {
  outerContext: ContextState
  requireCommit: boolean
  error: Error
}) {
  const { hasContentChanged } = useHasContentChanged()

  useReportError(
    requireCommit && hasContentChanged ? error : undefined,
    outerContext
  )

  const showStatus = useShowStatus({
    outerContext,
    hasContentChanged,
    requireCommit,
  })

  return { hasContentChanged, showStatus }
}

// This hook/state is used to not show the status right away, after the user has cleared the PushContainer data.
function useShowStatus({
  outerContext,
  hasContentChanged,
  requireCommit,
}) {
  const showAllErrors = outerContext?.showAllErrors
  const [showStatus, setShowStatus] = useState(showAllErrors)
  const showRef = useRef(showAllErrors)

  useEffect(() => {
    if (!requireCommit) {
      return // stop here
    }

    if (!hasContentChanged) {
      setShowStatus(false)
    } else {
      if (showRef.current !== showAllErrors) {
        setShowStatus(showAllErrors)
      }
    }
    showRef.current = showAllErrors
  }, [hasContentChanged, requireCommit, showAllErrors])

  return showStatus
}
