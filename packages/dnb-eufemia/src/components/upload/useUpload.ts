import { useEventEmitter } from '../../shared/component-helper'
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
  const { data, update } = useEventEmitter(id)

  const setFiles = (files: UploadFile[]) => {
    update({ files })
  }

  const setInternalFiles = (internalFiles: UploadFile[]) => {
    update({ internalFiles })
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
