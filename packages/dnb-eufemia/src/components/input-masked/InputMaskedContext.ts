/**
 * Web InputMasked Context
 *
 */

import React from 'react'
import type { ContextProps } from '../../shared/Context'

export type InputMaskedContextValue = {
  props: any
  context: ContextProps
}

const InputMaskedContext = React.createContext<InputMaskedContextValue>(
  {} as InputMaskedContextValue
)

export default InputMaskedContext
