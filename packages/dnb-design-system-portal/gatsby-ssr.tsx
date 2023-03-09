/**
 * Gatsby Config for SSR
 *
 */

import { rootElement, pageElement } from './src/core/PortalProviders'
import { renderBody } from './src/core/PortalHead'

export const wrapRootElement = rootElement('ssr')
export const wrapPageElement = pageElement()
export const onRenderBody = renderBody()
