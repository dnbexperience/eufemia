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

  if (props.__newContext) {
    Object.assign(props, props.__newContext)
    delete props.__newContext
  }

  const key = handleLocaleFallbacks(props.locale || LOCALE, locales)
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

  const context = {
    // We may use that in future
    updateTranslation: (locale, translation) => {
      context.translation = context.locales[locale] = translation
    },
    getTranslation: (props) => {
      if (props) {
        const lang = props.lang || props.locale
        if (lang && context.locales[lang] && lang !== key) {
          return context.locales[lang]
        }
      }
      return context.translation
    },
    locale: null,
    locales,
    // All eufemia components because of Typescript:
    Button: {},
    Avatar: {},
    AvatarGroup: {},
    Breadcrumb: {},
    BreadcrumbItem: {},
    InfoCard: {},
    Tag: {},
    TagGroup: {},
    Timeline: {},
    TimelineItem: {},
    VisuallyHidden: {},
    Drawer: {},
    Dialog: {},
    NumberFormat: {},

    ...props,
    translation, // make sure we set this after props, since we update this one!
  }

  return context
}

function handleLocaleFallbacks(locale, locales) {
  if (!locales[locale]) {
    if (locale === 'en' || locale.split('-')[0] === 'en') {
      return 'en-GB'
    }
  }
  return locale
}

// If no provider is given, we use the default context from here
const Context = React.createContext(
  prepareContext({
    locale: LOCALE,
    currency: CURRENCY,
    currency_display: CURRENCY_DISPLAY,
  })
)

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
          source = source[k] || {}
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
