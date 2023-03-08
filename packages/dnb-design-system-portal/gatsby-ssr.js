/**
 * Gatsby Config for SSR
 *
 */

import {
  rootElement,
  pageElement,
  renderBody,
} from './src/core/PortalProviders'

export const wrapRootElement = rootElement('ssr')
export const wrapPageElement = pageElement()
export const onRenderBody = renderBody()
