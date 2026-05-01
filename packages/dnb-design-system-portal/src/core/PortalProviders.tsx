/**
 * Global Portal Providers
 *
 */

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'
import {
  Provider,
  Context,
  Theme,
  mergeTranslations,
} from '@dnb/eufemia/src/shared'
import GlobalStatus from '@dnb/eufemia/src/components/global-status/GlobalStatus'
import coreTranslations from '@dnb/eufemia/src/shared/locales'
import PortalLayout, { type PortalLayoutProps } from './PortalLayout'
import { useThemeHandler } from 'gatsby-plugin-eufemia-theme-handler'
import type {
  InternalLocale,
  TranslationsLoader,
} from '@dnb/eufemia/src/shared/Context'
import IsolatedStyleScope from '@dnb/eufemia/src/shared/IsolatedStyleScope'

// Load additional locale translations on demand
async function loadTranslations(locale: string) {
  switch (locale) {
    case 'en-US': {
      const enUS = (await import('@dnb/eufemia/src/shared/locales/en-US'))
        .default
      return enUS
    }
    case 'sv-SE': {
      const [svSE, svSE_forms, svSE_forms_countries] = await Promise.all([
        import('@dnb/eufemia/src/shared/locales/sv-SE'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/sv-SE'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/countries/sv-SE'),
      ])
      return mergeTranslations(
        svSE.default,
        svSE_forms.default,
        svSE_forms_countries.default
      )
    }
    case 'da-DK': {
      const [daDK, daDK_forms, daDK_forms_countries] = await Promise.all([
        import('@dnb/eufemia/src/shared/locales/da-DK'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/da-DK'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/countries/da-DK'),
      ])
      return mergeTranslations(
        daDK.default,
        daDK_forms.default,
        daDK_forms_countries.default
      )
    }
    default:
      return null
  }
}

export const supportedTranslationsKey = [
  ...Object.keys(coreTranslations),
  'en-US',
  'sv-SE',
  'da-DK',
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
        <EufemiaProvider>
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
        </EufemiaProvider>
      </CacheProvider>
    )
  }

function EufemiaProvider({ children }: { children: React.ReactNode }) {
  const [translationError, setTranslationError] = useState<string | null>(
    null
  )
  const translationsLoader: TranslationsLoader = useCallback(
    async (locale) => {
      try {
        setTranslationError(null)
        return await loadTranslations(locale)
      } catch (error) {
        setTranslationError(
          `Failed to load translations for locale "${locale}"`
        )
        return null
      }
    },
    []
  )

  return (
    <Provider
      skeleton={getSkeletonEnabled()}
      locale={getLang()}
      translationsLoader={translationsLoader}
    >
      {translationError && (
        <GlobalStatus
          state="error"
          text={translationError}
          top="x-large"
          show
          noAnimation
        />
      )}
      {children}
    </Provider>
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
    <Theme colorScheme="auto" {...theme}>
      {children}
    </Theme>
  )
}

// This ensures we actually will get skeletons enabled when defined in the url
function SkeletonEnabled({ children }) {
  const { skeleton, update } = useContext(Context)

  useEffect(() => {
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
    return window.localStorage.getItem('skeleton-enabled') === 'true'
  } catch (e) {
    //
  }
  return false
}
