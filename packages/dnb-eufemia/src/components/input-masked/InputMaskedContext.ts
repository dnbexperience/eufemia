import { createContext } from 'react'
/**
 * Web InputMasked Context
 *
 */

import type { ContextProps } from '../../shared/Context'

export type InputMaskedContextValue = {
  props: any
  context: ContextProps
}

const InputMaskedContext = createContext<InputMaskedContextValue>(
  {} as InputMaskedContextValue
)

export default InputMaskedContext
