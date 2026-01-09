/**
 * Global Portal Providers
 *
 */

import React from 'react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'
import {
  Provider,
  Context,
  Theme,
  mergeTranslations,
} from '@dnb/eufemia/src/shared'
import coreTranslations from '@dnb/eufemia/src/shared/locales'
import enUS from '@dnb/eufemia/src/shared/locales/en-US'
import svSE from '@dnb/eufemia/src/shared/locales/sv-SE'
import svSE_forms from '@dnb/eufemia/src/extensions/forms/constants/locales/sv-SE'
import svSE_forms_countries from '@dnb/eufemia/src/extensions/forms/constants/locales/countries/sv-SE'
import daDK from '@dnb/eufemia/src/shared/locales/da-DK'
import daDK_forms from '@dnb/eufemia/src/extensions/forms/constants/locales/da-DK'
import daDK_forms_countries from '@dnb/eufemia/src/extensions/forms/constants/locales/countries/da-DK'
import { isTrue } from '@dnb/eufemia/src/shared/component-helper'
import type { PortalLayoutProps } from './PortalLayout';
import PortalLayout from './PortalLayout'
import { useThemeHandler } from 'gatsby-plugin-eufemia-theme-handler'
import type { InternalLocale } from '@dnb/eufemia/src/shared/Context'
import IsolatedStyleScope from '@dnb/eufemia/src/shared/IsolatedStyleScope'

// Enable other existing locales here
export const translationsWithoutEnUS = mergeTranslations(
  svSE,
  svSE_forms,
  svSE_forms_countries,
  daDK,
  daDK_forms,
  daDK_forms_countries,
)
export const translations = mergeTranslations(
  translationsWithoutEnUS,
  enUS,
)
export const supportedTranslationsKey = [
  ...Object.keys(coreTranslations),
  ...Object.keys(translations),
]

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
          translations={translations} // extend the available locales
        >
          <IsolatedStyleScope
            disableCoreStyleWrapper // Make exception, because using "dnb-core-style" does not work well for screenshot tests (as of now).
            scopeHash={
              process.env.ENABLE_BUILD_STYLE_SCOPE ||
              process.env.ENABLE_PORTAL_STYLE_SCOPE
                ? 'eufemia-scope--portal'
                : undefined
            }
          >
            <SkeletonEnabled>
              <ThemeProvider>{element}</ThemeProvider>
            </SkeletonEnabled>
          </IsolatedStyleScope>
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
