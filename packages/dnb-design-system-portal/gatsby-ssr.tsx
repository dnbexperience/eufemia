/**
 * Gatsby Config for SSR
 *
 */

import {
  rootElement,
  pageElement,
} from './src/shared/core/PortalProviders'
import { renderBody } from './src/shared/core/PortalHead'

export const wrapRootElement = rootElement('ssr')
export const wrapPageElement = pageElement()
export const onRenderBody = renderBody()
