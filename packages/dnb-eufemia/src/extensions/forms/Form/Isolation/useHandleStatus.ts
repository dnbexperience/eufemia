import { useEffect, useRef, useState } from 'react'
import type { ContextState } from '../../DataContext'
import useHasContentChanged from './useHasContentChanged'
import useReportError from './useReportError'

export type Props = {
  outerContext: ContextState
  preventUncommittedChanges: boolean
  error: Error
  name?: string
}

export default function useHandleStatus({
  outerContext,
  preventUncommittedChanges,
  error,
  name,
}: Props) {
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
  // We just use "showAllErrors" from the outerContext to determine if we should show the status.
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
      // Only update if the status has changed
      // This is to prevent unnecessary re-renders in the form
      if (showRef.current !== showAllErrors) {
        setShowStatus(showAllErrors)
      }
    }
    showRef.current = showAllErrors
  }, [hasContentChanged, preventUncommittedChanges, showAllErrors])

  return showStatus
}
