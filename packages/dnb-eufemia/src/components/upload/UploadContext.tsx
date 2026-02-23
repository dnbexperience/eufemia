import { createContext } from 'react'
import { UploadContextProps } from './types'

export const defaultProps: Partial<UploadContextProps> = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'default',
}

export const UploadContext = createContext<UploadContextProps>(null)
