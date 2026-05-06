/**
 * Client-side entry point for the Eufemia portal (dev + prod).
 */

import PortalApp from './portal-app'
import { bootstrapPortalApp } from './bootstrap-portal-app'
import { renderPortalApp } from './render-portal-app'
import { routes } from 'virtual:portal-pages'

export const currentRoutes = routes

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

void bootstrapPortalApp(PortalApp, currentRoutes, {
  pathname:
    typeof window !== 'undefined' ? window.location.pathname : undefined,
})

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    renderPortalApp(PortalApp, {
      props: { routes: mod?.currentRoutes ?? currentRoutes },
    })
  })
}
