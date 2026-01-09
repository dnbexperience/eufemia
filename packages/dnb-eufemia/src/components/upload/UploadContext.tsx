import { createContext } from 'react'
import type { UploadContextProps } from './types'

export const defaultProps = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
  download: false,
  variant: 'normal',
}

export const UploadContext = createContext<UploadContextProps>(null)
