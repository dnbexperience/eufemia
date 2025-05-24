import { useEffect, useRef, useState } from 'react'
import { ContextState } from '../../DataContext'
import useHasContentChanged from './useHasContentChanged'
import useReportError from './useReportError'

export default function useHandleStatus({
  outerContext,
  preventUncommittedChanges,
  error,
  name,
}: {
  outerContext: ContextState
  preventUncommittedChanges: boolean
  error: Error
  name?: string
}) {
  const { hasContentChanged } = useHasContentChanged({
    enabled: preventUncommittedChanges,
  })

  let errorToReport = undefined
  if (preventUncommittedChanges && hasContentChanged) {
    errorToReport = error
  }
  useReportError(errorToReport, outerContext, name)

  const showStatus = useShowStatus({
    outerContext,
    hasContentChanged,
    preventUncommittedChanges,
  })

  return { hasContentChanged, showStatus }
}

// This hook/state is used to not show the status right away, after the user has cleared the PushContainer data.
function useShowStatus({
  outerContext,
  hasContentChanged,
  preventUncommittedChanges,
}) {
  const showAllErrors = outerContext?.showAllErrors
  const [showStatus, setShowStatus] = useState(showAllErrors)
  const showRef = useRef(showAllErrors)

  useEffect(() => {
    if (!preventUncommittedChanges) {
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
  }, [hasContentChanged, preventUncommittedChanges, showAllErrors])

  return showStatus
}
