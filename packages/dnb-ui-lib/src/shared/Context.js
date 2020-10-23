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
  const translation = locales[key] || defaultLocales[LOCALE] || {} // here we could use Object.freeze

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
        const last = list.length - 1

        list.forEach((k, i) => {
          source[k] = i === last ? val : source[k]
          source = source[k]
        })

        // If the root object is frozen, then use this
        // let lastObj = { ...source }
        // list.forEach((k, i) => {
        //   lastObj[k] = i === last ? val : lastObj[k] // we may have to create a new object here instead?
        //   lastObj = lastObj[k]
        // })
      }
    }
  }

  return source
}
