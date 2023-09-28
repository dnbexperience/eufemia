/**
 * Gatsby Config for the Browser
 *
 */

import { applyPageFocus } from '@dnb/eufemia/src/shared/helpers'
import { rootElement, pageElement } from './src/core/PortalProviders'
import ReactDOM from 'react-dom/client'

if (typeof window !== 'undefined') {
  setIsTest(window.location)
}

function setIsTest(location) {
  if (location && location.href.includes('data-visual-test')) {
    globalThis.IS_TEST = true
    document.documentElement.setAttribute('data-visual-test', 'true')
  }
}

export const replaceHydrateFunction = () => {
  // Added to solve the following errors, which prevented us from running screenshot tests
  // https://github.com/gatsbyjs/gatsby/discussions/36232
  return (element: React.ReactElement, container: HTMLElement) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

export const wrapRootElement = rootElement('browser')
export const wrapPageElement = pageElement()

// scroll to top on route change
export const shouldUpdateScroll = () => false

export const onRouteUpdate = ({ location, prevLocation }) => {
  try {
    // in order to use our own focus management by using applyPageFocus
    // we have to disable the focus management from Reach Router
    // More info: why we have to have the tabindex https://reach.tech/router/accessibility
    // More info: The div is necessary to manage focus https://github.com/reach/router/issues/63#issuecomment-395988602
    if (!globalThis.IS_TEST) {
      document
        .getElementById('gatsby-focus-wrapper')
        .removeAttribute('tabindex')
    }
  } catch (e) {
    //
  }

  // if previous location is not null
  // which means that this was an page change/switch
  //  then we apply the page content focus for accessibility
  if (prevLocation && prevLocation?.pathname !== location?.pathname) {
    applyPageFocus('content')
  }
}

export const onPreRouteUpdate = ({ prevLocation }) => {
  if (prevLocation && !globalThis.IS_TEST) {
    // Omit scrolling on page changes
    document.documentElement.style.scrollBehavior = 'auto'
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = ''
    }, 800)
  }
}
