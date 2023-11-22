import React from 'react'
import { FormError } from '../types'

export interface FieldBlockContextState {
  setError?: (identifier: string, error: FormError) => void
  setShowError?: (identifier: string, showError: boolean) => void
}

const FieldBlockContext = React.createContext<
  FieldBlockContextState | undefined
>(undefined)

export default FieldBlockContext
