/**
 * Gatsby Config for the Browser
 *
 */

import { applyPageFocus } from '@dnb/eufemia/src/shared/helpers'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import {
  rootElement,
  pageElement,
} from './src/core/PortalStylesAndProviders'
import smoothscroll from 'smoothscroll-polyfill'
import process from 'process/browser'

smoothscroll.polyfill()

// was added during webpack 4 to 5 migration
global.process = process

if (typeof window !== 'undefined') {
  setIsTest(window.location)
}

function setIsTest(location) {
  if (location && location.href.includes('data-visual-test')) {
    global.IS_TEST = true
    window.IS_TEST = true
  }
}

export const wrapRootElement = rootElement('browser')
export const wrapPageElement = pageElement('browser')

// This was used before during visual testing
// but it looks like they do not safe us any time
// export const disableCorePrefetching = () => {
//   return window.IS_TEST
// }
// export const registerServiceWorker = () => {
//   return !window.IS_TEST
// }

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
