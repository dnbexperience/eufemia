import { useCallback, useMemo } from 'react'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { UploadFile } from './types'

export type useUploadReturn = {
  files: UploadFile[]
  setFiles: (files: UploadFile[]) => void
  internalFiles: UploadFile[]
  setInternalFiles: (files: UploadFile[]) => void
  getExistingFile: (file: File, fileItems?: UploadFile[]) => UploadFile
}

/**
 * Use together with Upload with the same id to manage the files from outside the component.
 */
function useUpload(id: string): useUploadReturn {
  const { data, extend } = useSharedState<{
    files?: UploadFile[]
    internalFiles?: UploadFile[]
  }>(id)

  const setFiles = useCallback(
    (files: UploadFile[]) => {
      extend({ files })
    },
    [extend]
  )

  const setInternalFiles = useCallback(
    (internalFiles: UploadFile[]) => {
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
    (file: File, fileItems: UploadFile[] = files) => {
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
