import type { UploadFile, UploadFileNative } from './types'
import { isFileEqual } from './useUpload'

/**
 * Compares two upload file objects for identity.
 * Matches by ID first, then falls back to file content equality.
 */
export const isSameFile = (
  fileA: UploadFile | UploadFileNative,
  fileB: UploadFile | UploadFileNative
): boolean => {
  if (!fileA || !fileB) {
    return false
  }

  if (fileA.id && fileB.id && fileA.id === fileB.id) {
    return true
  }

  if (fileA.file && fileB.file) {
    return isFileEqual(fileA.file, fileB.file)
  }

  return false
}
