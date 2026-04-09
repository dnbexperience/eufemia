/**
 * Web InputMasked Context
 *
 */

import React from 'react'
import type { ContextProps } from '../../shared/Context'

export type InputMaskedContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>
  context: ContextProps
}

const InputMaskedContext = React.createContext<InputMaskedContextValue>(
  {} as InputMaskedContextValue
)

export default InputMaskedContext
