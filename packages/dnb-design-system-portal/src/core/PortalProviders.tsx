/* eslint-disable react/prop-types */
/**
 * Global Portal ThemeProvider
 *
 */

import React from 'react'

import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'

import { Provider, Context, Theme } from '@dnb/eufemia/src/shared'
import enUS from '@dnb/eufemia/src/shared/locales/en-US'
import { isTrue } from '@dnb/eufemia/src/shared/component-helper'
import { isCI } from 'repo-utils'

import { useThemeName } from 'gatsby-plugin-eufemia-theme-handler/themeHandler'

import PortalLayout, { PortalLayoutProps } from './PortalLayout'

/**
 * Import Eufemia Styles
 * Use require because Webpack does not import styles after we change /src to /build
 */
if (
  isCI &&
  process.env.PREBUILD_EXISTS &&
  process.env.NODE_ENV === 'production'
) {
  require('@dnb/eufemia/build/style/dnb-ui-core.min.css')
  // Themes are imported by "gatsby-plugin-eufemia-theme-handler"
} else {
  require('@dnb/eufemia/src/style/core')
  // Themes are imported by "gatsby-plugin-eufemia-theme-handler"
}

// This ensures we processes also the css prop during build
// More into in the docs: https://emotion.sh/docs/ssr#gatsby
const createCacheInstance = () =>
  createEmotionCache({
    key: 'css',
  })
const emotionCache = createCacheInstance()

type PortalElementProps = {
  props: PortalLayoutProps
  element: React.ReactNode
}

export const pageElement =
  () =>
  ({ props, element }: PortalElementProps) => {
    return <PortalLayout {...props}>{element}</PortalLayout>
  }

export const rootElement =
  (type: string) =>
  ({ element }) =>
    (
      <CacheProvider
        value={type === 'ssr' ? createCacheInstance() : emotionCache}
      >
        <Provider
          skeleton={getSkeletonEnabled()} // To simulate a whole page skeleton
          locale={getLang()}
          locales={enUS} // extend the available locales
        >
          <SkeletonEnabled>
            <ThemeProvider>{element}</ThemeProvider>
          </SkeletonEnabled>
        </Provider>
      </CacheProvider>
    )

function ThemeProvider({ children }) {
  const themeName = useThemeName()
  return <Theme name={themeName}>{children}</Theme>
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
