/**
 * Web Context Context
 *
 */

import { createContext } from 'react'
import { LOCALE, CURRENCY } from './defaults'

const Context = createContext({
  locale: LOCALE,
  currency: CURRENCY,
  formRow: null,
  globalStatus: null
})

export default Context
