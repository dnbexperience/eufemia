import { createContext } from 'react'
import type { UploadContextValue } from './types'

/**
 * A file waiting for an async `onFileDelete` or `onFileClick` keeps its
 * loading state, which disables its delete button, so without a deadline a
 * Promise that never settles would leave the file permanently stuck.
 *
 * Deliberately mirrors `DEFAULT_ASYNC_SUBMIT_TIMEOUT` in the forms
 * extension. `components/` cannot import from `extensions/forms`, so the two
 * cannot be shared and have to be kept in step by hand.
 */
const DEFAULT_ASYNC_FILE_OPERATION_TIMEOUT = 30000

export const uploadDefaultProps: Partial<UploadContextValue> = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'default',
  _asyncFileOperationTimeout: DEFAULT_ASYNC_FILE_OPERATION_TIMEOUT,
}

export const UploadContext = createContext<UploadContextValue>(null)
