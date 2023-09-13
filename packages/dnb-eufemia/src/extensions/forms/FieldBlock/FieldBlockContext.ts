import React from 'react'
import { FormError } from '../types'

export interface FieldBlockContextState {
  setError?: (id: string, error: FormError) => void
  setShowError?: (id: string, showError: boolean) => void
}

const FieldBlockContext = React.createContext<
  FieldBlockContextState | undefined
>(undefined)

export default FieldBlockContext
