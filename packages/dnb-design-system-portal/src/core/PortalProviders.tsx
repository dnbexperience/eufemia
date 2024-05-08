/**
 * Global Portal Providers
 *
 */

import React from 'react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'
import { Provider, Context, Theme } from '@dnb/eufemia/src/shared'
import enUS from '@dnb/eufemia/src/shared/locales/en-US'
import { isTrue } from '@dnb/eufemia/src/shared/component-helper'
import PortalLayout, { PortalLayoutProps } from './PortalLayout'
import { useThemeHandler } from 'gatsby-plugin-eufemia-theme-handler'
import { InternalLocale } from '@dnb/eufemia/src/shared/Context'

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
          translations={enUS} // extend the available locales
        >
          <SkeletonEnabled>
            <ThemeProvider>{element}</ThemeProvider>
          </SkeletonEnabled>
        </Provider>
      </CacheProvider>
    )
  }

/**
 * Because we do rewrite the import path many places from
 * "/src" to "/build" on CI, some parts miss out,
 * and we end up with two different React Context's,
 * which does not work.
 * Therefore, we wrap the Portal with our own Theme wrapper.
 */
function ThemeProvider({ children }) {
  const theme = useThemeHandler()

  return (
    <Theme {...theme} darkMode>
      {children}
    </Theme>
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

export function getLang(locale: InternalLocale = 'nb-NO'): InternalLocale {
  try {
    const l = window.localStorage.getItem('locale') as InternalLocale
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
