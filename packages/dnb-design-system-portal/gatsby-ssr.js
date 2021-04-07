/**
 * Gatsby Config for SSR
 *
 */

import { rootElement, pageElement } from './src/core/portalProviders'

export const wrapRootElement = rootElement('ssr')
export const wrapPageElement = pageElement('ssr')
