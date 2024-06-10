import { useCallback, useContext, useEffect, useRef } from 'react'
import { extendDeep } from '../../../../../shared/component-helper'
import DataContext from '../../../DataContext/Context'
import SectionContainerContext from '../containers/SectionContainerContext'
import useDataValue from '../../../hooks/useDataValue'
import { usePath } from '../../../hooks'

export default function useContainerDataStore() {
  const valueBackupRef = useRef<unknown>()

  const { makePath } = usePath()
  const { getData } = useDataValue()
  const { data: dataFromContext, setData } = useContext(DataContext)
  // const { path } = useContext(SectionContext) || {}
  const { containerMode } = useContext(SectionContainerContext) || {}

  useEffect(() => {
    // console.log('path', path)
    if (containerMode === 'edit' && !valueBackupRef.current) {
      valueBackupRef.current = getData('/', {
        includeCurrentPath: true,
      })
      // console.log('dataFromContext', dataFromContext)
      // console.log('valueBackupRef.current', valueBackupRef.current)
    }
    if (containerMode === 'view') {
      valueBackupRef.current = null
    }
  }, [containerMode, getData, makePath])

  const restoreOriginalData = useCallback(() => {
    if (valueBackupRef.current) {
      setData?.(extendDeep({ ...dataFromContext }, valueBackupRef.current))
    }
  }, [dataFromContext, setData])

  return {
    restoreOriginalData,
  }
}
