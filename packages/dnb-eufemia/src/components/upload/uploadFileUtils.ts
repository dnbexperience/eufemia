import type { ReactNode } from 'react'
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

/**
 * Returns the message of a thrown Error or string,
 * or the fallback when there is no message to show.
 */
export const getErrorMessage = (
  error: unknown,
  fallback: ReactNode
): ReactNode => {
  const message = error instanceof Error ? error.message : error
  return typeof message === 'string' && message.trim() ? message : fallback
}
