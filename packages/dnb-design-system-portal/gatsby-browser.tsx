/**
 * Gatsby Config for the Browser
 *
 */

import { applyPageFocus } from '@dnb/eufemia/src/shared/helpers'
import { rootElement, pageElement } from './src/core/PortalProviders'
import { scrollToHash } from '@dnb/eufemia/src/components/Anchor'
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
  if (globalThis.IS_TEST) {
    return (element: React.ReactElement, container: HTMLElement) => {
      const root = ReactDOM.createRoot(container)
      root.render(element)
    }
  }
}

// scroll to top on route change
export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  const { hash } = location
  if (hash) {
    return true
  }

  return false
}

export const wrapRootElement = rootElement('browser')
export const wrapPageElement = pageElement()

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
    if (location.hash) {
      scrollToHash(location.hash)
    }
  }
}
