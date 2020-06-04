/**
 * Web Context Context
 *
 */

import React from 'react'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from './defaults'
import defaultLocales from './locales'
import { extend } from './component-helper'

export const prepareContext = (props = {}) => {
  const locales = props.locales
    ? extend(defaultLocales, props.locales)
    : defaultLocales

  const translation =
    locales[props.locale || LOCALE] || defaultLocales[LOCALE] || {}

  return {
    locale: LOCALE,
    currency: CURRENCY,
    currency_display: CURRENCY_DISPLAY,
    locales,
    ...props,
    translation // make sure we set this after props, since we update this one!
  }
}

// If no provider is given, we use the default context from here
const Context = React.createContext(prepareContext())

export default Context
