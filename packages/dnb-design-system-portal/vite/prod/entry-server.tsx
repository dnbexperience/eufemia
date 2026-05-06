/**
 * SSR entry point for prerendering the portal to static HTML.
 *
 * Used by the prerender script to generate static HTML for each route.
 * Each page is rendered independently so Vite's code splitting ensures
 * pages only load the JS they actually need.
 */

import { Component } from 'react'
import type { ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  Outlet,
  useLocation,
} from 'react-router-dom'
import { Provider, Theme } from '@dnb/eufemia/src/shared'
import IsolatedStyleScope from '@dnb/eufemia/src/shared/IsolatedStyleScope'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'
import { MDXProvider } from '@mdx-js/react'
import { routes, allMdxNodes } from 'virtual:portal-pages'
import { translations, getLang } from '../../src/core/portalRuntimeUtils'
import tags from '../../src/shared/tags'
import PortalLayout from '../../src/core/PortalLayout'

// Cached resolved routes and static handler — populated by prepareRoutes()
let resolvedRouteConfig: ReturnType<typeof buildRouteConfig> | null = null
let cachedHandler: ReturnType<typeof createStaticHandler> | null = null

function buildRouteConfig(resolvedRoutes: typeof routes) {
  return [
    {
      path: '/',
      Component: RootLayout,
      children: resolvedRoutes,
    },
  ]
}

/**
 * Pre-resolve all lazy route components and build the static handler
 * once. Called before the render loop to avoid repeating this work
 * for every page.
 */
export async function prepareRoutes() {
  const resolved = await Promise.all(
    routes.map(async (route) => {
      if (route.lazy) {
        const mod = await route.lazy()
        return { ...route, ...mod, lazy: undefined }
      }
      return route
    })
  )

  resolvedRouteConfig = buildRouteConfig(resolved)
  cachedHandler = createStaticHandler(resolvedRouteConfig)
}

/**
 * Render a single URL to an HTML string.
 *
 * Requires prepareRoutes() to have been called first.
 * Returns the rendered HTML and any Emotion CSS that was extracted,
 * so each page only includes the styles it uses.
 */
export async function render(url: string) {
  if (!resolvedRouteConfig || !cachedHandler) {
    // Fallback: resolve on the fly (for backwards compat / tests)
    await prepareRoutes()
  }

  const fetchRequest = new Request('http://localhost' + url, {
    method: 'GET',
  })
  const context = await cachedHandler.query(fetchRequest)

  if (context instanceof Response) {
    // Redirect — return the location header
    return {
      html: '',
      css: '',
      redirect: context.headers.get('Location'),
    }
  }

  const router = createStaticRouter(resolvedRouteConfig, context)

  // Create a fresh Emotion cache for this render to ensure clean
  // style extraction per page.
  const emotionCache = createEmotionCache({ key: 'css' })

  let appHtml = renderToString(
    <CacheProvider value={emotionCache}>
      <StaticRouterProvider router={router} context={context} />
    </CacheProvider>
  )

  // Extract Emotion <style> tags from the rendered HTML and collect
  // them for injection into <head>. Emotion 11 SSR inlines <style>
  // tags directly in the rendered tree during renderToString.
  const emotionStyleRegex = /<style data-emotion="[^"]*">[^<]*<\/style>/g
  const emotionStyles: string[] = []
  const seen = new Set<string>()

  appHtml = appHtml.replace(emotionStyleRegex, (match) => {
    if (!seen.has(match)) {
      seen.add(match)
      emotionStyles.push(match)
    }
    return ''
  })

  return {
    html: appHtml,
    emotionCss: emotionStyles.length > 0 ? emotionStyles.join('') : '',
  }
}

/**
 * Root layout component for SSR.
 * Mirrors the browser RootLayout but without browser-only hooks
 * (scroll persistence, catch-links, skeleton URL detection).
 */
function RootLayout() {
  return (
    <Provider locale={getLang()} translations={translations}>
      <IsolatedStyleScope
        disableCoreStyleWrapper
        scopeHash="eufemia-scope--portal"
      >
        <Theme colorScheme="light">
          <MDXProvider components={tags}>
            <SSRPageWrapper />
          </MDXProvider>
        </Theme>
      </IsolatedStyleScope>
    </Provider>
  )
}

function SSRPageWrapper() {
  const location = useLocation()

  return (
    <PortalLayout
      location={location as unknown as Location}
      pageContext={{ frontmatter: {} }}
    >
      <SSRErrorBoundary>
        <Outlet />
      </SSRErrorBoundary>
    </PortalLayout>
  )
}

/**
 * Catches render errors during SSR so the page shell (header, sidebar)
 * is still prerendered even when content components fail.
 * The client-side JS will render the content on hydration.
 */
class SSRErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

/**
 * Export the list of all routes so the prerender script knows
 * which URLs to generate.
 */
export { routes, allMdxNodes }

/**
 * Re-export FOUC prevention script for the prerender pipeline.
 */
export { getContentScript } from '@dnb/eufemia/src/shared/ColorSchemeScript'
