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

  const key = props.locale || LOCALE
  const translation = locales[key] || defaultLocales[LOCALE] || {}

  /**
   * The code above adds support for strings, defined like:
   * {
   *    "Modal.close_title": "Steng",
   * }
   */
  if (locales[key]) {
    locales[key] = destruct(locales[key], translation)
  }

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

function destruct(source, validKeys) {
  for (let k in source) {
    if (String(k).includes('.')) {
      const list = k.split('.')

      if (validKeys[list[0]]) {
        const val = source[k]
        const count = list.length - 1

        let lastObj = source
        list.forEach((k, i) => {
          lastObj[k] = i === count ? val : {}
          lastObj = lastObj[k]
        })

        delete source[k]
      }
    }
  }

  return source
}
