import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import DataContext from '../../DataContext/Context'
import WizardContext from '../../Wizard/Context'
import IsolationContext from './IsolationContext'
import { createDataReference } from './IsolationDataReference'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export default function useDataContextSnapshot({
  enabled,
}: {
  enabled?: boolean
} = {}) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { internalDataRef, setData } = useContext(DataContext)
  const isolationContext = useContext(IsolationContext)
  const hasWizard = Boolean(useContext(WizardContext))
  const [dataReferenceFallback] = useState(() => {
    if (enabled && !isolationContext?.dataReference) {
      return createDataReference()
    }
  })
  const { dataReference = dataReferenceFallback, setIsolatedData } =
    isolationContext || {}
  const { snapshotRef, eventsRef, update, refresh, cleanup } =
    dataReference || {}

  const updateHandler = useCallback(
    (data = null) => {
      update(data || structuredClone(internalDataRef?.current))
      forceUpdate() // Ensure the hasContentChanged hook gets updated
    },
    [internalDataRef, update]
  )

  useEffect(() => {
    if (enabled && eventsRef) {
      eventsRef.current.push(updateHandler)

      // Also run refresh again and wait for the Wizard to finish prerendering,
      // in case there are fields in steps beyond the current one.
      refresh({ deferred: hasWizard })
    }

    return () => cleanup?.(updateHandler)
  }, [cleanup, enabled, eventsRef, hasWizard, refresh, updateHandler])

  const handleReset = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (snapshotRef) {
        const data = structuredClone(snapshotRef.current)
        setIsolatedData(data)
        setData(data)
        updateHandler(data)
      }
    }) // To actually reset the data without influence the data we are about to push, we need to wait for the next frame
  }, [setData, setIsolatedData, snapshotRef, updateHandler])

  return { handleReset, snapshotRef }
}
