import { useCallback, useContext, useEffect, useState } from 'react'
import DataContext from '../../../DataContext/Context'
import SectionContext from '../SectionContext'
import SectionContainerContext from '../containers/SectionContainerContext'
import useDataValue from '../../../hooks/useDataValue'
import { structuredClone } from '../../../../../shared/helpers/structuredClone'

export default function useContainerDataStore({
  enabled,
}: {
  enabled: boolean
}) {
  const { getData, moveValueToPath } = useDataValue<unknown>()
  const { internalDataRef, setData } = useContext(DataContext)
  const { path } = useContext(SectionContext) || {}
  const { containerMode } = useContext(SectionContainerContext) || {}
  const [snapshot, setSnapshot] = useState<{ value: unknown }>()

  useEffect(() => {
    if (!enabled) {
      return
    }
    if (containerMode === 'edit' && !snapshot) {
      setSnapshot({ value: structuredClone(getData('/')) })
    } else if (containerMode === 'view' && snapshot) {
      setSnapshot(undefined)
    }
  }, [containerMode, enabled, getData, snapshot])

  const restoreOriginalData = useCallback(() => {
    if (snapshot) {
      const data = moveValueToPath(
        path,
        structuredClone(snapshot.value),
        structuredClone(internalDataRef?.current)
      )
      setData(data)
      setSnapshot({ value: structuredClone(snapshot.value) })
    }
  }, [internalDataRef, moveValueToPath, path, setData, snapshot])

  return {
    restoreOriginalData,
    hasUncommittedChanges: enabled && containerMode === 'edit',
  }
}
