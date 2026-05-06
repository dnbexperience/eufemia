/**
 * Global Portal Providers
 *
 */

import { useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'
import { Provider, Context, Theme } from '@dnb/eufemia/src/shared'
import GlobalStatus from '@dnb/eufemia/src/components/global-status/GlobalStatus'
import PortalLayout, { type PortalLayoutProps } from './PortalLayout'
import { useThemeHandler } from '../../vite/client/shims/theme-handler'
import type { TranslationsLoader } from '@dnb/eufemia/src/shared/Context'
import IsolatedStyleScope from '@dnb/eufemia/src/shared/IsolatedStyleScope'
import {
  getLang,
  getSkeletonEnabled,
  loadTranslations,
} from './portalRuntimeUtils'

// This ensures we process the css prop during build.
const createCacheInstance = () =>
  createEmotionCache({
    key: 'css',
  })
const emotionCache = createCacheInstance()

type PortalElementProps = {
  props: PortalLayoutProps
  element: ReactNode
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

function EufemiaProvider({ children }: { children: ReactNode }) {
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
