/**
 * Web Context Context
 *
 */

import { createContext } from 'react'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from './defaults'
import defaultLocales from './locales'
import { extend } from './component-helper'

export const defaultContext = (props = {}) => {
  const locales = props.locales
    ? extend(defaultLocales, props.locales)
    : defaultLocales

  return {
    locale: LOCALE,
    locales,
    translation:
      locales[props.locale || LOCALE] || defaultLocales[LOCALE] || {},
    currency: CURRENCY,
    currency_display: CURRENCY_DISPLAY,
    ...props
  }
}

// If no provider is given, we use the default context from here
const Context = createContext(defaultContext())

export default Context
