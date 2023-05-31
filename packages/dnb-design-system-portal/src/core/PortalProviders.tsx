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

import { useTheme } from 'gatsby-plugin-eufemia-theme-handler/themeHandler'
import { importStyles } from './StyleImporter.cjs'

import PortalLayout, { PortalLayoutProps } from './PortalLayout'

importStyles()

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
          <SkeletonEnabled>
            <ThemeProvider>{element}</ThemeProvider>
          </SkeletonEnabled>
        </Provider>
      </CacheProvider>
    )
  }

function ThemeProvider({ children }) {
  const theme = useTheme()

  return <Theme {...theme}>{children}</Theme>
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
