/**
 * Blocking scripts that prevent dark mode flash (FOUC).
 *
 * These scripts run synchronously before the browser paints,
 * setting the correct color-scheme classes on HTML elements
 * based on the user's stored preference or system setting.
 *
 * Usage in a custom HTML template (e.g. Gatsby html.tsx):
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
 */

import React from 'react'
import { getStyleScopeHash } from '../plugins/postcss-isolated-style-scope/plugin-scope-hash.js'

const STORAGE_KEY = 'eufemia-theme'
const GLOBAL_KEY = '__eufemiaColorScheme'
const CLASS_PREFIX = 'eufemia-theme__color-scheme--'

/**
 * Returns the inline script that resolves the color scheme
 * from localStorage and adds the scope hash to <html>.
 * Place this in <head>.
 */
export function getHeadScript(scopeHash: string = getStyleScopeHash()) {
  return `(function(){try{var t=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}');var s=t.colorScheme;if(s==='auto'||!s){s=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.classList.add('${scopeHash}');if(s){globalThis.${GLOBAL_KEY}=s}}catch(e){}})()`
}

/**
 * Returns the inline script that adds the color-scheme class to <body>.
 * Place this as the first child of <body>.
 */
export function getBodyScript() {
  return `(function(){var s=globalThis.${GLOBAL_KEY};if(s){document.body.classList.add('${CLASS_PREFIX}'+s)}})()`
}

/**
 * Returns the inline script that swaps color-scheme classes
 * on all .eufemia-theme elements in the static HTML.
 * Place this after the main content div.
 */
export function getContentScript() {
  return `(function(){var s=globalThis.${GLOBAL_KEY};if(s&&s!=='light'){var o=s==='dark'?'light':'dark';document.querySelectorAll('.${CLASS_PREFIX}'+o).forEach(function(el){el.classList.remove('${CLASS_PREFIX}'+o);el.classList.add('${CLASS_PREFIX}'+s)})}})()`
}

/**
 * Script component for <head>.
 * Resolves the color scheme and adds the scope hash class to <html>.
 */
export function ColorSchemeHeadScript({
  scopeHash,
}: {
  scopeHash?: string
} = {}) {
  return (
    <script
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
export function ColorSchemeBodyFirstScript() {
  return (
    <script
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
export function ColorSchemeBodyLastScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getContentScript(),
      }}
    />
  )
}
