/**
 * Web Context Context
 *
 */

import { createContext } from 'react'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from './defaults'

const Context = createContext({
  locale: LOCALE,
  currency: CURRENCY,
  currency_display: CURRENCY_DISPLAY,
  formRow: null,
  globalStatus: null
})

export default Context
