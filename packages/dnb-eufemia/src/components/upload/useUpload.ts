import { useCallback, useMemo } from 'react'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { UploadFile, UploadFileNative } from './types'

export type useUploadReturn = {
  files: Array<UploadFile>
  setFiles: (files: Array<UploadFile | UploadFileNative>) => void
  internalFiles: Array<UploadFile>
  setInternalFiles: (files: Array<UploadFile>) => void
  getExistingFile: (
    file: File,
    fileItems?: Array<UploadFile>
  ) => UploadFile
}

/**
 * Use together with Upload with the same id to manage the files from outside the component.
 */
function useUpload(id: string): useUploadReturn {
  const { data, extend } = useSharedState<{
    files?: Array<UploadFile>
    internalFiles?: Array<UploadFile>
  }>(id)

  const setFiles = useCallback(
    (files: Array<UploadFile>) => {
      console.log('setting files')
      extend({ files })
    },
    [extend]
  )

  const setInternalFiles = useCallback(
    (internalFiles: Array<UploadFile>) => {
      extend({ internalFiles })
    },
    [extend]
  )

  const files = useMemo(() => data?.files || [], [data?.files])
  const internalFiles = useMemo(
    () => data?.internalFiles || [],
    [data?.internalFiles]
  )

  const getExistingFile = useCallback(
    (file: File, fileItems: Array<UploadFile> = files) => {
      return fileItems.find(({ file: f }) => {
        return (
          f.name === file.name &&
          f.size === file.size &&
          f.lastModified === file.lastModified
        )
      })
    },
    [files]
  )

  return {
    files,
    setFiles,
    internalFiles,
    setInternalFiles,
    getExistingFile,
  }
}

export default useUpload
