import { createContext } from 'react'
import { UploadContextValue } from './types'

export const defaultProps: Partial<UploadContextValue> = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'default',
}

export const UploadContext = createContext<UploadContextValue>(null)
