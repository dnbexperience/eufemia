/* eslint-disable react/prop-types */
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
import { isCI } from 'ci-info'

/**
 * Import Eufemia Styles
 * Use require because Webpack does not import styles after we change /src to /build
 */
if (isCI && process.env.PREBUILD_EXISTS) {
  require('@dnb/eufemia/build/style/dnb-ui-extensions.min.css')
  require('@dnb/eufemia/build/style/dnb-ui-core.min.css')
  require('@dnb/eufemia/build/style/dnb-ui-components.min.css')
  require('@dnb/eufemia/build/style/themes/theme-ui/dnb-theme-ui.min.css')
} else {
  require('@dnb/eufemia/src/style/extensions')
  require('@dnb/eufemia/src/style')
}

import cssVars from 'css-vars-ponyfill'

// run the polyfill because of the dynamic menu changes
cssVars()

// This ensures we processes also the css prop during build
// More into in the docs: https://emotion.sh/docs/ssr#gatsby
const createCacheInstance = () =>
  createEmotionCache({
    key: 'css',
    stylisPlugins: [stylisPlugin],
  })
const emotionCache = createCacheInstance()

export const pageElement =
  () =>
  ({ element }) => {
    return element
  }

export const rootElement =
  (type) =>
  ({ element }) => {
    return (
      <CacheProvider
        value={type === 'ssr' ? createCacheInstance() : emotionCache}
      >
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
