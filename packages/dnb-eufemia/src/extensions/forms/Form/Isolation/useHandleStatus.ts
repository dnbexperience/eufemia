import { useEffect, useRef, useState } from 'react'
import { ContextState } from '../../DataContext'
import useHasContentChanged from './useHasContentChanged'
import useReportError from './useReportError'

export default function useHandleStatus({
  outerContext,
  preventUncommitedChanges,
  error,
}: {
  outerContext: ContextState
  preventUncommitedChanges: boolean
  error: Error
}) {
  const { hasContentChanged } = useHasContentChanged()

  useReportError(
    preventUncommitedChanges && hasContentChanged ? error : undefined,
    outerContext
  )

  const showStatus = useShowStatus({
    outerContext,
    hasContentChanged,
    preventUncommitedChanges,
  })

  return { hasContentChanged, showStatus }
}

// This hook/state is used to not show the status right away, after the user has cleared the PushContainer data.
function useShowStatus({
  outerContext,
  hasContentChanged,
  preventUncommitedChanges,
}) {
  const showAllErrors = outerContext?.showAllErrors
  const [showStatus, setShowStatus] = useState(showAllErrors)
  const showRef = useRef(showAllErrors)

  useEffect(() => {
    if (!preventUncommitedChanges) {
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
  }, [hasContentChanged, preventUncommitedChanges, showAllErrors])

  return showStatus
}
