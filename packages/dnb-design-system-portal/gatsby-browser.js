/**
 * Gatsby Config for the Browser
 *
 */

import { applyPageFocus } from '@dnb/eufemia/src/shared/helpers'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import { rootElement, pageElement } from './src/core/portalProviders'
import smoothscroll from 'smoothscroll-polyfill'
import process from 'process/browser'

smoothscroll.polyfill()

// was added during webpack 4 to 5 migration
global.process = process

require('@dnb/eufemia/src/style/extensions') // import only extensions
require('@dnb/eufemia/src/style') // import both all components and the default ui theme

export const wrapRootElement = rootElement('browser')
export const wrapPageElement = pageElement('browser')

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
        .getElementById('gatsby-focus-wrapper')
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
