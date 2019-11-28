/**
 * Web Context Context
 *
 */

import { createContext } from 'react'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from './defaults'
import defaultLocales from './locales'

export const defaultContext = (props = {}) => {
  const locales = props.locales || defaultLocales
  return {
    locale: LOCALE,
    locales,
    translation: locales[props.locale || LOCALE] || locales[LOCALE] || {},
    currency: CURRENCY,
    currency_display: CURRENCY_DISPLAY,
    formRow: null,
    globalStatus: null,
    ...props
  }
}

// If no provider is given, we use the defualt context from here
const Context = createContext(defaultContext())

export default Context
