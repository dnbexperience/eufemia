import { useEventEmitter } from '../../../src/shared/component-helper'
import type { UploadFile } from './types'

/**
 * Use together with Upload with the same id to manage the files from outside the component.
 * @param id string, must match the id of the Upload component
 * @returns { files: UploadFile[], setFiles: (file: UploadFile[]) => void }
 */
function useUpload(id: string): {
  files: UploadFile[]
  setFiles: (files: UploadFile[]) => void
} {
  const { data, update } = useEventEmitter(id)

  function setFiles(files: UploadFile[]) {
    update({ files })
  }

  return {
    files: data?.files || [],
    setFiles,
  }
}

export default useUpload
