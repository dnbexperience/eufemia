/**
 * Blocking scripts that prevent dark mode flash (FOUC).
 *
 * These scripts run synchronously before the browser paints,
 * setting the correct color-scheme classes on HTML elements
 * based on the user's stored preference or system setting.
 *
 *
 *   import {
 *     ColorSchemeHeadScript,
 *     ColorSchemeBodyFirstScript,
 *     ColorSchemeBodyLastScript,
 *   } from '@dnb/eufemia/shared/ColorSchemeScript'
 *
 *   <head>
 *     <ColorSchemeHeadScript />
 *   </head>
 *   <body>
 *     <ColorSchemeBodyFirstScript />
 *     {content}
 *     <ColorSchemeBodyLastScript />
 *   </body>
 *
 * All three accept standard script attributes, including `nonce` for a strict
 * Content-Security-Policy.
 */

import type { ScriptHTMLAttributes } from 'react'
import { getStyleScopeHash } from '../plugins/postcss-isolated-style-scope/plugin-scope-hash.js'
import {
  getHeadScript as buildHeadScript,
  getBodyScript,
  getContentScript,
} from './ColorSchemeScriptUtils'

export { getBodyScript, getContentScript } from './ColorSchemeScriptUtils'

/**
 * Script attributes forwarded to the rendered tag, such as `nonce` for a
 * Content-Security-Policy that does not allow `unsafe-inline`.
 */
export type ColorSchemeScriptProps = Omit<
  ScriptHTMLAttributes<HTMLScriptElement>,
  'children' | 'dangerouslySetInnerHTML'
>

export type ColorSchemeHeadScriptProps = ColorSchemeScriptProps & {
  scopeHash?: string
}

/**
 * Returns the inline script that resolves the color scheme
 * from localStorage and adds the scope hash to <html>.
 * Place this in <head>.
 */
// Wrapped rather than re-exported: the shared module stays import-free, so the
// scope hash default is resolved here.
export function getHeadScript(scopeHash: string = getStyleScopeHash()) {
  return buildHeadScript(scopeHash)
}

/**
 * Script component for <head>.
 * Resolves the color scheme and adds the scope hash class to <html>.
 */
export function ColorSchemeHeadScript({
  scopeHash,
  ...props
}: ColorSchemeHeadScriptProps = {}) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{
        __html: getHeadScript(scopeHash),
      }}
    />
  )
}

/**
 * Script component for the first child of <body>.
 * Adds the color-scheme class to <body>.
 */
export function ColorSchemeBodyFirstScript(
  props: ColorSchemeScriptProps = {}
) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{
        __html: getBodyScript(),
      }}
    />
  )
}

/**
 * Script component placed after the main content.
 * Swaps color-scheme classes on server-rendered Theme elements.
 */
export function ColorSchemeBodyLastScript(
  props: ColorSchemeScriptProps = {}
) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{
        __html: getContentScript(),
      }}
    />
  )
}
