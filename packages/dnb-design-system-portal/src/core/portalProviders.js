/**
 * Global Portal providers
 *
 */

import React from 'react'

import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'

import { Provider, Context } from '@dnb/eufemia/src/shared'
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

export const pageElement = ({ element }) => {
  return element
}

export const rootElement = ({ element }) => {
  return (
    <CacheProvider value={emotionCache}>
      <Provider
        skeleton={getSkeletonEnabled()} // To simulate a whole page skeleton
        locale={getLang()}
        locales={enUS} // extend the available locales
      >
        <SkeletonEnabled>{element}</SkeletonEnabled>
      </Provider>
    </CacheProvider>
  )
}

// This ensures we actually will get skeletons enabled when defined in the url
function SkeletonEnabled({ children }) {
  const { skeleton, update } = React.useContext(Context)

  React.useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.search.includes('skeleton')
    ) {
      if (!skeleton) {
        update({ skeleton: true })
      }
    }
  }, [skeleton, update])

  return children
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
  try {
    return isTrue(window.localStorage.getItem('skeleton-enabled'))
  } catch (e) {
    //
  }
  return false
}
