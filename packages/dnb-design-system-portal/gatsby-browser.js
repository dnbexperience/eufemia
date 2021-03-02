/**
 * Gatsby Config
 *
 */

import { applyPageFocus } from '@dnb/eufemia/src/shared/helpers'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import { rootElement } from './src/core/portalProviders'
import smoothscroll from 'smoothscroll-polyfill'
import process from 'process/browser'

smoothscroll.polyfill()

// was added during webpack 4 to 5 migration
global.process = process

export const wrapRootElement = rootElement

if (process.env.NODE_ENV === 'development') {
  loadDevStyles()
} else if (process.env.NODE_ENV === 'production') {
  loadProdStyles()
}

function loadDevStyles() {
  require('@dnb/eufemia/src/core/jest/jestSetupScreenshots.css') // import visual test styles

  // Only for testing legacy CSS code
  // require('@dnb/eufemia/stories/legacy')

  // Load dev styles (to use hot reloading, we do have to import the styles in here)
  // import styles
  require('@dnb/eufemia/src/style/extensions') // import only extensions
  require('@dnb/eufemia/src/style') // import both all components and the default ui theme

  // Other imports for testing purposes
  // require('@dnb/eufemia/src/style/core') // import the core styles
  // require('@dnb/eufemia/src/style/basis') // in case we want to test ".dnb-core-style"
  // require('@dnb/eufemia/src/style/components') // import only components
  // require('@dnb/eufemia/src/style/themes/ui') // import the default theme
  // // require('@dnb/eufemia/src/style/themes/open-banking') // import the "open-banking" theme
  // require('@dnb/eufemia/src/style/elements') // import also styling for HTML elements/tags
}

function loadProdStyles() {
  try {
    if (process.env.NODE_ENV === 'production') {
      require('@dnb/eufemia/build/style/dnb-ui-core.css')
      require('@dnb/eufemia/build/style/dnb-ui-extensions.css')
      require('@dnb/eufemia/build/style/dnb-ui-components.css')
      require('@dnb/eufemia/build/style/themes/theme-ui/dnb-theme-ui.css')
      // require('@dnb/eufemia/build/style/extensions') // import only extensions
      // require('@dnb/eufemia/build/style') // import both all components and the default ui theme
    }
  } catch (e) {
    console.warn('[Using loadDevStyles]', e)
    loadDevStyles()
  }
}
export const disableCorePrefetching = () => {
  return window.IS_TEST
}
export const registerServiceWorker = () => {
  return !window.IS_TEST
}
export const onServiceWorkerUpdateFound = () => {
  window.___swUpdated = true
  disableServiceWorker()
}

// scroll to top on route change
export const shouldUpdateScroll = () => true

export const onRouteUpdate = ({ prevLocation }) => {
  resetLevels(1)
  try {
    // in order to use our own focus management by using applyPageFocus
    // we have to disable the focus management from Reach Router
    // More info: why we have to have the tabindex https://reach.tech/router/accessibility
    // More info: The div is necessary to manage focus https://github.com/reach/router/issues/63#issuecomment-395988602
    if (!window.IS_TEST) {
      document
        .querySelector('#gatsby-focus-wrapper')
        .removeAttribute('tabindex')
    }
  } catch (e) {
    //
  }

  // if previous location is not null
  // which means that this was an page change/switch
  //  then we apply the page content focus for accissibility
  if (prevLocation) {
    applyPageFocus('content')
  }
}

if (typeof window !== 'undefined') {
  setIsTest(window.location)
  if (window.IS_TEST) {
    disableServiceWorker()
  }
}

function setIsTest(location) {
  if (location && location.href.includes('data-visual-test')) {
    global.IS_TEST = true
    window.IS_TEST = true
    window.___swUpdated = true
  }
}

function disableServiceWorker() {
  // Because if visual test interruption, we disable the workbox / caching during the tests
  if (window.IS_TEST && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (let r of registrations) {
          r.unregister()
        }
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err)
      })
  }
}
