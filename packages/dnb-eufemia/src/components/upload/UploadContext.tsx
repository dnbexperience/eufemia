import { createContext } from 'react'
import type { UploadContextValue } from './types'

export const defaultProps: Partial<UploadContextValue> = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'default',
  skeleton: false,
}

export const UploadContext = createContext<UploadContextValue>(null)
