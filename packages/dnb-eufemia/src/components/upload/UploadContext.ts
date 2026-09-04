import { createContext } from 'react'
import type { UploadContextValue } from './types'

/**
 * A file waiting for an async `onFileDelete` or `onFileClick` keeps its
 * loading state, which disables its delete button. Give both the same
 * deadline Form.Handler applies to its own async submit, so a Promise that
 * never settles cannot leave the file permanently stuck.
 */
const DEFAULT_ASYNC_FILE_OPERATION_TIMEOUT = 30000

export const uploadDefaultProps: Partial<UploadContextValue> = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'default',
  asyncFileOperationTimeout: DEFAULT_ASYNC_FILE_OPERATION_TIMEOUT,
}

export const UploadContext = createContext<UploadContextValue>(null)
