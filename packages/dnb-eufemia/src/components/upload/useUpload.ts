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

  const setFiles = (files: UploadFile[]) => {
    extend({ files })
  }

  const setInternalFiles = (internalFiles: UploadFile[]) => {
    extend({ internalFiles })
  }

  const files = data?.files || []
  const internalFiles = data?.internalFiles || []

  const getExistingFile = (
    file: File,
    fileItems: UploadFile[] = files
  ) => {
    return fileItems.find(({ file: f }) => {
      return (
        f.name === file.name &&
        f.size === file.size &&
        f.lastModified === file.lastModified
      )
    })
  }

  return {
    files,
    setFiles,
    internalFiles,
    setInternalFiles,
    getExistingFile,
  }
}

export default useUpload
