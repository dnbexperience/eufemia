import { useCallback, useMemo } from 'react'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { UploadFile, UploadFileNative, UploadProps } from './types'

export type useUploadReturn = {
  files: Array<UploadFile>
  setFiles: (files: Array<UploadFile | UploadFileNative>) => void
  resetFiles: () => void
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
function useUpload(id: UploadProps['id']): useUploadReturn {
  const { data, extend } = useSharedState<{
    files?: Array<UploadFile>
    internalFiles?: Array<UploadFile>
  }>(id)

  const resetFiles = useCallback(() => {
    extend({
      files: [],
      internalFiles: [],
    })
  }, [extend])

  const setFiles = useCallback(
    (files: Array<UploadFile>) => {
      const newFiles = files?.filter((file) => file?.file instanceof File)
      extend({
        files: newFiles,
      })
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
        return isFileEqual(file, f)
      })
    },
    [files]
  )

  return {
    files,
    setFiles,
    resetFiles,
    internalFiles,
    setInternalFiles,
    getExistingFile,
  }
}

export const isFileEqual = (fileA: File, fileB: File): boolean => {
  const compareExistingProperty = function (
    a: File,
    b: File,
    property: string
  ) {
    return (
      a &&
      property in a &&
      b &&
      property in b &&
      (a[property] === 0 || // If value is 0, which is default when not provided, we can't say whether the file is equal or not, so we assume they are.
        b[property] === 0 || // If value is 0, which is default when not provided, we can't say whether the file is equal or not, so we assume they are.
        a[property] === b[property])
    )
  }
  return (
    fileA.name === fileB.name &&
    compareExistingProperty(fileA, fileB, 'size') &&
    compareExistingProperty(fileA, fileB, 'lastModified')
  )
}

export default useUpload
