import { createContext } from 'react'
import type { UploadContextValue } from './types'

export const uploadDefaultProps: Partial<UploadContextValue> = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'default',
}

export const UploadContext = createContext<UploadContextValue>(null)
