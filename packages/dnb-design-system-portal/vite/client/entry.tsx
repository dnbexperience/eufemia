/**
 * Client-side entry point for the Eufemia portal (dev + prod).
 */

import PortalApp from './portal-app'
import { bootstrapPortalApp } from './bootstrap-portal-app'
import { renderPortalApp } from './render-portal-app'
import { unregisterLegacyServiceWorkers } from './unregister-legacy-service-workers'
import { getInitialPortalRoutes } from './load-portal-routes'

export let currentRoutes: Awaited<
  ReturnType<typeof getInitialPortalRoutes>
>

// When ?data-visual-test is in the URL, set globalThis.IS_TEST and
// mark the document so visual-test CSS overrides and test-specific
// component behaviour are activated.
if (
  typeof window !== 'undefined' &&
  window.location.href.includes('data-visual-test')
) {
  globalThis.IS_TEST = true
  document.documentElement.setAttribute('data-visual-test', 'true')
}

// Clean up service workers registered by previous portal versions
// (e.g. Gatsby's offline plugin) so they no longer intercept fetches
// with stale cached responses.
unregisterLegacyServiceWorkers()

void getInitialPortalRoutes().then((routes) => {
  currentRoutes = routes
  return bootstrapPortalApp(PortalApp, routes, {
    pathname: window.location.pathname,
  })
})

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    renderPortalApp(PortalApp, {
      props: { routes: mod?.currentRoutes ?? currentRoutes },
    })
  })
}
