import { useCallback, useContext, useEffect, useRef } from 'react'
import { extendDeep } from '../../../../../shared/component-helper'
import DataContext from '../../../DataContext/Context'
import SectionContext from '../SectionContext'
import SectionContainerContext from '../containers/SectionContainerContext'
import useDataValue from '../../../hooks/useDataValue'

export default function useContainerDataStore() {
  const valueBackupRef = useRef<unknown>()

  const { getData, moveValueToPath } = useDataValue()
  const { data: dataFromContext, setData } = useContext(DataContext)
  const { path } = useContext(SectionContext) || {}
  const { containerMode } = useContext(SectionContainerContext) || {}

  useEffect(() => {
    if (containerMode === 'edit' && !valueBackupRef.current) {
      valueBackupRef.current = getData('/', {
        includeCurrentPath: true,
      })
    }
    if (containerMode === 'view') {
      valueBackupRef.current = null
    }
  }, [containerMode, getData])

  const restoreOriginalData = useCallback(() => {
    if (valueBackupRef.current) {
      const data = extendDeep(
        {},
        dataFromContext,
        moveValueToPath(path, valueBackupRef.current)
      )
      setData?.(data)
    }
  }, [dataFromContext, moveValueToPath, path, setData])

  return {
    restoreOriginalData,
  }
}
