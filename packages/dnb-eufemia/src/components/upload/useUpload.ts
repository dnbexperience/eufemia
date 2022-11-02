import { useEventEmitter } from '../../shared/component-helper'
import type { UploadFile } from './types'

export type useUploadReturn = {
  files: UploadFile[]
  setFiles: (files: UploadFile[]) => void
  internalFiles: UploadFile[]
  setInternalFiles: (files: UploadFile[]) => void
}

/**
 * Use together with Upload with the same id to manage the files from outside the component.
 * @param id string, must match the id of the Upload component
 * @returns { files: UploadFile[], setFiles: (file: UploadFile[]) => void }
 */
function useUpload(id: string): useUploadReturn {
  const { data, update } = useEventEmitter(id)

  const setFiles = (files: UploadFile[]) => {
    update({ files })
  }

  const setInternalFiles = (internalFiles: UploadFile[]) => {
    update({ internalFiles })
  }

  return {
    files: data?.files || [],
    setFiles,
    internalFiles: data?.internalFiles || [],
    setInternalFiles,
  }
}

export default useUpload
