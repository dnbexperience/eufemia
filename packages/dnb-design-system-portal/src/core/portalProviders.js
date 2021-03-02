/**
 * Global Portal providers
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'

import { Provider as EufemiaProvider } from '@dnb/eufemia/src/shared'
import enUS from '@dnb/eufemia/src/shared/locales/en-US'
import stylisPlugin from '@dnb/eufemia/src/style/stylis'
import { isTrue } from '@dnb/eufemia/src/shared/component-helper'

import cssVars from 'css-vars-ponyfill'

// run the polyfill because of the dynamic menu changes
cssVars()

const emotionCache = createEmotionCache({
  key: 'css',
  stylisPlugins: [stylisPlugin]
})

// Optional, use a Provider
export const rootElement = ({ element }) => {
  return (
    <CacheProvider value={emotionCache}>
      <EufemiaProvider
        skeleton={getSkeletonEnabled()} // To simulate a whole page skeleton
        locale={getLang()}
        locales={enUS}
      >
        {element}
      </EufemiaProvider>
    </CacheProvider>
  )
}
rootElement.propTypes = {
  element: PropTypes.node.isRequired
}

export function getLang(locale = 'nb-NO') {
  try {
    const l = window.localStorage.getItem('locale')
    if (l) {
      locale = l
    }
  } catch (e) {
    //
  }
  return locale
}
export function setLang(locale) {
  try {
    window.localStorage.setItem('locale', locale)
  } catch (e) {
    //
  }
}
export function getSkeletonEnabled() {
  if (
    typeof window !== 'undefined' &&
    window.location.search.includes('skeleton')
  ) {
    return true
  }
  if (global.IS_TEST) {
    return false
  }
  try {
    return isTrue(window.localStorage.getItem('skeleton-enabled'))
  } catch (e) {
    //
  }
  return false
}
