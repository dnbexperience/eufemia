import { createContext } from 'react'
import { UploadContextProps } from './types'

export const defaultProps = {
  fileMaxSize: 5,
  filesAmountLimit: 100,
}

export const UploadContext = createContext<UploadContextProps>(null)
